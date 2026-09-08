const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { getIsConnected } = require('../config/db');
const { messages } = require('../store');

// GET /api/messages - Fetch messages for a product or conversation
router.get('/', async (req, res) => {
  try {
    const { productId, userId } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (productId) query.productId = productId;
      if (userId) {
        query.$or = [{ senderId: userId }, { receiverId: userId }];
      }
      const dbMessages = await Message.find(query).sort({ createdAt: 1 });
      return res.json(dbMessages);
    } else {
      let result = [...messages];
      if (productId) {
        result = result.filter(m => m.productId === productId);
      }
      if (userId) {
        result = result.filter(m => m.senderId === userId || m.receiverId === userId);
      }
      return res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/messages - Send a message
router.post('/', async (req, res) => {
  try {
    const { productId, productTitle, senderId, senderName, receiverId, text } = req.body;

    if (!productId || !text) {
      return res.status(400).json({ error: 'Product ID and text are required.' });
    }

    const msgData = {
      productId,
      productTitle: productTitle || 'Item Inquiry',
      senderId: senderId || 'user_demo_2',
      senderName: senderName || 'Sabbir Hossain',
      receiverId: receiverId || 'user_demo_1',
      text,
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      const createdMsg = await Message.create(msgData);
      return res.status(201).json(createdMsg);
    } else {
      const createdMsg = {
        _id: 'msg_' + Date.now(),
        ...msgData
      };
      messages.push(createdMsg);
      return res.status(201).json(createdMsg);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
