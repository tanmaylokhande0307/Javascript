import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typedefs as typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`server ready at ${url}`);
};

startServer()