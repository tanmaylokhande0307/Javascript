import { gql } from "graphql-tag";

export const typedefs = gql`
    type Product {
        id: ID!
        title: String!
        category: String!
        price: Float!
        inStock: Boolean!
    }

    type Query {
        products: [Product!]!
        product(id: ID!): Product 
    }

    type Mutation {
        createProduct(
            title: String!
            category: String!
            price: Float!
            inStock: Boolean!
        ): Product
    }
` 