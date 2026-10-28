const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Electronics', 'Mobile Phones', 'Vehicles', 'Furniture', 'Fashion', 'Gaming', 'Books & Hobbies', 'Home Appliances']
  },
  condition: { 
    type: String, 
    required: true,
    enum: ['Brand New', 'Used - Like New', 'Used - Good', 'Used - Fair']
  },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  description: { type: String, required: true },
  images: [{ type: String }],
  location: { type: String, required: true, default: 'Dhaka' },
  sellerId: { type: String, required: true },
  sellerName: { type: String, default: 'Seller' },
  sellerRating: { type: Number, default: 4.9 },
  sellerAvatar: { type: String, default: '' },
  sellerPhone: { type: String, default: '+880 1712-345678' },
  status: { type: String, enum: ['Available', 'Pending', 'Sold', 'Suspended'], default: 'Available' },
  isFeatured: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  stock: { type: Number, default: 1 },
  sku: { type: String, default: '' },
  tags: [{ type: String }],
  adminNotes: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');
