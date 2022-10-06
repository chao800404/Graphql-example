import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    posts:[Post!]!
  }

  type Mutation {
    postCreate(input:PostInput!): PostPayload!
    postUpdate(postId:ID! input:PostInput!): PostPayload!
    postDelete(postId:ID!): PostPayload!
  }

  type User {
    id: ID!
    name: String!
    eamil: String!
    profile: Profile!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String! 
    updatedAt: String!
  }

  type Profile {
    id: ID!
    user: User
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

`