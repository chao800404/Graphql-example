import { ApolloServer } from 'apollo-server-express';
import { PrismaClient , User } from '@prisma/client'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs } from './schema'
import { Query, Mutation , Profile } from '../resolver'
import cookie from 'cookie'
import JWT from 'jsonwebtoken'
import {ApolloContext} from '../resolver/base'

const jwt_key = process.env.JWT_TOKEN_KEY as string

interface ApolloConfig {
  typeDefs: typeof typeDefs
  resolvers: typeof resolvers
}




export const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation,
  Profile
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
    context: ({req,res}):ApolloContext=>{

      const token = cookie.parse(req.headers.cookie || "").newToken
      const user  = (token ? JWT.verify(token , jwt_key) : null) as User | null 
      
      return {
        prisma,
        user, 
        req, 
        res
      }
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