const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');


const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, POST, PUT",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use('/', routes);





app.listen(3007, () => {
  console.log('I hear you loud and proud on port 3007');
});