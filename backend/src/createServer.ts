import { GraphQLServer } from "graphql-yoga";
import Mutation = require("./resolvers/Mutation");
import Query = require ("./resolvers/Query");
import * as db from "./db";

//instantiate server

module.exports = () => {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: (req: Array<any>) => ({ ...req, db })
  });
};
