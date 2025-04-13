const Guide = require('../models/Guide'); // or other models
// Add more model imports if needed

const seedData = async () => {
  try {
    // Example: Clear and insert data into the `hotels` collection
    await Guide.deleteMany();

    const guide = [
        {
          name: "Rajesh Kumar",
          location: "Agra, India",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          languages: ["Hindi", "English"],
          experience: 7,
          rating: 4.8,
          reviews: 132,
          price: 30,
          specialties: ["Taj Mahal Tours", "Cultural Tours"],
          available: true
        },
        {
          name: "Elena Garcia",
          location: "Barcelona, Spain",
          image: "https://randomuser.me/api/portraits/women/32.jpg",
          languages: ["Spanish", "English", "French"],
          experience: 5,
          rating: 4.6,
          reviews: 98,
          price: 45,
          specialties: ["Architectural Tours", "Food Walks"],
          available: true
        },
        {
          name: "Kenji Tanaka",
          location: "Kyoto, Japan",
          image: "https://randomuser.me/api/portraits/men/12.jpg",
          languages: ["Japanese", "English"],
          experience: 10,
          rating: 4.9,
          reviews: 210,
          price: 50,
          specialties: ["Temple Tours", "Cultural Experiences"],
          available: false
        },
        {
          name: "Lara Müller",
          location: "Berlin, Germany",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          languages: ["German", "English", "Italian"],
          experience: 4,
          rating: 4.5,
          reviews: 77,
          price: 35,
          specialties: ["Historical Tours", "WWII Tours"],
          available: true
        },
        {
          name: "Ahmed Hassan",
          location: "Cairo, Egypt",
          image: "https://randomuser.me/api/portraits/men/23.jpg",
          languages: ["Arabic", "English"],
          experience: 9,
          rating: 4.7,
          reviews: 185,
          price: 40,
          specialties: ["Pyramids of Giza", "Nile Cruises"],
          available: true
        },
        {
          name: "Sophia Rossi",
          location: "Rome, Italy",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
          languages: ["Italian", "English", "Spanish"],
          experience: 6,
          rating: 4.8,
          reviews: 110,
          price: 38,
          specialties: ["Colosseum Tours", "Vatican Tours"],
          available: true
        },
        {
          name: "David Smith",
          location: "London, UK",
          image: "https://randomuser.me/api/portraits/men/53.jpg",
          languages: ["English", "French"],
          experience: 8,
          rating: 4.6,
          reviews: 123,
          price: 42,
          specialties: ["Royal Attractions", "Museum Tours"],
          available: false
        },
        {
          name: "Aylin Yıldız",
          location: "Istanbul, Turkey",
          image: "https://randomuser.me/api/portraits/women/58.jpg",
          languages: ["Turkish", "English", "German"],
          experience: 5,
          rating: 4.7,
          reviews: 101,
          price: 36,
          specialties: ["Mosque Tours", "Bosphorus Cruise"],
          available: true
        }
      ];

    await Guide.insertMany(guide);
    console.log('✅ Guide seeded');
  } catch (error) {
    console.error('❌ Error seeding Guide:', error);
    throw error;
  }
};

module.exports = seedData;
