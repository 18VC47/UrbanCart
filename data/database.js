const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

let Mongo = 'mongodb://127.0.0.1:27017';

if(process.env.MONOGO_URL){
  Mongo = MONOGO_URL;
}

async function connectToDatabase() {
  const client = await MongoClient.connect(Mongo);
  database = client.db('online-shop');
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};