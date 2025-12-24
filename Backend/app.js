const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.route');
const doctorRoutes = require('./routes/doctor.route'); 
const predictRoute = require('./routes/predict');
const appointmentRoutes = require('./routes/appointment.route');


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
app.use('/doctors', doctorRoutes); 
app.use('/api/predict', predictRoute);
app.use('/appointments', appointmentRoutes);

module.exports = app;
