import { gql } from '@apollo/client';

//mutation here validates user login
//define the mutation, takes two args: email and password
//two fields are requested token and user and user id?
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) { 
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

//creates a new user 
//define the args: username, email,password
//request token and user object {_id, username, email}
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`

//mutation save book
//args: bookData object
//requests a bookData object containing all the information
export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
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

//similar id as add a a book but the arg taken is the bookID
//once the bookID is defined it removes the object and all it's pertaining fields
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
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