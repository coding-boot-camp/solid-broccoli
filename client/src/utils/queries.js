import { gql } from '@apollo/client'

export const ME = gql`
  query me {
    me {
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`