const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(
  uri || 'mongodb://localhost/bot-builder',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;