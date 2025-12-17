import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { buildSchema } from "type-graphql";
import { LoginResolver, RegisterResolver } from "./resolvers";

async function startServer() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log(`Server is running at http://localhost:4000/graphql`);
  });
}

startServer();
