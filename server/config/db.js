const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI environment variable is not set!");
    console.error("Please create a .env file with your MongoDB connection string.");
    process.exit(1);
}

const connection = mongoose.connect(MONGO_URI, {
    // MongoDB connection options
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log("✅ Connected to MongoDB successfully");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
});

module.exports = {connection};