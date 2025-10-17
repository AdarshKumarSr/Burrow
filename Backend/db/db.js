const mongoose = require('mongoose');

function connectToDb() {
  const dbUri = process.env.DB_CONNECT;

  if (!dbUri) {
    console.error('DB_CONNECT is not set!');
    process.exit(1);
  }

  mongoose
    .connect(dbUri)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => {
      console.error('❌ Error connecting to MongoDB:', err);
      process.exit(1);
    });
}

module.exports = connectToDb;
