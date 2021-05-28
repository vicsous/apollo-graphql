/* MongoDB */
require('../db/mongodb');

/* Lodash */ 
const { pick } = require('lodash');

/* User model */
const { User } = require('../db/models');

/* Schema */
const typeDefs = require('../graphql/schema');

/* Resolvers */
const resolvers = require('../graphql/resolvers');

/* Depth Limit */
const depthLimit = require('graphql-depth-limit');

/* Apollo Server */
const { ApolloServer } = require('apollo-server-express');

/* Apollo Server setup */
const server = new ApolloServer(
    {   introspection: true, playground: true,
        typeDefs, 
        resolvers,
        context: async () => {
            return { pick, User }
        },
        validationRules: [depthLimit(5)]
    }
);

/* Apply the Apollo GraphQL middleware and set the path to /api */
function getGraphql (app, url) {
    server.applyMiddleware({ app, path: url });
}

module.exports = { getGraphql }