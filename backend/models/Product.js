const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  category: { type: String, required: true },
  price:    { type: Number, required: true, min: 0 },
  desc:     { type: String, required: true },
  img:      { type: String, default: '📦' },
  color:    { type: String, default: '#888888' },
  badge:    { type: String, default: null },
  rating:   { type: Number, default: 4.5, min: 0, max: 5 },
  reviews:  { type: Number, default: 0 },
  stock:    { type: Number, default: 100 },
  active:   { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
