const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.route');
const doctorRoutes = require('./routes/doctor.route'); // ✅ updated from captainRoutes
const predictRoute = require('./routes/predict');

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes); // ✅ changed from '/captains'
app.use('/api/predict', predictRoute);

module.exports = app;
