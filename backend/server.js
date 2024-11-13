const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors()); // Apply CORS middleware properly

app.get('/', (req, res) => {
  // Sending JSON data as expected by the React frontend
  res.json({ message: 'brrrrrrrrr!' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
