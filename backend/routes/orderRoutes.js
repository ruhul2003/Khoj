const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { orders, products } = require('../store');

// POST /api/orders - Create a new order (Buy Now)
router.post('/', async (req, res) => {
  try {
    const { productId, buyerId, buyerName, buyerEmail, deliveryAddress, paymentMethod } = req.body;

    let targetProduct;
    if (getIsConnected()) {
      targetProduct = await Product.findById(productId);
    } else {
      targetProduct = products.find(p => p._id === productId);
    }

    if (!targetProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const orderData = {
      productId: targetProduct._id || targetProduct.id,
      productTitle: targetProduct.title,
      productPrice: targetProduct.price,
      productImage: targetProduct.images[0] || '',
      buyerId: buyerId || 'user_demo_2',
      buyerName: buyerName || 'Sabbir Hossain',
      buyerEmail: buyerEmail || 'sabbir@example.com',
      sellerId: targetProduct.sellerId,
      sellerName: targetProduct.sellerName,
      deliveryAddress: deliveryAddress || 'Dhaka, Bangladesh',
      paymentMethod: paymentMethod || 'Cash on Delivery / Meetup',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      const createdOrder = await Order.create(orderData);
      await Product.findByIdAndUpdate(productId, { status: 'Sold' });
      return res.status(201).json(createdOrder);
    } else {
      const createdOrder = {
        _id: 'ord_' + Date.now(),
        ...orderData
      };
      orders.unshift(createdOrder);
      targetProduct.status = 'Sold';
      return res.status(201).json(createdOrder);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders - Get user orders (as buyer or seller)
router.get('/', async (req, res) => {
  try {
    const { userId, role } = req.query; // role: 'buyer' or 'seller'

    if (getIsConnected()) {
      let query = {};
      if (role === 'seller') {
        query.sellerId = userId;
      } else if (userId) {
        query.buyerId = userId;
      }
      const dbOrders = await Order.find(query).sort({ createdAt: -1 });
      return res.json(dbOrders);
    } else {
      let result = [...orders];
      if (role === 'seller' && userId) {
        result = result.filter(o => o.sellerId === userId);
      } else if (userId) {
        result = result.filter(o => o.buyerId === userId);
      }
      return res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
