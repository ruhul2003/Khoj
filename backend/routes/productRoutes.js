const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const { getIsConnected } = require('../config/db');
const { products, shops } = require('../store');

// GET /api/products - Filter, search, and sort products
router.get('/', async (req, res) => {
  try {
    const { search, category, condition, minPrice, maxPrice, sort, featured, sellerId, deal, location, verifiedOnly } = req.query;

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

      if (location && location !== 'All') {
        query.location = { $regex: location, $options: 'i' };
      }

      if (verifiedOnly === 'true') {
        query.sellerRating = { $gte: 4.8 };
      }

      if (sellerId) {
        query.sellerId = sellerId;
      }

      if (featured === 'true') {
        query.isFeatured = true;
      }

      if (deal === 'flash') {
        // Flash deals: items that are featured or offer a discount compared to originalPrice
        const dealCondition = [
          { isFeatured: true },
          { $expr: { $gt: ["$originalPrice", "$price"] } }
        ];
        if (query.$or) {
          query.$and = [
            { $or: query.$or },
            { $or: dealCondition }
          ];
          delete query.$or;
        } else {
          query.$or = dealCondition;
        }
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

      if (location && location !== 'All') {
        const loc = location.toLowerCase();
        result = result.filter(p => p.location && p.location.toLowerCase().includes(loc));
      }

      if (verifiedOnly === 'true') {
        result = result.filter(p => (p.sellerRating || 0) >= 4.8 || p.isVerified === true);
      }

      if (sellerId) {
        result = result.filter(p => p.sellerId === sellerId);
      }

      if (featured === 'true') {
        result = result.filter(p => p.isFeatured === true);
      }

      if (deal === 'flash') {
        result = result.filter(p => p.isFeatured === true || (p.originalPrice && p.originalPrice > p.price));
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
      } else if (sort === 'discount') {
        result.sort((a, b) => {
          const discA = a.originalPrice && a.originalPrice > a.price ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discB = b.originalPrice && b.originalPrice > b.price ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discB - discA;
        });
      } else {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return res.json(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/admin/stats - Admin overview analytics and distribution
router.get('/admin/stats', async (req, res) => {
  try {
    let allItems = [];
    if (getIsConnected()) {
      allItems = await Product.find({}).lean();
    } else {
      allItems = products;
    }

    const total = allItems.length;
    const available = allItems.filter(p => p.status === 'Available' || !p.status).length;
    const sold = allItems.filter(p => p.status === 'Sold').length;
    const pending = allItems.filter(p => p.status === 'Pending').length;
    const suspended = allItems.filter(p => p.status === 'Suspended').length;
    const featured = allItems.filter(p => p.isFeatured === true).length;

    const totalInventoryValue = allItems.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
    const avgPrice = total > 0 ? Math.round(totalInventoryValue / total) : 0;
    const totalViews = allItems.reduce((acc, p) => acc + (Number(p.views) || 0), 0);

    const categoryBreakdown = {};
    allItems.forEach(p => {
      const cat = p.category || 'Other';
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });

    const conditionBreakdown = {};
    allItems.forEach(p => {
      const cond = p.condition || 'Other';
      conditionBreakdown[cond] = (conditionBreakdown[cond] || 0) + 1;
    });

    const reportedCount = (global.listingReports || []).length;

    return res.json({
      total,
      available,
      sold,
      pending,
      suspended,
      featured,
      totalInventoryValue,
      avgPrice,
      totalViews,
      categoryBreakdown,
      conditionBreakdown,
      reportedCount
    });
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

    // Verify that the seller has registered a shop
    const ownerLookupId = sellerId || '';
    let sellerShop = null;
    if (getIsConnected()) {
      sellerShop = await Shop.findOne({ ownerId: ownerLookupId });
    } else {
      sellerShop = shops.find(s => s.ownerId === ownerLookupId);
    }

    if (!sellerShop) {
      return res.status(403).json({ 
        error: 'Only registered shop owners can post products for sale. Please register a shop first.' 
      });
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
      location: location || sellerShop.location || 'Dhaka, Bangladesh',
      sellerId: ownerLookupId,
      sellerName: sellerName || sellerShop.name || 'Shop Seller',
      sellerRating: sellerShop.rating || 5.0,
      sellerAvatar: sellerAvatar || sellerShop.logo || '',
      sellerPhone: sellerPhone || sellerShop.phone || '+880 1712-345678',
      shopId: sellerShop._id || sellerShop.id,
      shopName: sellerShop.name,
      shopSlug: sellerShop.slug,
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

// POST /api/products/admin/bulk-status - Bulk update status for multiple products
router.post('/admin/bulk-status', async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0 || !status) {
      return res.status(400).json({ error: 'Please provide ids array and status string' });
    }

    if (getIsConnected()) {
      const result = await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { status, updatedAt: new Date() } }
      );
      return res.json({ success: true, count: result.modifiedCount, status });
    } else {
      let count = 0;
      products.forEach(p => {
        if (ids.includes(p._id) || ids.includes(p.id)) {
          p.status = status;
          p.updatedAt = new Date().toISOString();
          count++;
        }
      });
      return res.json({ success: true, count, status });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/admin/bulk-feature - Bulk feature or unfeature products
router.post('/admin/bulk-feature', async (req, res) => {
  try {
    const { ids, isFeatured } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Please provide ids array' });
    }

    const featureVal = Boolean(isFeatured);

    if (getIsConnected()) {
      const result = await Product.updateMany(
        { _id: { $in: ids } },
        { $set: { isFeatured: featureVal, updatedAt: new Date() } }
      );
      return res.json({ success: true, count: result.modifiedCount, isFeatured: featureVal });
    } else {
      let count = 0;
      products.forEach(p => {
        if (ids.includes(p._id) || ids.includes(p.id)) {
          p.isFeatured = featureVal;
          p.updatedAt = new Date().toISOString();
          count++;
        }
      });
      return res.json({ success: true, count, isFeatured: featureVal });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id/featured - Quick toggle single product featured status
router.put('/:id/featured', async (req, res) => {
  try {
    const { id } = req.params;
    const { isFeatured } = req.body;

    if (getIsConnected()) {
      const target = await Product.findById(id);
      if (!target) return res.status(404).json({ error: 'Product not found' });
      target.isFeatured = isFeatured !== undefined ? Boolean(isFeatured) : !target.isFeatured;
      target.updatedAt = new Date();
      await target.save();
      return res.json(target);
    } else {
      const item = products.find(p => p._id === id || p.id === id);
      if (!item) return res.status(404).json({ error: 'Product not found' });
      item.isFeatured = isFeatured !== undefined ? Boolean(isFeatured) : !item.isFeatured;
      item.updatedAt = new Date().toISOString();
      return res.json(item);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/admin/bulk-discount - Apply percentage discount in bulk
router.post('/admin/bulk-discount', async (req, res) => {
  try {
    const { ids, discountPercent } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0 || !discountPercent) {
      return res.status(400).json({ error: 'Please provide ids and discountPercent' });
    }

    const pct = Math.min(Math.max(Number(discountPercent), 1), 90);
    const multiplier = (100 - pct) / 100;

    if (getIsConnected()) {
      const items = await Product.find({ _id: { $in: ids } });
      let updatedCount = 0;
      for (const item of items) {
        if (!item.originalPrice || item.originalPrice === 0) {
          item.originalPrice = item.price;
        }
        item.price = Math.round(item.price * multiplier);
        item.updatedAt = new Date();
        await item.save();
        updatedCount++;
      }
      return res.json({ success: true, count: updatedCount, discountPercent: pct });
    } else {
      let count = 0;
      products.forEach(p => {
        if (ids.includes(p._id) || ids.includes(p.id)) {
          if (!p.originalPrice || p.originalPrice === 0) {
            p.originalPrice = p.price;
          }
          p.price = Math.round(p.price * multiplier);
          p.updatedAt = new Date().toISOString();
          count++;
        }
      });
      return res.json({ success: true, count, discountPercent: pct });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/admin/bulk-delete - Delete multiple listings
router.post('/admin/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Please provide ids array' });
    }

    if (getIsConnected()) {
      const result = await Product.deleteMany({ _id: { $in: ids } });
      return res.json({ success: true, count: result.deletedCount });
    } else {
      let initialLen = products.length;
      for (let i = products.length - 1; i >= 0; i--) {
        if (ids.includes(products[i]._id) || ids.includes(products[i].id)) {
          products.splice(i, 1);
        }
      }
      const deletedCount = initialLen - products.length;
      return res.json({ success: true, count: deletedCount });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id - Update all data of a product (Admin / Owner)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date().toISOString() };

    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.originalPrice !== undefined) updateData.originalPrice = Number(updateData.originalPrice);
    if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);
    if (updateData.views !== undefined) updateData.views = Number(updateData.views);
    if (updateData.sellerRating !== undefined) updateData.sellerRating = Number(updateData.sellerRating);

    if (getIsConnected()) {
      const updated = await Product.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: false });
      if (!updated) return res.status(404).json({ error: 'Product not found' });
      return res.json(updated);
    } else {
      const itemIndex = products.findIndex(p => p._id === id || p.id === id);
      if (itemIndex === -1) return res.status(404).json({ error: 'Product not found' });
      products[itemIndex] = {
        ...products[itemIndex],
        ...updateData
      };
      return res.json(products[itemIndex]);
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

// POST /api/products/:id/report - Report suspicious listing
router.post('/:id/report', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, details, reporterContact } = req.body;

    if (!reason) {
      return res.status(400).json({ error: 'Reason for reporting is required' });
    }

    const reportRecord = {
      _id: 'rep_' + Date.now(),
      productId: id,
      reason,
      details: details || '',
      reporterContact: reporterContact || 'Anonymous',
      createdAt: new Date().toISOString(),
      status: 'Under Review'
    };

    if (!global.listingReports) {
      global.listingReports = [];
    }
    global.listingReports.push(reportRecord);

    return res.status(201).json({
      success: true,
      message: 'Report submitted successfully. Our Trust & Safety team will review this listing.',
      reportId: reportRecord._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/admin/reports - Get all reports with product info
router.get('/admin/reports', async (req, res) => {
  try {
    if (!global.listingReports) {
      global.listingReports = [];
    }
    const reports = [...global.listingReports];
    
    const enriched = await Promise.all(reports.map(async (r) => {
      let product = null;
      if (getIsConnected()) {
        product = await Product.findById(r.productId).select('title images price status sellerName');
      } else {
        product = products.find(p => p._id === r.productId || p.id === r.productId);
      }
      return {
        ...r,
        productTitle: product ? product.title : 'Deleted Listing',
        productImage: product && product.images && product.images.length ? product.images[0] : null,
        productStatus: product ? product.status : 'Unknown',
        productPrice: product ? product.price : 0,
        sellerName: product ? product.sellerName : 'Unknown'
      };
    }));

    return res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/admin/reports/:reportId/status - Resolve or dismiss report
router.put('/admin/reports/:reportId/status', async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, action } = req.body;

    if (!global.listingReports) global.listingReports = [];
    const report = global.listingReports.find(r => r._id === reportId);
    if (!report) return res.status(404).json({ error: 'Report not found' });

    report.status = status || 'Resolved';
    report.resolvedAt = new Date().toISOString();

    if (action === 'suspend' && report.productId) {
      if (getIsConnected()) {
        await Product.findByIdAndUpdate(report.productId, { status: 'Suspended' });
      } else {
        const p = products.find(prod => prod._id === report.productId || prod.id === report.productId);
        if (p) p.status = 'Suspended';
      }
      report.actionTaken = 'Product Suspended';
    }

    return res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id/qa - Retrieve public community Q&A for product
router.get('/:id/qa', (req, res) => {
  try {
    const { id } = req.params;
    if (!global.productQuestions) {
      global.productQuestions = [];
    }
    const itemQuestions = global.productQuestions.filter(q => q.productId === id);
    return res.json(itemQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/:id/qa - Submit a buyer question
router.post('/:id/qa', (req, res) => {
  try {
    const { id } = req.params;
    const { author, question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question text is required.' });
    }

    if (!global.productQuestions) {
      global.productQuestions = [];
    }

    const newQ = {
      _id: 'qa_' + Date.now(),
      productId: id,
      author: author || 'Interested Buyer',
      question: question.trim(),
      answer: null,
      createdAt: new Date().toISOString()
    };

    global.productQuestions.unshift(newQ);
    return res.status(201).json(newQ);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id/qa/:questionId/answer - Answer a question (seller)
router.put('/:id/qa/:questionId/answer', (req, res) => {
  try {
    const { questionId } = req.params;
    const { answerText, sellerName } = req.body;

    if (!answerText || !answerText.trim()) {
      return res.status(400).json({ error: 'Answer text is required.' });
    }

    if (!global.productQuestions) {
      global.productQuestions = [];
    }

    const target = global.productQuestions.find(q => q._id === questionId);
    if (!target) {
      return res.status(404).json({ error: 'Question not found.' });
    }

    target.answer = {
      text: answerText.trim(),
      author: sellerName || 'Seller',
      isSeller: true,
      answeredAt: new Date().toISOString()
    };

    return res.json(target);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
