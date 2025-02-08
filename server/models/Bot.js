const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const botSchema = new Schema({
  chassis: {
    type: String,
    required: 'Please pick a chassis for your bot!'
  },
  botName: {
    type: String,
    required: 'Your bot needs a name!',
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  botColour: {
    type: String,
    required: 'Please pick a colour for your bot!',
    trim: true,
  },
  botInventor: {
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

const Bot = model('Bot', botSchema);

module.exports = Bot;
