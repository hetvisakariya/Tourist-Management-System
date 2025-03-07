const express = require('express');
const Cab = require('../models/Cab');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all cabs with optional filtering
router.get('/', async (req, res) => {
  try {
    const { type, minPrice, maxPrice, capacity } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (capacity) {
      filter.capacity = { $gte: Number(capacity) };
    }
    
    const cabs = await Cab.find(filter);
    res.json(cabs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get cab by ID
router.get('/:id', async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
    
    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    
    res.json(cab);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new cab (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const cab = new Cab(req.body);
    await cab.save();
    
    res.status(201).json({
      message: 'Cab created successfully',
      cab
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cab (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const cab = await Cab.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    
    res.json({
      message: 'Cab updated successfully',
      cab
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete cab (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const cab = await Cab.findByIdAndDelete(req.params.id);
    
    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    
    res.json({ message: 'Cab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cab availability
router.patch('/:id/availability', adminAuth, async (req, res) => {
  try {
    const { available } = req.body;
    
    if (available === undefined) {
      return res.status(400).json({ message: 'Available status is required' });
    }
    
    const cab = await Cab.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );
    
    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    
    res.json({
      message: 'Cab availability updated successfully',
      cab
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;