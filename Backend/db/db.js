const mongoose = require('mongoose');

function connectToDb() {   
    mongoose.connect(process.env.DB_CONNECT,
        //  { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => {
            console.error('Error connecting to the database: ', error);
        });
    }

module.exports = connectToDb;