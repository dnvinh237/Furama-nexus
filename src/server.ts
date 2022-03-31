import { middlewares } from "./graphql-shield/graphql-shield";
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { db } from "./db";
import { applyMiddleware } from "graphql-middleware";

export const server = new ApolloServer({
  schema: applyMiddleware(schema, middlewares),
  context: ({ req }) => {
    return {
      request: req,
      db,
      // pubsub,
    };
  },
});
