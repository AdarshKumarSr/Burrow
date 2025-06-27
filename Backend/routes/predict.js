
const express = require('express');
const axios = require('axios');

const router = express.Router();

// POST /api/predict
router.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    // Call your Python Flask ML server
    const response = await axios.post('http://localhost:5000/predict', {
      text,
    });

    // Send back the ML response to frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Flask API:', error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;
