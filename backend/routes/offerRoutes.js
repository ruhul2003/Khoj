const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { offers, products } = require('../store');

// POST /api/offers - Make price offer
router.post('/', async (req, res) => {
  try {
    const { productId, buyerId, buyerName, offeredPrice, message } = req.body;

    let targetProduct;
    if (getIsConnected()) {
      targetProduct = await Product.findById(productId);
    } else {
      targetProduct = products.find(p => p._id === productId);
    }

    if (!targetProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const offerData = {
      productId: targetProduct._id || targetProduct.id,
      productTitle: targetProduct.title,
      productPrice: targetProduct.price,
      productImage: targetProduct.images[0] || '',
      buyerId: buyerId || 'user_demo_2',
      buyerName: buyerName || 'Sabbir Hossain',
      sellerId: targetProduct.sellerId,
      offeredPrice: Number(offeredPrice),
      message: message || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      const createdOffer = await Offer.create(offerData);
      return res.status(201).json(createdOffer);
    } else {
      const createdOffer = {
        _id: 'off_' + Date.now(),
        ...offerData
      };
      offers.unshift(createdOffer);
      return res.status(201).json(createdOffer);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/offers
router.get('/', async (req, res) => {
  try {
    const { userId, role, productId } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (productId) query.productId = productId;
      if (role === 'seller' && userId) query.sellerId = userId;
      if (role === 'buyer' && userId) query.buyerId = userId;

      const dbOffers = await Offer.find(query).sort({ createdAt: -1 });
      return res.json(dbOffers);
    } else {
      let result = [...offers];
      if (productId) result = result.filter(o => o.productId === productId);
      if (role === 'seller' && userId) result = result.filter(o => o.sellerId === userId);
      if (role === 'buyer' && userId) result = result.filter(o => o.buyerId === userId);
      return res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/offers/:id/status - Accept or Reject offer
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Accepted', 'Rejected'

    if (getIsConnected()) {
      const updated = await Offer.findByIdAndUpdate(id, { status }, { new: true });
      return res.json(updated);
    } else {
      const targetOffer = offers.find(o => o._id === id);
      if (!targetOffer) return res.status(404).json({ error: 'Offer not found' });
      targetOffer.status = status;
      return res.json(targetOffer);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
