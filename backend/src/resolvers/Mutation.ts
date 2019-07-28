// type Args = {
//   id: string,
//   description: string,
//   price: number,
//   title: string,
//   image?: string,
//   largeImage?: string,
// }

// type Context = {
//   db: {
//     mutation: {
//       createItem: ({ data }, info) => Object,
//       updateItem: ({ data, where }, info) => Object,
//       deleteItem: ({ where }, info) => Object
//     },
//     query: {
//       item({ where }, rawGQL)
//     }
//   },
//   fragmentReplacements: Array<any>,
//   request: Request,
//   response: Response
// }

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async createItem(parent, args, context, info) {
    const item = await context.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    return item;
  },
  updateItem(parent, args, context, info) {
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
  async deleteItem(parent, args, context, info) {
    const where = { id: args.id };
    const item = await context.db.query.item({ where }, `{ id, title }`);
    return context.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, context, info) {
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
    context.reponse.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    return user;
  }
};
