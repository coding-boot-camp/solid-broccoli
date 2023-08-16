const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const newReq = authMiddleware({ req });
  },
});

server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => { 
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
   });
});
