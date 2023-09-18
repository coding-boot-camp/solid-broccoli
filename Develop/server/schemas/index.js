//manage typeDefs and resolver files
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

//export for server.js to reference
module.exports = { typeDefs, resolvers };
