const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(
  uri || 'mongodb://localhost/drawfee-pets',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;