import { ApolloServer   } from 'apollo-server-express';
import { PrismaClient , User as Auth } from '@prisma/client'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginInlineTraceDisabled,
  
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs } from './schema'
import { Query, Mutation , Profile , User , Post } from '../resolver'
import cookie from 'cookie'
import JWT from 'jsonwebtoken'
import cors from 'cors'
import { json } from 'body-parser';



const jwt_key = process.env.JWT_TOKEN_KEY as string

interface ApolloConfig {
  typeDefs: typeof typeDefs
  resolvers: typeof resolvers
}


const port = process.env.node_env === 'production'? process.env.PORT : 5000



export const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation,
  Profile,
  User,
  Post
}

async function startApolloServer({ typeDefs, resolvers }: ApolloConfig) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache:"bounded",
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginInlineTraceDisabled(),
    ],
    context: ({req,res})=>{

      const token = cookie.parse(req.headers.cookie || "").newToken
      const user  = (token ? JWT.verify(token , jwt_key) : null) as Auth | null 
      
      return {
        prisma,
        user, 
        req, 
        res
      }
    }
  });

  await server.start();
  app.use(cors())
  server.applyMiddleware({ app, path: "/" });

  await new Promise(resolve => httpServer.listen({ port:port }, resolve as any));

  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}



startApolloServer({ typeDefs, resolvers }).then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.log(e)
  await prisma.$disconnect()
  process.exit(1)
})