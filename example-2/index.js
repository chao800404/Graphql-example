import { ApolloServer , gql } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';


export const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Mutation {
    groupCreate(
      groupInput: GroupInput!
    )
    groupUpdate(
      groupId: ID!
      groupInput: GroupInput!
    ): GroupUpdatePayload
    groupDelete(groudId: ID!)
    groupPublish(groudId: ID!)
    groupUnpublish(groudId: ID!)
    groupAddCars(groudId: ID! carId: ID!)
    groupRemoveCars(groudId: ID! carId: ID!)
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    name: String!
    featureSet: GroupFeatureSet
    hasCar(id: ID!): Boolean!
    image: Image!
    cars(skip:Int! , take:Int!): [Car!]!
    description: String!
  }

  type GroupUpdatePayload {
    userErrors: [UserErrors!]!
    group: Group
  }

  type UserErrors {
    message: String!
    field: [String!]!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeatures {
    feature: GroupFeatureFields!
  }


  input ImageInput {
    url: String!
  }

  input GroupInput {
    name: String
    image: ImageInput
    description: String
    feature: GroupFeatureFields
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLUNDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  } 


`;

const resolvers = {
  Query: {
    cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
  },
}



async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), 
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
    
  });

  await server.start();
  server.applyMiddleware({ app , path:"/" });

  await new Promise(resolve => httpServer.listen({ port: 3030 }, resolve));

  console.log(`🚀 Server ready at http://localhost:3030${server.graphqlPath}`);
}


startApolloServer(typeDefs ,  resolvers )