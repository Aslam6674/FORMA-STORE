const mongoose = require('mongoose');
const crypto   = require('crypto');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },   // store hashed only
  role:     { type: String, enum: ['customer', 'admin'], default: 'customer' },
  address:  { type: String, default: '' },
  city:     { type: String, default: '' },
}, { timestamps: true });

// Simple hash helper (use bcrypt in production)
userSchema.methods.setPassword = function(raw) {
  this.password = crypto.createHash('sha256').update(raw).digest('hex');
};
userSchema.methods.validatePassword = function(raw) {
  return this.password === crypto.createHash('sha256').update(raw).digest('hex');
};

module.exports = mongoose.model('User', userSchema);
