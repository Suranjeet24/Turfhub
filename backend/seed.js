require('dotenv').config();
const mongoose = require('mongoose');
const Turf = require('./models/Turf');
const User = require('./models/User');
const connectDB = require('./config/database');

const turfsData = [
    {
        name: "GreenField Arena",
        location: "Indiranagar, Bangalore",
        city: "Bangalore",
        pricePerHour: 800,
        sports: ["Cricket", "Football"],
        description: "Premier turf facility with state-of-the-art synthetic grass and floodlights. Perfect for cricket and football matches. Well-maintained grounds with professional equipment available.",
        image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
            "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80"
        ],
        amenities: ["Floodlights", "Changing Rooms", "Parking", "Water Facility", "First Aid", "Seating Area"]
    },
    {
        name: "Champion Sports Complex",
        location: "Koramangala, Bangalore",
        city: "Bangalore",
        pricePerHour: 1200,
        sports: ["Football", "Cricket", "Tennis"],
        description: "Multi-sport facility featuring premium artificial turf, professional lighting, and modern amenities. Ideal for serious players and tournaments.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
            "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
            "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80"
        ],
        amenities: ["Premium Turf", "Changing Rooms", "Parking", "Cafeteria", "Equipment Rental", "Coaching Available"]
    },
    {
        name: "Ace Badminton Academy",
        location: "Whitefield, Bangalore",
        city: "Bangalore",
        pricePerHour: 500,
        sports: ["Badminton"],
        description: "Specialized indoor badminton facility with wooden court flooring and proper ventilation. Multiple courts available for practice and matches.",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
            "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80"
        ],
        amenities: ["AC Courts", "Changing Rooms", "Parking", "Equipment Rental", "Seating Gallery", "Water Cooler"]
    },
    {
        name: "SportZone 360",
        location: "HSR Layout, Bangalore",
        city: "Bangalore",
        pricePerHour: 1000,
        sports: ["Cricket", "Football", "Tennis"],
        description: "All-in-one sports destination with top-quality facilities for multiple sports. Professional-grade equipment and excellent maintenance.",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
            "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80"
        ],
        amenities: ["Floodlights", "Changing Rooms", "Parking", "Cafeteria", "Sports Shop", "Shower Facilities"]
    },
    {
        name: "Victory Cricket Ground",
        location: "Electronic City, Bangalore",
        city: "Bangalore",
        pricePerHour: 600,
        sports: ["Cricket"],
        description: "Dedicated cricket ground with excellent pitch conditions and boundary markers. Perfect for serious cricket practice and matches.",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80"
        ],
        amenities: ["Net Practice", "Changing Rooms", "Parking", "Scoreboard", "Seating Area", "Equipment Storage"]
    },
    {
        name: "Thunder Football Turf",
        location: "Marathahalli, Bangalore",
        city: "Bangalore",
        pricePerHour: 900,
        sports: ["Football"],
        description: "FIFA-standard artificial turf for football enthusiasts. Excellent drainage system and professional goal posts.",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80"
        ],
        amenities: ["FIFA Turf", "Changing Rooms", "Parking", "Floodlights", "Referee Service", "First Aid"]
    },
    {
        name: "Elite Tennis Courts",
        location: "Jayanagar, Bangalore",
        city: "Bangalore",
        pricePerHour: 700,
        sports: ["Tennis"],
        description: "Professional tennis courts with synthetic hard court surface. Perfect for singles and doubles matches.",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
            "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80"
        ],
        amenities: ["Hard Courts", "Changing Rooms", "Parking", "Equipment Rental", "Coaching", "Seating Area"]
    },
    {
        name: "Power Play Arena",
        location: "Bellandur, Bangalore",
        city: "Bangalore",
        pricePerHour: 1100,
        sports: ["Cricket", "Football", "Badminton"],
        description: "Premium multi-sport complex with separate facilities for each sport. Modern infrastructure and excellent service.",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
            "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80"
        ],
        amenities: ["Multi-sport", "Changing Rooms", "Parking", "Cafeteria", "Equipment Rental", "Event Hosting"]
    },
    {
        name: "Smash Badminton Club",
        location: "Rajajinagar, Bangalore",
        city: "Bangalore",
        pricePerHour: 450,
        sports: ["Badminton"],
        description: "Budget-friendly badminton facility with well-maintained courts. Great for casual players and regular practice.",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80"
        ],
        amenities: ["Indoor Courts", "Changing Rooms", "Parking", "Equipment Rental", "Water Facility", "Locker Room"]
    },
    {
        name: "Goal Masters Turf",
        location: "Yeshwanthpur, Bangalore",
        city: "Bangalore",
        pricePerHour: 850,
        sports: ["Football", "Cricket"],
        description: "Well-equipped turf with excellent playing surface. Suitable for both football and cricket enthusiasts.",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80"
        ],
        amenities: ["Floodlights", "Changing Rooms", "Parking", "Scoreboard", "Seating Area", "Water Facility"]
    },
    {
        name: "Prime Sports Hub",
        location: "Banashankari, Bangalore",
        city: "Bangalore",
        pricePerHour: 950,
        sports: ["Cricket", "Football", "Tennis"],
        description: "Complete sports complex offering multiple sports options. Professional maintenance and customer service.",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
            "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80"
        ],
        amenities: ["Multi-sport", "Changing Rooms", "Parking", "Cafeteria", "Coaching", "Equipment Rental"]
    },
    {
        name: "Shuttle Express",
        location: "JP Nagar, Bangalore",
        city: "Bangalore",
        pricePerHour: 550,
        sports: ["Badminton"],
        description: "Popular badminton center with multiple courts and friendly atmosphere. Good for all skill levels.",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
            "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80"
        ],
        amenities: ["AC Courts", "Changing Rooms", "Parking", "Equipment Rental", "Seating Area", "Shower Facilities"]
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Turf.deleteMany();
        await User.deleteMany();

        // Seed turfs
        await Turf.insertMany(turfsData);
        console.log('Turfs seeded successfully');

        // Create admin user
        await User.create({
            name: 'Admin User',
            email: 'admin@turfhub.com',
            password: 'Admin@123',
            phone: '9999999999',
            role: 'admin'
        });
        console.log('Admin user created: admin@turfhub.com / Admin@123');

        // Create demo user
        await User.create({
            name: 'Demo User',
            email: 'user@turfhub.com',
            password: 'User@123',
            phone: '8888888888',
            role: 'user'
        });
        console.log('Demo user created: user@turfhub.com / User@123');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedDatabase();
