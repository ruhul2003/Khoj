const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { seedProducts, users: seedUsers } = require('../store');

// POST /api/seed - Seed database with realistic marketplace data
router.post('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await Product.deleteMany({});
      await User.deleteMany({});
      await Product.insertMany(seedProducts);
      await User.insertMany(seedUsers);
      return res.json({ message: 'MongoDB successfully seeded with 8 marketplace products and demo users!' });
    } else {
      return res.json({ message: 'Memory store reset with sample marketplace items!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
