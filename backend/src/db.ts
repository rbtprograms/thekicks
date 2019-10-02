import { Prisma } from "prisma-binding";
require("dotenv").config({ path: "variables.env" });

module.exports = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true
});
