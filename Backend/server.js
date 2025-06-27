const dotenv = require('dotenv');
dotenv.config(); // Load .env variables before anything else

const app = require('./app'); // Import the configured Express app

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Node server running at http://localhost:${PORT}`);
});
