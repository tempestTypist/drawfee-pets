const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const petSchema = new Schema({
  petSpecies: {
    type: String,
    required: 'Please pick a pet!'
  },
  petName: {
    type: String,
    required: 'Your pet needs a name!',
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  petColour: {
    type: String,
    required: 'Pick a colour for your pet!',
    trim: true,
  },
  petOwner: {
    type: String,
    // required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Pet = model('Pet', petSchema);

module.exports = Pet;
