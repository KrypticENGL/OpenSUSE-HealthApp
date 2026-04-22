/**
 * config/db.js — MongoDB Connection
 * Connects to MongoDB using Mongoose. Exits the process on failure.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 7+ does not need these options, but kept for clarity
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
