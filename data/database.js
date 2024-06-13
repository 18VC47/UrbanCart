const mongodb = require('mongodb');

let database;

async function connectToDatabase() {
  const mongoUrl = process.env.MONOGO_URL || 'mongodb://127.0.0.1:27017';
  const client = new mongodb.MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    database = client.db('online-shop');
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    throw error;
  }
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }
  return database;
}

module.exports = {
  connectToDatabase,
  getDb
};
