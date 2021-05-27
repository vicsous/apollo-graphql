/* Express async errors */
require('express-async-errors');

/* Uncaught exception handler */
process.on('uncaughtException', (err) => { 
    logger.error({ level: 'error', message: err.message, stack: err.stack, timestamp: Date.now() - 10800000 })
});

/* Unhandle rejection handler*/
process.on('unhandledRejection', (err) => { 
    logger.error({ level: 'error', message: err.message, stack: err.stack, timestamp: Date.now() - 10800000 })
    process.exit(1);
});

/* Cors */
const cors = require('cors');

/* Logger */
const { logger } = require('./src/logger/logger');

/* Dotenv */
require('dotenv').config();

/* GraphQL */
const { getGraphql } = require('./src/graphql/graphql');

/* Helmet */
const helmet = require('helmet');

/* Express */
const express = require('express');
const app = express();

/* Helmet */
//app.use(helmet());

/* Port */
const port = process.env.PORT || 3000;

/* Routes */
// Main
app.get('/', (_, res) => {
    res.status(200).send('Hello world!');
})

// GraphQL API
getGraphql(app, '/api');

// 404 handler
app.get('*', (_, res) => {
    res.status(404).send('Error 404 - Page not found!');
})

/* Express conection */
app.listen(port, () => {
    logger.info({ level: 'info',  message: `Express running on port ${port}!`,  timestamp: Date.now() - 10800000 })
});