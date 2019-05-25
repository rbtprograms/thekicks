module.exports = {
  async createItem(args, context, info) {
    const item = await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);
    return item;
  }
};
