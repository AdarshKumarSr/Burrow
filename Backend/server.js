const dotenv = require('dotenv');
dotenv.config(); 

const app = require('./app'); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Node server running at http://localhost:${PORT}`);
});
