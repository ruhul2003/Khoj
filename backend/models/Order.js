const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, default: '' },
  buyerId: { type: String, required: true },
  buyerName: { type: String, default: 'Buyer' },
  buyerEmail: { type: String, default: '' },
  sellerId: { type: String, required: true },
  sellerName: { type: String, default: 'Seller' },
  deliveryAddress: { type: String, default: 'Dhaka, Bangladesh' },
  paymentMethod: { type: String, default: 'Cash on Delivery / Meetup' },
  status: { type: String, enum: ['Processing', 'Confirmed', 'Completed', 'Cancelled'], default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
