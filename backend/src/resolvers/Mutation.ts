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

module.exports = {
  async createItem(parent, args, context, info) {
    const item = await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);
    return item;
  },
  updateItem(parent, args, context, info) {
    const updates = { ...args };
    delete updates.id;
    return context.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id
      }
    }, info);
  },
  async deleteItem(parent, args, context, info) {
    const where = { id: args.id };
    const item = await context.db.query.item({ where }, `{ id, title }`);
    return context.db.mutation.deleteItem({ where }, info);
  }
};
