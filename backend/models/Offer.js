const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, default: '' },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  sellerId: { type: String, required: true },
  offeredPrice: { type: Number, required: true },
  message: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Countered'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Offer || mongoose.model('Offer', offerSchema);
