import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

// import mongoose from "mongoose";

// mongoose.connect(process.env.BACKEND_URI);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

server
  .listen(process.env.PORT)
  .then(({ url }) => console.log(`Server's runing : ${url}`));
