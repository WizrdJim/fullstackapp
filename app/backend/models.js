const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/fullstackapp', {useMongoClient: true});


const BusyCardSchema = new Schema({
  name: String,
  title: String,
  link: String
});

const CardListSchema = new Schema({
  parentId: String,
  personalList: [{
    type: Schema.Types.ObjectId,
    ref: "BusyCard"
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
    ref: "BusyCard"
  },
  loc: {
    type: [Number], //[<longitude>, <latitude>]
    index: '2d' //create the geospatial index
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