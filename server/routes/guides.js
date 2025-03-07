const express = require('express');
const Guide = require('../models/Guide');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all guides with optional filtering
router.get('/', async (req, res) => {
  try {
    const { location, language, minPrice, maxPrice, search } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (language) {
      filter.languages = language;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    const guides = await Guide.find(filter);
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get guide by ID
router.get('/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new guide (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const guide = new Guide(req.body);
    await guide.save();
    
    res.status(201).json({
      message: 'Guide created successfully',
      guide
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update guide (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    res.json({
      message: 'Guide updated successfully',
      guide
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete guide (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    res.json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update guide availability
router.patch('/:id/availability', adminAuth, async (req, res) => {
  try {
    const { available } = req.body;
    
    if (available === undefined) {
      return res.status(400).json({ message: 'Available status is required' });
    }
    
    const guide = await Guide.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );
    
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    res.json({
      message: 'Guide availability updated successfully',
      guide
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;