const express = require('express');
//*import ApolloServer 4
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')

const path = require('path');
//import authMiddleware from utils/auth.js
const {authMiddleware} = require('./utils/auth')


//import schemas
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
//create new ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //apply JWS authentication
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//refer to the routes folder to handle routing
app.use(routes);

/*
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
*/

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server),
  )

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();