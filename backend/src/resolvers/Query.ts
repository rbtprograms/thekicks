import { forwardTo } from "prisma-binding";

module.exports = {
  //useful for quickly setting stuff up and mocking, onyl works for basic mutations and queries
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(_0, _1, context, info) {
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
  }
};
