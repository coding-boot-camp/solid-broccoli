import { gql } from '@apollo/client';

//query here lists all parameters for consistency
// Query to get the current user's data
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;