const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingType: {
    type: String,
    enum: ['hotel', 'cab', 'guide'],
    required: true
  },
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'bookingType',
    required: true
  },
  checkIn: {
    type: Date
  },
  checkOut: {
    type: Date
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  guests: {
    type: Number
  },
  rooms: {
    type: Number
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate a unique booking ID before saving
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    const prefix = this.bookingType.charAt(0).toUpperCase() + 'B';
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.bookingId = prefix + randomNum;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;