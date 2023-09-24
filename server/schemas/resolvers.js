// remember resolvers are responsible for handling the actual logic and data retrieval for GraphQl operations

// all manipulations in the user-controller.js file are related to the user model 
const { User } = require('../models');
//import signToken function from our auth file
const { signToken } = require('../utils/auth');

const resolvers = {
  //QUERY OBJECT
  Query: {
    // Query to get the currently authenticated user
    me: async (parent, args, context) => {
      //check for user in context
      if (context.user) {
        //if authenticated return user data
        return await User.findOne({ _id: context.user._id });
      }
      return null;
    },
  },
  //MUTATION OBJECT
  Mutation: {
    //Mutation to handle user login
    login: async (parent, { email, password }) => {
      //find user by email or username
      const user = await User.findOne({ $or: [{ username: email }, { email }] });

      if (!user) {
        //if user not found throw error
        throw new Error("Can't find this user");
      }

      //check if the password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        //if password not correct send error
        throw new Error('Wrong password!');
      }

      //Generate JWT token for authenticated user
      const token = signToken(user);
      //return token and user
      return { token, user };
    },
    //Mutation to create a new user
    addUser: async (parent, args) => {
      //create a new user based on the provided arguments
      const user = await User.create(args);

      if (!user) {
        //if user creation fails throw error 
        throw new Error('Something is wrong!');
      }

      //create new JWT for the the new user
      const token = signToken(user);
      //return token and user
      return { token, user };
    },
    //Mutation to save a book to a user's list of saved books
    //args = bookData
    saveBook: async (parent, { bookData }, context) => {
      if (!context.user) {
        //check if user is authenticated, if not throw error
        throw new Error('Authentication required');
      }

      try {
        //update user's saved books by adding the provided book information
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        //return updated user data
        return updatedUser;

      } catch (err) {
        //throw and console.log error if something goes wrong
        console.log(err);
        throw new Error('Error saving book');
      }
    },
    //Mutation to remove a book from user's list of saved books
    //args = bookId
    removeBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        //if user not authenticated throw error 
        throw new Error('Authentication required');
      }
      //Update the user's 'savedBooks' field by removing the book based off of the bookID 
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
