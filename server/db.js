const { MongoClient, ObjectId } = require("mongodb");

const dbClientPromise = () =>
  new Promise((resolve, reject) => {
    const uri =
      "mongodb+srv://alaa:8fUXubJdAJC2KP4@cluster0-ahqro.azure.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    client.connect(err => {
      if (err) {
        reject(err.message);
      }
      const database = client.db("ps-database");
      resolve(database);
      // perform actions on the collection object
    });
  });

module.exports = dbClientPromise;
