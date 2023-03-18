const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
  messageRecipient: {
    type: String,
    required: 'Please enter the username of the person youre sending the message to!',
    trim: true,
    minlength: 5,
    maxlength: 30,
  },
  messageTitle: {
    type: String,
    required: 'Please enter a title!',
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  messageText: {
    type: String,
    required: 'Please enter text for your post!',
    minlength: 2,
    maxlength: 280,
    trim: true,
  },
  messageAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Message = model('Message', messageSchema);

module.exports = Message;
