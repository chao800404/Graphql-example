"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `

  type Query {
    me: AuthPayload!
    posts: [Post!]!
    profile(userId: ID!): Profile!
  }

  type Mutation {
    postCreate(input:PostInput!): PostPayload!
    postUpdate(postId:ID! input:PostInput!): PostPayload!
    postDelete(postId:ID!): PostPayload!
    postPublish(postId:ID! published:Boolean!): PostPayload!
    signup(name:String! email:String! password:String! bio:String!): AuthPayload!
    signin(email:String! password:String!): AuthPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String! 
    updatedAt: String!
    user: User!
  }

  type Profile {
    id: ID!
    user: User!
    isMyProfile: Boolean!
    bio: String!
  }


  type PostPayload {
    userErrors:[UserError!]!
    post: Post
  }

  type UserError {
    message: String
    fields: [String]
  }

  input PostInput {
    title: String
    content: String
  }

  type AuthPayload {
    userErrors:[UserError!]!
    token: String 
    user: User
  }
`;
//# sourceMappingURL=schema.js.map