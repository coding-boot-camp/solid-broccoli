const { signToken } = require('../utils/auth')
const User = require('../models/User')

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
  }
};

module.exports = resolvers;