const express = require('express');

//*import ApolloServer 4
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
//const path = require('path');

//import authMiddleware from utils/auth.js
const {authMiddleware} = require('./utils/auth')


//import schemas
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// npm install @apollo/server express graphql cors body-parser
//import { ApolloServer } from '@apollo/server';
//import { expressMiddleware } from '@apollo/server/express4';
const { ApolloServerPluginDrainHttpServer }= require('@apollo/server/plugin/drainHttpServer');
//const  {express} = require('express');
const {http} = require('http');
const {cors} = require('cors');
const {pkg} = require('body-parser');
const { json } = pkg;
//const { typeDefs, resolvers } = require('./schema');

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: authMiddleware,
  }),
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
/*
//create new ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//refer to the routes folder to handle routing
app.use(routes);

/*
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
        //apply JWS authentication
        context: authMiddleware,
    }),
  );
  /*app.use(
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
  */