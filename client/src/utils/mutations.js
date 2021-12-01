import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation saveBook(
    $authors: [String],
    $description: String!,
    $bookId: String!,
    $image: String,
    $link: String,
    $title: String!
  ) {
    saveBook(
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
      title: $title
    ) {
      _id
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