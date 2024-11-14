const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect');
const applicant = require('./routes/applicant.route') 

const app = express()
const port = process.env.PORT || 8000

//CORS middleware
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json());

//Connecting MongoDB
connectDB();

//applicant middleware for routing
app.use('/applicant',applicant);

app.get('/', (req, res) => {
  res.json({ message: 'Backend connected successfully' });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
