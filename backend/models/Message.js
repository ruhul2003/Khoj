const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productTitle: { type: String, default: '' },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
