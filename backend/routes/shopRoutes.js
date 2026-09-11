const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { shops, products } = require('../store');

const JWT_SECRET = process.env.JWT_SECRET || 'khoj_super_secret_jwt_key_2026_marketplace';

// Helper to extract user from token if available
const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// GET /api/shops - List featured & active shops
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    if (getIsConnected()) {
      let filter = {};
      if (category && category !== 'All') {
        filter.category = category;
      }
      if (search) {
        filter.name = { $regex: search, $options: 'i' };
      }
      const allShops = await Shop.find(filter).sort({ createdAt: -1 }).limit(30);
      return res.json(allShops);
    } else {
      let filtered = [...shops];
      if (category && category !== 'All') {
        filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        filtered = filtered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
      }
      return res.json(filtered);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/shops/me - Get current user's shop
router.get('/me', async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    const ownerId = req.query.ownerId || (decoded ? decoded.id : null);
    if (!ownerId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (getIsConnected()) {
      const shop = await Shop.findOne({ ownerId });
      return res.json({ shop: shop || null });
    } else {
      const shop = shops.find(s => s.ownerId === ownerId);
      return res.json({ shop: shop || null });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/shops/:slugOrId - Get shop by slug or ID along with products
router.get('/:slugOrId', async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let shop = null;

    if (getIsConnected()) {
      shop = await Shop.findOne({ $or: [{ slug: slugOrId.toLowerCase() }, { _id: slugOrId.match(/^[0-9a-fA-F]{24}$/) ? slugOrId : null }] });
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      const shopProducts = await Product.find({ sellerId: shop.ownerId }).sort({ createdAt: -1 });
      return res.json({ shop, products: shopProducts });
    } else {
      shop = shops.find(s => s.slug === slugOrId.toLowerCase() || s._id === slugOrId);
      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      const shopProducts = products.filter(p => p.sellerId === shop.ownerId);
      return res.json({ shop, products: shopProducts });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/shops - Create or register a shop
router.post('/', async (req, res) => {
  try {
    const decoded = getUserFromToken(req);
    const {
      name,
      slug,
      description,
      category,
      logo,
      banner,
      location,
      phone,
      email,
      website,
      ownerId: bodyOwnerId,
      ownerName: bodyOwnerName,
      ownerEmail: bodyOwnerEmail
    } = req.body;

    const ownerId = (decoded && decoded.id) || bodyOwnerId;
    const ownerName = (decoded && decoded.name) || bodyOwnerName || 'Verified Seller';
    const ownerEmail = (decoded && decoded.email) || bodyOwnerEmail || '';

    if (!ownerId) {
      return res.status(401).json({ error: 'User must be authenticated to create a shop.' });
    }
    if (!name) {
      return res.status(400).json({ error: 'Shop name is required.' });
    }

    // Generate safe unique slug
    const cleanSlug = (slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `shop-${Date.now()}`;

    if (getIsConnected()) {
      // Check if user already owns a shop
      let existingShop = await Shop.findOne({ ownerId });
      if (existingShop) {
        return res.json({
          message: 'You already have an existing shop',
          shop: existingShop
        });
      }

      // Check slug uniqueness
      let finalSlug = cleanSlug;
      const slugConflict = await Shop.findOne({ slug: finalSlug });
      if (slugConflict) {
        finalSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
      }

      const newShop = await Shop.create({
        name,
        slug: finalSlug,
        ownerId,
        ownerName,
        ownerEmail,
        description: description || 'Welcome to our official marketplace shop.',
        category: category || 'Electronics',
        logo: logo || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=300&q=80',
        banner: banner || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        location: location || 'Dhaka, Bangladesh',
        phone: phone || '+880 1700-000000',
        email: email || ownerEmail,
        website: website || '',
        rating: 5.0,
        reviewsCount: 0,
        isVerified: true
      });

      // Update user record if in DB
      try {
        await User.findByIdAndUpdate(ownerId, { hasShop: true, shopId: newShop._id });
      } catch (e) {
        console.warn('User shop update flag note:', e.message);
      }

      return res.status(201).json({
        message: 'Shop created successfully',
        shop: newShop
      });
    } else {
      // Memory store fallback
      let existingShop = shops.find(s => s.ownerId === ownerId);
      if (existingShop) {
        return res.json({
          message: 'You already have an existing shop',
          shop: existingShop
        });
      }

      let finalSlug = cleanSlug;
      if (shops.some(s => s.slug === finalSlug)) {
        finalSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
      }

      const newShop = {
        _id: 'shop_' + Date.now(),
        name,
        slug: finalSlug,
        ownerId,
        ownerName,
        ownerEmail,
        description: description || 'Welcome to our official marketplace shop.',
        category: category || 'Electronics',
        logo: logo || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=300&q=80',
        banner: banner || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
        location: location || 'Dhaka, Bangladesh',
        phone: phone || '+880 1700-000000',
        email: email || ownerEmail,
        website: website || '',
        rating: 5.0,
        reviewsCount: 0,
        isVerified: true,
        createdAt: new Date()
      };

      shops.push(newShop);
      return res.status(201).json({
        message: 'Shop created successfully',
        shop: newShop
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/shops/:id - Update shop
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const decoded = getUserFromToken(req);

    if (getIsConnected()) {
      const shop = await Shop.findById(id);
      if (!shop) return res.status(404).json({ error: 'Shop not found' });
      if (decoded && shop.ownerId !== decoded.id) {
        return res.status(403).json({ error: 'Unauthorized to edit this shop' });
      }

      Object.assign(shop, req.body);
      await shop.save();
      return res.json({ message: 'Shop updated successfully', shop });
    } else {
      const index = shops.findIndex(s => s._id === id);
      if (index === -1) return res.status(404).json({ error: 'Shop not found' });
      shops[index] = { ...shops[index], ...req.body };
      return res.json({ message: 'Shop updated successfully', shop: shops[index] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
