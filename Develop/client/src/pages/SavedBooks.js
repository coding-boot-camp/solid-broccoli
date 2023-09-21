//import React, { useState /*, useEffect*/ } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

//import { getMe/*, deleteBook*/ } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

//import useMutation form apolloClient
import { useMutation, useQuery } from '@apollo/client';
//import get me query
import {GET_ME} from '../utils/queries'
//import REMOVE_BOOK mutation
import {REMOVE_BOOK} from '../utils/mutation'

const SavedBooks = () => {

    //initialize the SAVE_BOOK mutation
    const [deleteBook] = useMutation(REMOVE_BOOK);
    //initialize the GET_ME query
    const { loading, error, data } = useQuery(GET_ME);
    //check userData is available from query
    const userData = data?.me || {};


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Use the removeBook mutation to delete the book
      const { data } = await deleteBook({
        variables: { bookId }, // Pass the bookId as a variable to the mutation
      });


      //const updatedUser = data.removeBook;

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };
  // userData from the query is used within the HTML
  // where it loops over the information to be displayed 
  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;


  /*
    const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);
  */
