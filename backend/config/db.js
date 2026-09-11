const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/khoj_db';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host} / DB: ${conn.connection.db.databaseName}`);

    // Auto-seed initial catalog into products collection if empty
    try {
      const Product = require('../models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        const { seedProducts } = require('../store');
        const sanitized = seedProducts.map(({ _id, ...p }) => p);
        await Product.insertMany(sanitized);
        console.log(`Seeded ${sanitized.length} initial products into MongoDB ${conn.connection.db.databaseName}.products`);
      }

      const Shop = require('../models/Shop');
      const shopCount = await Shop.countDocuments();
      if (shopCount === 0) {
        const { shops: seedShops } = require('../store');
        const sanitizedShops = seedShops.map(({ _id, ...s }) => s);
        await Shop.insertMany(sanitizedShops);
        console.log(`Seeded ${sanitizedShops.length} initial shops into MongoDB ${conn.connection.db.databaseName}.shops`);
      }
    } catch (seedErr) {
      console.warn('Seeding check note:', seedErr.message);
    }
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}. Operating with fallback seed layer.`);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
