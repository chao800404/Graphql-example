
import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Product {
      id: ID!
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      image: String
      onSale: Boolean
      category: Category
      review(filter: ReviewFilterInput): [Review!]!
    }    

    type Category {
      id: ID!
      name: String!
      products(filter: ProductsFilterInput):[Product!]!
    }

    type Review {
      id: ID!,
      date: String!,
      title: String!,
      comment: String!,
      rating: Int!,
    }

    type Query {
      products(filter: ProductsFilterInput): [Product!]!
      product(id: ID!): Product
      categories:[Category!]!
      category(id:ID!): Category
    }

    type Mutation {
      addCategory(input: AddCategory): Category!
    }

    input ProductsFilterInput {
      onSale: Boolean
      avgRating: Int
    }

    input ReviewFilterInput {
      rating: Int!
    }

    input AddCategory {
      name:String!
    }


`

export default typeDefs