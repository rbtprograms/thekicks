import jwt from "jsonwebtoken";
import * as db from "./db";

export function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

export function tokenMiddleware(req, _res, next) {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //tack userId onto the request
    req.userId = userId;
  }
  next();
}

export async function addUserToRequest(req, _res, next) {
  if (!req.userId) {
    return next();
  }
  //@ts-ignore
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{ id, permissions, email, name }"
  );
  console.log(user);
  req.user = user;
  next();
}
