const { forwardTo } = require('prisma-binding');

const Query = {
  //useful for quickly setting stuff up and mocking, onyl works for basic mutations and queries
  items: forwardTo('db')
  // async items(parent, args, context, info) {
  //   const items = await context.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
