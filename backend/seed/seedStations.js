import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Station from '../src/models/Station.js';

dotenv.config();

const stations = [
    // --- Delhi - Mumbai (NH 48) ---
    {
        name: "ChargeZone - Jaipur Highway",
        location: { type: "Point", coordinates: [75.7873, 26.9124] },
        address: "NH 48, Jaipur, Rajasthan",
        category: "Highway",
        services: ["Restroom", "Dining", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 20, totalPorts: 4 }],
        status: "Available",
        rating: 4.5
    },
    {
        name: "Tata Power - Udaipur Midway",
        location: { type: "Point", coordinates: [73.7125, 24.5854] },
        address: "NH 48, Udaipur, Rajasthan",
        category: "Highway",
        services: ["Cafe", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 18, totalPorts: 2 }],
        status: "Available",
        rating: 4.2
    },
    {
        name: "Statiq Hub - Ahmedabad",
        location: { type: "Point", coordinates: [72.5714, 23.0225] },
        address: "SG Highway, Ahmedabad, Gujarat",
        category: "Mall",
        services: ["Shopping", "Dining", "WiFi", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 120, pricePerKWh: 22, totalPorts: 6 }],
        status: "Busy",
        rating: 4.7
    },
    {
        name: "Jio-bp Pulse - Surat",
        location: { type: "Point", coordinates: [72.8311, 21.1702] },
        address: "NH 48, Surat, Gujarat",
        category: "Highway",
        services: ["Restroom", "Grocery"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 19, totalPorts: 4 }],
        status: "Available",
        rating: 4.4
    },
    {
        name: "GreenCharge - Vapi",
        location: { type: "Point", coordinates: [72.9106, 20.3893] },
        address: "NH 48, Vapi, Gujarat",
        category: "Highway",
        services: ["Restroom"],
        connectors: [{ type: "Type2", powerKw: 22, pricePerKWh: 15, totalPorts: 2 }],
        status: "Available",
        rating: 4.0
    },

    // --- Mumbai - Pune - Bangalore (NH 48) ---
    {
        name: "MGL EV Station - Lonavala",
        location: { type: "Point", coordinates: [73.4072, 18.7518] },
        address: "Mumbai-Pune Expressway, Lonavala",
        category: "Highway",
        services: ["Dining", "Restroom", "Shopping"],
        connectors: [{ type: "CCS", powerKw: 50, pricePerKWh: 21, totalPorts: 3 }],
        status: "Busy",
        rating: 4.3
    },
    {
        name: "Zeon Charging - Kolhapur",
        location: { type: "Point", coordinates: [74.2433, 16.7050] },
        address: "NH 48, Kolhapur, Maharashtra",
        category: "Hotel",
        services: ["Lodging", "Dining", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 20, totalPorts: 2 }],
        status: "Available",
        rating: 4.6
    },
    {
        name: "Relux Electric - Belgaum",
        location: { type: "Point", coordinates: [74.4977, 15.8497] },
        address: "NH 48, Belgaum, Karnataka",
        category: "Highway",
        services: ["Restroom"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 18, totalPorts: 2 }],
        status: "Available",
        rating: 4.1
    },
    {
        name: "Bescom Fast Charger - Davanagere",
        location: { type: "Point", coordinates: [75.9218, 14.4644] },
        address: "NH 48, Davanagere, Karnataka",
        category: "Public",
        services: ["Park"],
        connectors: [{ type: "CCS", powerKw: 50, pricePerKWh: 19, totalPorts: 4 }],
        status: "Available",
        rating: 4.2
    },
    {
        name: "Shell Recharge - Tumkur",
        location: { type: "Point", coordinates: [77.1140, 13.3392] },
        address: "NH 48, Tumkur, Karnataka",
        category: "Highway",
        services: ["Cafe", "Restroom", "Grocery"],
        connectors: [{ type: "CCS", powerKw: 120, pricePerKWh: 24, totalPorts: 6 }],
        status: "Available",
        rating: 4.8
    },

    // --- Delhi - Chandigarh - Manali (NH 44/3) ---
    {
        name: "Statiq - Murthal",
        location: { type: "Point", coordinates: [77.0736, 29.0222] },
        address: "GT Road, Murthal, Haryana",
        category: "Highway",
        services: ["Dining", "Restroom", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 18, totalPorts: 4 }],
        status: "Busy",
        rating: 4.4
    },
    {
        name: "Tata Power - Ambala",
        location: { type: "Point", coordinates: [76.7767, 30.3782] },
        address: "NH 44, Ambala, Haryana",
        category: "Highway",
        services: ["Restroom"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 16, totalPorts: 2 }],
        status: "Available",
        rating: 4.1
    },
    {
        name: "E-Fill - Chandigarh",
        location: { type: "Point", coordinates: [76.7794, 30.7333] },
        address: "Sector 17, Chandigarh",
        category: "Mall",
        services: ["Shopping", "Dining", "WiFi"],
        connectors: [{ type: "Type2", powerKw: 22, pricePerKWh: 12, totalPorts: 6 }],
        status: "Available",
        rating: 4.5
    },
    {
        name: "GoEgo - Bilaspur",
        location: { type: "Point", coordinates: [76.7600, 31.3260] },
        address: "NH 205, Bilaspur, Himachal Pradesh",
        category: "Highway",
        services: ["Restroom", "Cafe"],
        connectors: [{ type: "CCS", powerKw: 25, pricePerKWh: 18, totalPorts: 1 }],
        status: "Available",
        rating: 3.9
    },
    {
        name: "Kazam - Manali",
        location: { type: "Point", coordinates: [77.1887, 32.2396] },
        address: "Mall Road, Manali, Himachal Pradesh",
        category: "Hotel",
        services: ["Lodging", "Dining", "WiFi"],
        connectors: [{ type: "Type2", powerKw: 7.4, pricePerKWh: 15, totalPorts: 4 }],
        status: "Available",
        rating: 4.7
    },

    // --- Chennai - Bangalore (NH 48) ---
    {
        name: "Zeon Charging - Vellore",
        location: { type: "Point", coordinates: [79.1325, 12.9165] },
        address: "NH 48, Vellore, Tamil Nadu",
        category: "Highway",
        services: ["Dining", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 50, pricePerKWh: 20, totalPorts: 2 }],
        status: "Available",
        rating: 4.3
    },
    {
        name: "Relux - Kanchipuram",
        location: { type: "Point", coordinates: [79.7036, 12.8342] },
        address: "NH 48, Kanchipuram, Tamil Nadu",
        category: "Hotel",
        services: ["Lodging", "Dining"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 18, totalPorts: 2 }],
        status: "Available",
        rating: 4.0
    },

    // --- Hyderabad - Bangalore (NH 44) ---
    {
        name: "Fortum - Kurnool",
        location: { type: "Point", coordinates: [78.0373, 15.8281] },
        address: "NH 44, Kurnool, Andhra Pradesh",
        category: "Highway",
        services: ["Restroom", "Dining"],
        connectors: [{ type: "CCS", powerKw: 50, pricePerKWh: 21, totalPorts: 2 }],
        status: "Available",
        rating: 4.2
    },
    {
        name: "Tata Power - Anantapur",
        location: { type: "Point", coordinates: [77.6006, 14.6819] },
        address: "NH 44, Anantapur, Andhra Pradesh",
        category: "Highway",
        services: ["Restroom"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 19, totalPorts: 2 }],
        status: "Available",
        rating: 4.1
    },

    // --- Kolkata - Delhi (NH 19) ---
    {
        name: "E-Charge - Varanasi",
        location: { type: "Point", coordinates: [82.9739, 25.3176] },
        address: "NH 19, Varanasi, Uttar Pradesh",
        category: "Hotel",
        services: ["Lodging", "Dining", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 20, totalPorts: 2 }],
        status: "Available",
        rating: 4.3
    },
    {
        name: "Statiq - Agra",
        location: { type: "Point", coordinates: [78.0081, 27.1767] },
        address: "Yamuna Expressway, Agra, Uttar Pradesh",
        category: "Highway",
        services: ["Restroom", "Dining"],
        connectors: [{ type: "CCS", powerKw: 120, pricePerKWh: 22, totalPorts: 4 }],
        status: "Busy",
        rating: 4.6
    },
    {
        name: "Tata Power - Kanpur",
        location: { type: "Point", coordinates: [80.3319, 26.4499] },
        address: "NH 19, Kanpur, Uttar Pradesh",
        category: "Public",
        services: ["Park"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 18, totalPorts: 2 }],
        status: "Available",
        rating: 4.0
    },

    // --- Madhya Pradesh Cities ---
    {
        name: "Smart City Charger - Bhopal",
        location: { type: "Point", coordinates: [77.4126, 23.2599] },
        address: "MP Nagar, Bhopal, Madhya Pradesh",
        category: "Office",
        services: ["WiFi", "Cafe"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 18, totalPorts: 4 }],
        status: "Available",
        rating: 4.5
    },
    {
        name: "Indore EV Hub",
        location: { type: "Point", coordinates: [75.8577, 22.7196] },
        address: "Vijay Nagar, Indore, Madhya Pradesh",
        category: "Mall",
        services: ["Shopping", "Dining", "WiFi"],
        connectors: [
            { type: "CCS", powerKw: 120, pricePerKWh: 20, totalPorts: 6 },
            { type: "Type2", powerKw: 22, pricePerKWh: 15, totalPorts: 4 }
        ],
        status: "Busy",
        rating: 4.8
    },
    {
        name: "Gwalior Fort Charger",
        location: { type: "Point", coordinates: [78.1828, 26.2183] },
        address: "City Center, Gwalior, Madhya Pradesh",
        category: "Public",
        services: ["Restroom"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 19, totalPorts: 2 }],
        status: "Available",
        rating: 4.2
    },
    {
        name: "Jabalpur Green Spot",
        location: { type: "Point", coordinates: [79.9199, 23.1815] },
        address: "Civic Center, Jabalpur, Madhya Pradesh",
        category: "Public",
        services: ["Park", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 50, pricePerKWh: 18, totalPorts: 3 }],
        status: "Available",
        rating: 4.3
    },
    {
        name: "Ujjain Mahakal EV",
        location: { type: "Point", coordinates: [75.7772, 23.1765] },
        address: "Near Mahakaleshwar Temple, Ujjain, Madhya Pradesh",
        category: "Public",
        services: ["Restroom", "Dining"],
        connectors: [{ type: "Type2", powerKw: 22, pricePerKWh: 15, totalPorts: 4 }],
        status: "Available",
        rating: 4.6
    },
    {
        name: "Sagar Highway Stop",
        location: { type: "Point", coordinates: [78.7378, 23.8388] },
        address: "NH 44, Sagar, Madhya Pradesh",
        category: "Highway",
        services: ["Dining", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 30, pricePerKWh: 18, totalPorts: 2 }],
        status: "Available",
        rating: 4.0
    },

    // --- Other Major Cities ---
    {
        name: "Hyderabad Tech City",
        location: { type: "Point", coordinates: [78.3850, 17.4401] },
        address: "Hitech City, Hyderabad, Telangana",
        category: "Office",
        services: ["WiFi", "Cafe", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 22, totalPorts: 6 }],
        status: "Busy",
        rating: 4.7
    },
    {
        name: "Chennai Marina Charger",
        location: { type: "Point", coordinates: [80.2707, 13.0475] },
        address: "Marina Beach Road, Chennai, Tamil Nadu",
        category: "Public",
        services: ["Park", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 50, pricePerKWh: 20, totalPorts: 4 }],
        status: "Available",
        rating: 4.4
    },
    {
        name: "Kolkata Eco Park",
        location: { type: "Point", coordinates: [88.4656, 22.6196] },
        address: "New Town, Kolkata, West Bengal",
        category: "Public",
        services: ["Park", "WiFi", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 19, totalPorts: 4 }],
        status: "Available",
        rating: 4.5
    },
    // New Stations to increase density
    {
        name: "DLF CyberHub EV",
        location: { type: "Point", coordinates: [77.0878, 28.4952] },
        address: "DLF Phase 2, Gurugram, Haryana",
        category: "Mall",
        services: ["Shopping", "Dining", "WiFi", "Restroom"],
        connectors: [{ type: "CCS", powerKw: 100, pricePerKWh: 25, totalPorts: 8 }],
        status: "Busy",
        rating: 4.9
    },
    {
        name: "Phoenix Mall Charger",
        location: { type: "Point", coordinates: [77.6966, 12.9166] },
        address: "Whitefield, Bangalore, Karnataka",
        category: "Mall",
        services: ["Shopping", "Dining", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 60, pricePerKWh: 21, totalPorts: 6 }],
        status: "Available",
        rating: 4.6
    },
    {
        name: "Taj Palace Specia Charging",
        location: { type: "Point", coordinates: [72.8329, 18.9217] },
        address: "Colaba, Mumbai, Maharashtra",
        category: "Hotel",
        services: ["Lodging", "Dining", "WiFi"],
        connectors: [{ type: "Type2", powerKw: 22, pricePerKWh: 30, totalPorts: 4 }],
        status: "Available",
        rating: 4.9
    },
    {
        name: "LuLu Mall EV Zone",
        location: { type: "Point", coordinates: [76.3125, 10.0249] },
        address: "Edappally, Kochi, Kerala",
        category: "Mall",
        services: ["Shopping", "Dining", "WiFi"],
        connectors: [{ type: "CCS", powerKw: 80, pricePerKWh: 18, totalPorts: 6 }],
        status: "Busy",
        rating: 4.7
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/evdb');
        console.log('MongoDB Connected');

        await Station.deleteMany({});
        console.log('Stations cleared');

        await Station.insertMany(stations);
        console.log(`Seeded ${stations.length} stations`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
