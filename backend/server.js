const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const applicant = require('./routes/applicant.route'); 
const HR = require('./routes/hr.route')

const app = express();
const port = process.env.PORT || 8000;

// CORS middleware with specific options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests only from this origin
    credentials: true, // To include cookies in requests
};
app.use(cors(corsOptions)); // Use the customized CORS options

// Middleware to parse JSON bodies
app.use(express.json());

// Connecting MongoDB
connectDB();

// Applicant middleware for routing
app.use('/applicant', applicant);
app.use('/HR', HR);

app.get('/', (req, res) => {
    res.json({ message: 'Backend connected successfully' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
