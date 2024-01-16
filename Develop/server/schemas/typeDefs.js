const typeDefs = `
type query {
    me: User
    }

type mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

input bookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}
`;

module.exports = typeDefs;