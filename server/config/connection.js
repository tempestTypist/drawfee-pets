const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb+srv://TempestTypist:Cry5t4lG3m5@cluster0.jljs2.mongodb.net/drawfee-pets?retryWrites=true&w=majority";

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