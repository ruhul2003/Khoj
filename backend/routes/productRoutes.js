const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { products } = require('../store');

// GET /api/products - Filter, search, and sort products
router.get('/', async (req, res) => {
  try {
    const { search, category, condition, minPrice, maxPrice, sort, featured, sellerId } = req.query;

    if (getIsConnected()) {
      let query = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } }
        ];
      }

      if (category && category !== 'All') {
        query.category = category;
      }

      if (condition && condition !== 'All') {
        query.condition = condition;
      }

      if (sellerId) {
        query.sellerId = sellerId;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'price_asc' || sort === 'price-asc') sortOption = { price: 1 };
      if (sort === 'price_desc' || sort === 'price-desc') sortOption = { price: -1 };
      if (sort === 'views' || sort === 'popular') sortOption = { views: -1 };

      const dbProducts = await Product.find(query).sort(sortOption);
      return res.json(dbProducts);
    } else {
      // Memory Store Filter
      let result = [...products];

      if (search) {
        const q = search.toLowerCase();
        result = result.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) || 
          p.location.toLowerCase().includes(q)
        );
      }

      if (category && category !== 'All') {
        result = result.filter(p => p.category === category);
      }

      if (condition && condition !== 'All') {
        result = result.filter(p => p.condition === condition);
      }

      if (sellerId) {
        result = result.filter(p => p.sellerId === sellerId);
      }

      if (featured === 'true') {
        result = result.filter(p => p.isFeatured === true);
      }

      if (minPrice) {
        result = result.filter(p => p.price >= Number(minPrice));
      }
      if (maxPrice) {
        result = result.filter(p => p.price <= Number(maxPrice));
      }

      if (sort === 'price_asc' || sort === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_desc' || sort === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === 'views' || sort === 'popular') {
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
      } else {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id - Single product details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const item = await Product.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
      if (!item) return res.status(404).json({ error: 'Product not found' });
      return res.json(item);
    } else {
      const item = products.find(p => p._id === id || p.id === id);
      if (!item) return res.status(404).json({ error: 'Product not found' });
      item.views = (item.views || 0) + 1;
      return res.json(item);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products - Create new ad / listing
router.post('/', async (req, res) => {
  try {
    const { title, category, condition, price, originalPrice, description, images, location, sellerId, sellerName, sellerAvatar, sellerPhone } = req.body;

    if (!title || !category || !condition || !price || !description) {
      return res.status(400).json({ error: 'Please provide all required product details.' });
    }

    const defaultImages = images && images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ];

    const newProductData = {
      title,
      category,
      condition,
      price: Number(price),
      originalPrice: Number(originalPrice || 0),
      description,
      images: defaultImages,
      location: location || 'Dhaka, Bangladesh',
      sellerId: sellerId || 'user_demo_1',
      sellerName: sellerName || 'Tanvir Rahman',
      sellerRating: 4.9,
      sellerAvatar: sellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      sellerPhone: sellerPhone || '+880 1712-345678',
      status: 'Available',
      isFeatured: false,
      views: 1,
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      const created = await Product.create(newProductData);
      return res.status(201).json(created);
    } else {
      const created = {
        _id: 'prod_' + Date.now(),
        ...newProductData
      };
      products.unshift(created);
      return res.status(201).json(created);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id/status - Mark item as Sold/Available
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Available', 'Sold'

    if (getIsConnected()) {
      const updated = await Product.findByIdAndUpdate(id, { status }, { new: true });
      return res.json(updated);
    } else {
      const item = products.find(p => p._id === id);
      if (!item) return res.status(404).json({ error: 'Product not found' });
      item.status = status;
      return res.json(item);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id - Delete product listing
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      await Product.findByIdAndDelete(id);
      return res.json({ message: 'Listing deleted successfully.' });
    } else {
      const index = products.findIndex(p => p._id === id);
      if (index !== -1) {
        products.splice(index, 1);
      }
      return res.json({ message: 'Listing deleted successfully.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
