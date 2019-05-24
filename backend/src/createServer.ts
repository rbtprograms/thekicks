const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation.ts');
const Query = require('./resolvers/Query.ts');
const db = require('./db.ts');

//instantiate server
module.exports = () => {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db }),
  });
}
