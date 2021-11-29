const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    helloWorld: () => {
      return 'Hello world!';
    }
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
    }
  }
};

module.exports = resolvers;