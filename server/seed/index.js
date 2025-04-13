const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env file from the root folder
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ✅ Use the correct variable name
const mongoURI = process.env.MONGODB_URI;

const seedData = require('./seedData'); // assuming this exports a function

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await seedData(); // Your actual seeding function

    console.log('✅ Seeding completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
