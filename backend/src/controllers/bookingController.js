import Booking from '../models/Booking.js';
import Station from '../models/Station.js';
import mongoose from 'mongoose';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    const { stationId, connectorType, startTime, durationMins, paymentMethod } = req.body;
    const userId = req.user._id;

    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMins * 60000);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 1. Fetch Station
        const station = await Station.findById(stationId).session(session);
        if (!station) {
            throw new Error('Station not found');
        }

        // 2. Check Connector Availability
        const connector = station.connectors.find(c => c.type === connectorType);
        if (!connector) {
            throw new Error('Connector type not available');
        }

        // 3. Count overlapping bookings
        const overlappingBookings = await Booking.countDocuments({
            station: stationId,
            connectorType: connectorType,
            status: { $in: ['pending', 'confirmed', 'active'] },
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        }).session(session);

        if (overlappingBookings >= connector.totalPorts) {
            throw new Error('No slots available for this time');
        }

        // 4. Calculate Price
        const price = (connector.powerKw * (durationMins / 60)) * connector.pricePerKWh;

        // 5. Create Booking
        const booking = await Booking.create([{
            user: userId,
            station: stationId,
            connectorType,
            startTime: start,
            endTime: end,
            durationMins,
            price,
            status: 'pending',
            paymentProvider: paymentMethod
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            bookingId: booking[0]._id,
            status: 'pending',
            payment: {
                provider: paymentMethod,
                amount: price,
                currency: 'INR',
                paymentUrl: `/mock/pay/${booking[0]._id}` // Mock URL
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('station', 'name address');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
