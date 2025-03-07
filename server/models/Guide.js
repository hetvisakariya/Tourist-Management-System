const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    required: true
  },
  experience: {
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
  price: {
    type: Number,
    required: true
  },
  specialties: {
    type: [String],
    default: []
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
guideSchema.index({ name: 'text', location: 'text', specialties: 'text' });

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;