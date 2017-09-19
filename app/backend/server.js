const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const model = require('./models');
const User = model.User;
const BusyCard = model.BusyCard;
const CardList = model.CardList;

const BCRYPT_COST = 11;



const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, POST, UPDATE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

const sendUserError = (err, res) => {
  res.status(422);
  if (err && err.message) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
    return
  }
  res.json(err);
}

const verifyUser = (req, res, next) => {
  console.log('middleware hit');
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    sendUserError('the token was not provided', res);
    return;
  }
  jwt.verify(token, 'secret', (err, decodedToken) => {
    if (err) {
      sendUserError('token not valid', res);
      return;
    }
    req.decoded = decodedToken;
    next();
  });
};

app.post('/user', (req, res) => {
  const { username, password } = req.body;
  if (password === "") {
    sendUserError("Please input a valid password", res);
    return;
  }

  bcrypt.hash(password, BCRYPT_COST, (err, passwordHash) => {
    if (err) {
      sendUserError(err, res);
      return;
    }

    const newUser = new User({ username, passwordHash });
    newUser.save((error, user) => {
      if (error) {
        sendUserError(error, res);
        return;
      }
      res.json({Success: "Happens"});
    })
  })
})
app.post('/createcard', (req, res) => {
  const { card } = req.body;
  const newCard = new BusyCard({ card });
  newCard.save((error, card) => {
    if (error) {
      sendUserError(error, res);
      return;
    }
    res.json({Success: "Happens"});
  })
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if(!password) {
    sendUserError("Please input a valid Username/Password", res);
  }
  if(!username) {
    sendUserError("Please input a valid Username/Password", res);
  }
  console.log('username: ' + username + ' password: ' + password);
  User.findOne({ username }, (err, user) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    if (!user) {
      sendUserError("Please input a valid Username/Password", res);
      return;
    }
    if (bcrypt.compareSync(password, user.passwordHash)) {
      //implement token here
      res.json({ success: true, id: user._id});
      return;
    }
    sendUserError("Please input a valid Username/Password", res);
  })
})

app.listen(3007, () => {
  console.log('I hear you loud and proud on port 3007');
});