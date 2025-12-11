import express from 'express';
import { getStations, getStationById, createStation } from '../controllers/stationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getStations)
    .post(protect, admin, createStation);

router.route('/:id')
    .get(getStationById);

export default router;
