import { ApolloServer,gql } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { products , categories } from './data.js'



const typeDefs = gql`

    type Product {
      id: ID!
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      image: String
      onSale: Boolean
    }

    type Category {
      id: ID!
      name: String!
      products:[Product!]!
    }

    type Query {
      products: [Product!]!
      product(id: ID!): Product
      categories:[Category!]!
      category(id:ID!): Category
    }
   
    
`

function selectById(args , datas){
  const {id} = args
  return datas.find((data)=> data.id === id) 
}

const resolvers = {
  Query: {
    products: ()=> products,
    product:(parent , args , context)=> selectById(args,products), 
    categories:()=> categories,
    category:(parent , args , context)=> selectById(args,categories), 
  },

  Category:{
    products:(parent,args,context)=> {
      const {id} = parent
      return products.filter(product => product.categoryId === id)
    }
  }

};


async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
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

