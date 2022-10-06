import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs } from './schema'
import { Query, Mutation } from '../resolver'



interface ApolloConfig {
  typeDefs: typeof typeDefs
  resolvers: typeof resolvers
}

export const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation
}

async function startApolloServer({ typeDefs, resolvers }: ApolloConfig) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
    context: {
      prisma
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: "/" });

  await new Promise(resolve => httpServer.listen({ port: 5000 }, resolve as any));

  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}



startApolloServer({ typeDefs, resolvers }).then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.log(e)
  await prisma.$disconnect()
  process.exit(1)
})