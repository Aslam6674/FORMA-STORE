const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  qty:       { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  customer: {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    address: { type: String, required: true },
    city:    { type: String, required: true },
  },
  items:           { type: [orderItemSchema], required: true },
  total:           { type: Number, required: true },
  status:          { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  stripePaymentId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
