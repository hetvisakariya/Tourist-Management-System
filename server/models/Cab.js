const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['economy', 'standard', 'luxury', 'suv'],
    required: true
  },
  image: {
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
  features: {
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

const Cab = mongoose.model('Cab', cabSchema);

module.exports = Cab;