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
const cartRoutes = require("./routes/cart.route");




const app = express();

connectToDb();

/**
 * ✅ CORS FIX (IMPORTANT)
 * We must allow ONLY the frontend domain
 * because we are sending cookies (credentials)
*/
app.use(
  cors({
    origin: [
      'https://burrow-3.onrender.com', // frontend (prod)
      'http://localhost:5173',         // frontend (local)
    ],
    credentials: true,
  })
);

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
app.use("/cart", cartRoutes);
app.use("/medicines", require("./routes/medicine.route"));


module.exports = app;
