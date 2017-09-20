const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/fullstackapp', {useMongoClient: true});


const BusyCardSchema = new Schema({
  name: String,
  title: {
    type: String,
    required: true
  },
  link: String
});

const CardListSchema = new Schema({
  parentId: String,
  personalList: [{
    type: Schema.Types.ObjectId,
    ref: "BusinessCard"
  }]
})



const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  bCard: {
    type: Schema.Types.ObjectId,
    ref: "BusinessCard"
  }
});


User = mongoose.model("User", UserSchema);
BusyCard = mongoose.model("BusyCard", BusyCardSchema);
CardList = mongoose.model("CardList", CardListSchema);

module.exports = {
  User,
  BusyCard,
  CardList
};