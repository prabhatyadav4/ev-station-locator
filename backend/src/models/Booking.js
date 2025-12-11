import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    connectorType: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMins: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'], default: 'pending' },
    price: { type: Number, required: true },
    paymentId: { type: String },
    paymentProvider: { type: String, default: 'mock' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
