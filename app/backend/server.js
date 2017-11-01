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
  // Create a default for the cards
  const name = 'Busy'
        title = 'Card'
        link = 'Busy@BusyCard.busyness';
  //Get the username/password does basic error handling
  const { username, password } = req.body;
  if (password === "") {
    sendUserError("Please input a valid password", res);
    return;
  }
  //encrypt password cause no one needs to know
  console.log(username+''+password);
  bcrypt.hash(password, BCRYPT_COST, (err, passwordHash) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    //builds boilerplate card
    console.log(name+''+title+''+link);
    const newCard = new BusyCard({name, title, link});
    newCard.save((error, card) => {
      if (error) {
        console.log(error.message)
        sendUserError(error, res);
        return;
      }
      console.log(card);
      //Connect the user with the default card id
      const bCard = card._id;
      console.log(bCard);

      const newUser = new User({ username, passwordHash, bCard });
      newUser.save((erro, user) => {
        if (error) {
          console.log(erro);
          sendUserError(erro, res);
          return;
        }
        //User saved should return the user_id and the busycard does not currrently!!!!!!
        console.log(user._id+''+ user.bCard)
        res.json({id: user._id, bCard: user.bCard});
      })
    })
  })
})
app.put('/card', (req, res) => {
  //find card by id update card
  console.log(req.body.card);
  const { id, name, title, link } = req.body.card;
  BusyCard.findOne({_id: id}, (error, card) => {
    if (error) {
      sendUserError(error, res);
    }
    if (!card) {
      console.log('card not found');
      return;
    }
    card.name = name;
    card.title = title;
    card.link = link;
    card.save((error, card) => {
      if (error) {
        sendUserError(error, res);
        return;
      }
      res.json(card);
    });
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
  User.findOne({ username })
    .populate('bCard')
    .exec((err, user) => {
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
      const card = user.bCard;
      console.log(card);
      res.json({ success: true, id: user._id, card});
      return;
    }
    sendUserError("Please input a valid Username/Password", res);
  })
})

app.listen(3007, () => {
  console.log('I hear you loud and proud on port 3007');
});