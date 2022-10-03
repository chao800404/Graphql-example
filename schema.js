
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
      addProduct(input: AddProduct): Product!
      addReview(input:AddReview): Review!
      deleteCategory(id: ID!): Boolean!
      deleteProduct(id: ID!): Boolean! 
      deleteReview(id: ID!): Boolean!
      updateCategory(id:ID! input: UpdateCategory!): Category
      updateProduct(id:ID! input:UpdateProduct!):Product
      updateReview(id:ID! input:UpdateReview): Review
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

    input UpdateCategory {
      name:String!
    }

    input AddProduct {
      name: String!
      description: String!
      quantity: Int!
      price: Float!
      image: String!
      onSale: Boolean!
      categoryId:ID!
    }

    input UpdateProduct {
      name: String
      description: String
      quantity: Int
      price: Float
      image: String
      onSale: Boolean
      categoryId:ID
    }



    input AddReview {
      title: String!
      comment: String!
      rating: Int!
      productId: ID!,
    }

    input UpdateReview {
      title: String
      comment: String
      rating: Int
    }


`

export default typeDefs