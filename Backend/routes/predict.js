
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post('https://burrow-1.onrender.com/predict', {
      text,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error calling Flask API:', error.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;
