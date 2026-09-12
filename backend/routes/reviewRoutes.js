const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { reviews } = require('../store');

// GET /api/reviews - Get reviews by productId or sellerId
router.get('/', async (req, res) => {
  try {
    const { productId, sellerId } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (productId) query.productId = productId;
      if (sellerId) query.sellerId = sellerId;
      const list = await Review.find(query).sort({ createdAt: -1 });
      return res.json(list);
    } else {
      let list = [...reviews];
      if (productId) list = list.filter(r => r.productId === productId);
      if (sellerId) list = list.filter(r => r.sellerId === sellerId);
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reviews - Submit review
router.post('/', async (req, res) => {
  try {
    const { productId, sellerId, reviewerId, reviewerName, reviewerAvatar, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ error: 'Product ID, rating (1-5), and review text are required.' });
    }

    const reviewData = {
      productId,
      sellerId: sellerId || '',
      reviewerId: reviewerId || 'anon_' + Date.now(),
      reviewerName: reviewerName || 'Verified Buyer',
      reviewerAvatar: reviewerAvatar || '',
      rating: Number(rating),
      comment: comment.trim(),
      verifiedPurchase: true,
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      const created = await Review.create(reviewData);
      return res.status(201).json(created);
    } else {
      const created = {
        _id: 'rev_' + Date.now(),
        ...reviewData
      };
      reviews.unshift(created);
      return res.status(201).json(created);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
