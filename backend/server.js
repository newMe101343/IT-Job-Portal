const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect');

const app = express()
const port = process.env.PORT || 8000

app.use(cors()); 

connectDB();

app.get('/', (req, res) => {
  // Sending JSON data as expected by the React frontend
  res.json({ message: 'brrrrrrrrr!' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
