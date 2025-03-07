const express = require('express');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const Cab = require('../models/Cab');
const Guide = require('../models/Guide');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all bookings for the current user
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all bookings (admin only)
router.get('/all', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the current user or if the user is an admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new hotel booking
router.post('/hotel', auth, async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests, rooms, totalAmount, paymentMethod } = req.body;
    
    // Validate hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    // Create booking
    const booking = new Booking({
      user: req.user._id,
      bookingType: 'hotel',
      item: hotelId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      rooms,
      totalAmount,
      paymentMethod
    });
    
    await booking.save();
    
    res.status(201).json({
      message: 'Hotel booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new cab booking
router.post('/cab', auth, async (req, res) => {
  try {
    const { cabId, date, time, totalAmount, paymentMethod } = req.body;
    
    // Validate cab exists
    const cab = await Cab.findById(cabId);
    if (!cab) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    
    // Create booking
    const booking = new Booking({
      user: req.user._id,
      bookingType: 'cab',
      item: cabId,
      date: new Date(date),
      time,
      totalAmount,
      paymentMethod
    });
    
    await booking.save();
    
    res.status(201).json({
      message: 'Cab booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new guide booking
router.post('/guide', auth, async (req, res) => {
  try {
    const { guideId, date, totalAmount, paymentMethod } = req.body;
    
    // Validate guide exists
    const guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    // Create booking
    const booking = new Booking({
      user: req.user._id,
      bookingType: 'guide',
      item: guideId,
      date: new Date(date),
      totalAmount,
      paymentMethod
    });
    
    await booking.save();
    
    res.status(201).json({
      message: 'Guide booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel a booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the current user or if the user is an admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update payment status (admin only)
router.patch('/:id/payment', adminAuth, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    if (!['pending', 'completed', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({
      message: 'Payment status updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;