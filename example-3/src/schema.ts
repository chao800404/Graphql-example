import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
  }

  type Mutation {
    postCreate(title:String! content:String!): PostPayload!
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
    userError:[String!]
    post: Post
  }  
`