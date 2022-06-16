const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri, 
//   { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     serverApi: ServerApiVersion.v1 
//   });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   client.close();
// });

// const client = new MongoClient.connect(
//   process.env.MONGODB_URI,
//   { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     serverApi: ServerApiVersion.v1 
//   }
// );

// || 'mongodb://localhost/drawfee-pets'

mongoose.connect(
  'mongodb://localhost/drawfee-pets',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;