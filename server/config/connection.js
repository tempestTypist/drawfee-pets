const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb+srv://TempestTypist:Cry5t4lG3m5@cluster0.jljs2.mongodb.net/bot-builder?retryWrites=true&w=majority&appName=Cluster0";

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