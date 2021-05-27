const { logger } = require('../logger/logger')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongoose.connection.once('open', function() {
    logger.info({level: 'info',  message: `Connected to MongoDB!`,  timestamp: Date.now() - 10800000 })
}).on('error', function(err) {
    throw new Error(err)
})