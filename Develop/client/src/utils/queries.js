//const { gql, useQuery } = require('@apollo/client');

import { gql } from '@apollo/client';

export const GET_ME = gql`
    query {
        me {
            _id: ID!
            username: String!
            email: String!
            bookCount: Int!
            savedBooks: [Book]!
        }
    }
`