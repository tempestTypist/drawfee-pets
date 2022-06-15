const mongoose = require('mongoose');




// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://TempestTypist:<password>@cluster0.jljs2.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });







mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/drawfee-pets',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
