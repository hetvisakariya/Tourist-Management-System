const express = require('express');
const Hotel = require('../models/Hotel');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all hotels with optional filtering
router.get('/', async (req, res) => {
  try {
    const { location, minPrice, maxPrice, amenities, search } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (amenities) {
      const amenitiesList = amenities.split(',');
      filter.amenities = { $all: amenitiesList };
    }
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new hotel (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    
    res.status(201).json({
      message: 'Hotel created successfully',
      hotel
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update hotel (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    res.json({
      message: 'Hotel updated successfully',
      hotel
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete hotel (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a room to a hotel (admin only)
router.post('/:id/rooms', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    hotel.rooms.push(req.body);
    await hotel.save();
    
    res.status(201).json({
      message: 'Room added successfully',
      room: hotel.rooms[hotel.rooms.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a room in a hotel (admin only)
router.put('/:hotelId/rooms/:roomId', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    const roomIndex = hotel.rooms.findIndex(room => room._id.toString() === req.params.roomId);
    
    if (roomIndex === -1) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    hotel.rooms[roomIndex] = { ...hotel.rooms[roomIndex].toObject(), ...req.body };
    await hotel.save();
    
    res.json({
      message: 'Room updated successfully',
      room: hotel.rooms[roomIndex]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a room from a hotel (admin only)
router.delete('/:hotelId/rooms/:roomId', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    const roomIndex = hotel.rooms.findIndex(room => room._id.toString() === req.params.roomId);
    
    if (roomIndex === -1) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    hotel.rooms.splice(roomIndex, 1);
    await hotel.save();
    
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;