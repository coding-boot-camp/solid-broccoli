const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String
    image: String
    link: String
    type: String
  }
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    helloWorld: String
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
  }
`

module.exports = typeDefs;