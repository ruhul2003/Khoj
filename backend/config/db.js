const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/khoj_db';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 2500, // Timeout after 2.5s if mongo isn't available locally
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. Operating with fallback seed layer.`);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
