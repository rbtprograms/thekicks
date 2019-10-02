import { forwardTo } from "prisma-binding";
import { hasPermission } from '../utils';

module.exports = {
  //useful for quickly setting stuff up and mocking, onyl works for basic mutations and queries
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(_parent, _args, context, info) {
    if (!context.request.userId) {
      //dont throw an error, someone might not be logged in
      return null;
    }
    return context.db.query.user(
      {
        where: { id: context.request.userId }
      },
      info
    );
  },
  async users(_parent, _args, context, info) {
    //check if logged in
    if(!context.request.userId) {
      throw new Error('You must be logged in to do that.');
    }
    //check for permission to query all users
    //TODO: change user to ADMIN and PERMISSIONUPDATE, I am changing it because
    //i cannot get the prisma client to update records, so we are going with USER for now
    hasPermission(context.request.user, ['USER']);
    //if they do, query the users
    return context.db.query.users({}, info);
  } 
};
