const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('books')
        return userData
      }
      throw new AuthenticationError('Not logged in')
    },
    helloWorld: () => {
      return 'Hello world!';
    }
/*     getMe: async () => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!')
      }
      const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        .populate('books')
      return userData
    } */
  },
  Mutation: {
    addUser: async (_parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return { token, user }
    },
    login: async (_parent, { email, password }) => {
      const isCorrectPassword = async (password, hash) => {
        return bcrypt.compare(password, hash)
      }
      const user = await User.findOne({ email })
      // Hash even if no user to avoid timing attacks
      const hash = (user || {}).password || 'not_a_real_hash'
      const correctPassword = await isCorrectPassword(password, hash)
      if (!correctPassword) {
        throw new AuthenticationError('Incorrect credentials')
      }
      const token = signToken(user)
      return { token, user }
    },
    saveBook: async (_parent, body, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!')
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      )
      return updatedUser;
    }
  }
};

module.exports = resolvers;