// Express
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const endpointNotFound = require('./errors/endpoinNotFound');
const errorHandler = require('./middleware/errorHandler');
const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.use(express.static('public'))

// Routes
app.use('/api', require('./routes'));

app.use(errorHandler);
app.use(endpointNotFound);

module.exports = app;
