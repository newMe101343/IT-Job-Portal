const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const applicant = require('./routes/applicant.route'); 
const HR = require('./routes/hr.route')
const job = require('./routes/job.route');
const skill = require('./routes/skill.route');
const multer = require('multer');
const upload = multer(); 

const app = express();
const port = process.env.PORT || 8000;

// CORS middleware with specific options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests only from this origin
    credentials: true, // To include cookies in requests
};

// Middlewares
app.use(cors(corsOptions)); // Use the customized CORS options
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());


// Connecting MongoDB
connectDB();

// Routes
app.use('/applicant', applicant);
app.use('/HR', HR);
app.use('/job', job);
app.use('/skill', skill);

app.get('/', (req, res) => {
    res.json({ message: 'Backend connected successfully' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
