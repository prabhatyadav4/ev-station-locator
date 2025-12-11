import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bookingRoutes from '../routes/bookingRoutes.js';
import Station from '../models/Station.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Mock Auth Middleware
app.use((req, res, next) => {
    req.user = { _id: new mongoose.Types.ObjectId() };
    next();
});

app.use('/api/bookings', bookingRoutes);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Booking API', () => {
    let stationId;

    beforeEach(async () => {
        const station = await Station.create({
            name: 'Test Station',
            location: { coordinates: [0, 0] },
            address: 'Test Address',
            connectors: [{ type: 'CCS', powerKw: 50, pricePerKWh: 10, totalPorts: 1 }],
        });
        stationId = station._id;
    });

    afterEach(async () => {
        await Station.deleteMany({});
        await Booking.deleteMany({});
    });

    it('should prevent double booking for the same slot', async () => {
        const bookingData = {
            stationId,
            connectorType: 'CCS',
            startTime: new Date().toISOString(),
            durationMins: 30,
            paymentMethod: 'mock',
        };

        // Simulate concurrent requests
        const req1 = request(app).post('/api/bookings').send(bookingData);
        const req2 = request(app).post('/api/bookings').send(bookingData);

        const [res1, res2] = await Promise.all([req1, req2]);

        // One should succeed, one should fail
        const successCount = [res1, res2].filter(r => r.status === 201).length;
        const failCount = [res1, res2].filter(r => r.status === 400).length;

        expect(successCount).toBe(1);
        expect(failCount).toBe(1);
    });
});
