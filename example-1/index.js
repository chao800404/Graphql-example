import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import typeDefs from './schema.js'
import Category from './resolvers/category.js'
import Product from './resolvers/product.js'
import Query from './resolvers/query.js'
import Mutation from './resolvers/mutation.js';
import {db} from './data.js'

const resolvers = {
  Category,
  Product,
  Query,
  Mutation
}



async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
 
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context:{
      db
    }
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/'
  });

  
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}




startApolloServer(typeDefs,resolvers)

