const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// GET /api/products — list with optional search & category filter
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    const query = { active: true };

    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { name:     { $regex: search, $options: 'i' } },
        { desc:     { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    let sortObj = {};
    if (sort === 'price-asc')  sortObj = { price:  1 };
    if (sort === 'price-desc') sortObj = { price: -1 };
    if (sort === 'rating')     sortObj = { rating: -1 };

    const products = await Product.find(query).sort(sortObj);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products — create (admin use)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
