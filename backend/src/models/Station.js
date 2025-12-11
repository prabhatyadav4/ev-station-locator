import mongoose from 'mongoose';

const connectorSchema = new mongoose.Schema({
    type: { type: String, enum: ['CHAdeMO', 'CCS', 'Type2'], required: true },
    powerKw: { type: Number, required: true },
    pricePerKWh: { type: Number, required: true },
    totalPorts: { type: Number, required: true },
});

const stationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    address: { type: String, required: true },
    category: {
        type: String,
        enum: ['Public', 'Mall', 'Highway', 'Hotel', 'Residential', 'Office'],
        default: 'Public'
    },
    services: {
        type: [String],
        enum: ['Cafe', 'Restroom', 'WiFi', 'Shopping', 'Lodging', 'Dining', 'Park', 'Grocery'],
        default: []
    },
    status: {
        type: String,
        enum: ['Available', 'Busy', 'Offline', 'Maintenance'],
        default: 'Available'
    },
    images: [String],
    connectors: [connectorSchema],
    timeSlotsConfig: {
        slotLengthMins: { type: Number, default: 30 },
        openHour: { type: Number, default: 0 },
        closeHour: { type: Number, default: 24 },
    },
    rating: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

stationSchema.index({ location: '2dsphere' });

const Station = mongoose.model('Station', stationSchema);
export default Station;
