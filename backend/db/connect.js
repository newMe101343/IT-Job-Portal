const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI from environment variable or fallback to localhost
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/yourDatabaseName"; // Replace `yourDatabaseName` with the actual name

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI); // Mongoose defaults are now sufficient
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

module.exports = connectDB;
