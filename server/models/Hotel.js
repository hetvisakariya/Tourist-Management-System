const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  }
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  amenities: {
    type: [String],
    default: []
  },
  rooms: {
    type: [roomSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
hotelSchema.index({ name: 'text', location: 'text', description: 'text' });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;