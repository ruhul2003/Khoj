const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, default: 'Shop Owner' },
  ownerEmail: { type: String, default: '' },
  description: { type: String, default: 'Welcome to our official marketplace shop.' },
  category: { 
    type: String, 
    default: 'Electronics',
    enum: ['Electronics', 'Mobile Phones', 'Vehicles', 'Furniture', 'Fashion', 'Gaming', 'Books & Hobbies', 'Home Appliances', 'General']
  },
  logo: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=300&q=80' 
  },
  banner: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80' 
  },
  location: { type: String, default: 'Dhaka, Bangladesh' },
  phone: { type: String, default: '+880 1700-000000' },
  email: { type: String, default: '' },
  website: { type: String, default: '' },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Shop || mongoose.model('Shop', shopSchema, 'shops');
