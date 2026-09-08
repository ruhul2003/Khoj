const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  location: { type: String, default: 'Dhaka, Bangladesh' },
  phone: { type: String, default: '+880 1700-000000' },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 12 },
  verifiedSeller: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
