const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');

const api = require('./api');
const project = require('./constants/project');

const app = express();

const allowedOrigins = [process.env.cORS, 'https://www.rondemaestro.com'];

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Origin, X-Requested-With, Content-Type, Accept',
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
