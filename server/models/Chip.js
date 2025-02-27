const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const chipSchema = new Schema({
  chipType: {
    type: String
  },
  chipName: {
    type: String,
  },
  chipDesc: {
    type: String,
  },
  chipEffect: {
    type: String,
  },
  // rarity: {
  // implement later
  // },
  inventor: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Chip = model('Chip', chipSchema);

module.exports = Chip;
