import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import * as crypto from "crypto";
import * as util from "util";
import { transport, makeANiceEmail } from "../mail";

interface CreateItemArgs {
  title?: string;
  description?: string;
  price?: number;
  image?: string;
  largeImage?: string;
}

interface UpdateItemArgs {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  image?: string;
  largeImage?: string;
}

interface AuthArgs {
  email: string;
  password: string;
}

module.exports = {
  async createItem(_parent, args: CreateItemArgs, context, info) {
    if (!context.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const item = await context.db.mutation.createItem(
      {
        data: {
          //this is how we create data relationshups in prisma
          user: {
            connect: {
              id: context.request.userId
            }
          },
          ...args
        }
      },
      info
    );
    return item;
  },
  updateItem(_parent, args: UpdateItemArgs, context, info) {
    const updates = { ...args };
    delete updates.id;
    return context.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(_parent, args: { id: string }, context, info) {
    const where = { id: args.id };
    await context.db.query.item({ where }, `{ id, title }`);
    return context.db.mutation.deleteItem({ where }, info);
  },
  async signup(_parent, args: AuthArgs, context, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          //the below has to do with setting enums in prisma
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    //create token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //set jwt as cookie on the reponse
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },
  async signin(_parent, args: AuthArgs, context, _info) {
    const user = await context.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No user found for ${args.email}`);
    }
    const validate = await bcrypt.compare(args.password, user.password);
    if (!validate) {
      throw new Error("Invalid Password!");
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  },
  signout(_parent, _args, context, _info) {
    context.response.clearCookie("token");
    return { message: "Goodbye" };
  },
  async requestReset(_parent, args: { email: string }, context, _info) {
    //check if user is real
    console.log("***IN REQUEST RESET***");
    const user = await context.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    //set a reset token and expiry on user
    const cryptoFunctionPromiseWrapper = util.promisify(crypto.randomBytes);
    const generatedRandomBytes = await cryptoFunctionPromiseWrapper(20);
    const resetToken = generatedRandomBytes.toString("hex");
    const resetTokenExpiry = Date.now() + 360000; //1 hour
    const res = await context.db.mutation.updateUser({
      where: { email: args.email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });
    //remove this at some point
    console.log(res);
    //email them the reset token
    await transport.sendMail({
      from: "rbt",
      to: user.email,
      subject: "RE: password reset",
      html: makeANiceEmail(
        `Your password reset token\n<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`
      )
    });
    return { message: "thanks" };
  },
  async resetPassword(_parent, args, context, _info) {
    if (args.password !== args.confirmPassword) {
      throw new Error("passwords do not match");
    }
    //check if its a legit reset token
    const [user] = await context.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 360000
      }
    });
    //check if its expired
    if (!user) {
      throw new Error("You token is expired, please try again");
    }
    //hash their new password
    const password = await bcrypt.hash(args.password, 10);
    //save the new password
    const updatedUser = await context.db.mutation.updateUser({
      where: {
        email: user.email
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    //generate jwt
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    //set the jwt cookie
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    //return the new suer
    return updatedUser;
  }
};
