const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// POST /api/orders — create new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, total, stripePaymentId } = req.body;

    if (!customer || !items || !total) {
      return res.status(400).json({ error: 'customer, items, and total are required' });
    }

    const order = await Order.create({
      customer,
      items,
      total,
      status: 'confirmed',
      stripePaymentId: stripePaymentId || null,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/orders/:email — fetch orders for a customer email
router.get('/:email', async (req, res) => {
  try {
    const orders = await Order
      .find({ 'customer.email': req.params.email })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders — all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
