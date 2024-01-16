const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, arg, context) => {
            if (context.user) {
            return await User.findOne({_id: context.user._id}).populate('savedBooks');
        }
        throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },

            saveBook: async (parent, { input }, context) => {
                if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true }
                );
        
                return user;
                }
        
                throw new AuthenticationError('You need to be logged in!');
            },

            removeBook: async (parent, { bookId }, context) => {
                if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
        
                return user;
                }
        
                throw new AuthenticationError('You need to be logged in!');
            },
    },
};

module.exports = resolvers;

