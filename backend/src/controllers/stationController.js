import Station from '../models/Station.js';

// @desc    Get all stations (with optional geo-query)
// @route   GET /api/stations
// @access  Public
export const getStations = async (req, res) => {
    const { lat, lng, radius = 5000, type } = req.query;

    try {
        let query = {};

        if (lat && lng) {
            query.location = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                    $maxDistance: parseInt(radius),
                },
            };
        }

        if (type) {
            query['connectors.type'] = type;
        }

        const stations = await Station.find(query);
        res.json({ stations, meta: { count: stations.length } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get station by ID
// @route   GET /api/stations/:id
// @access  Public
export const getStationById = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (station) {
            res.json(station);
        } else {
            res.status(404).json({ message: 'Station not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a station
// @route   POST /api/stations
// @access  Private/Admin
export const createStation = async (req, res) => {
    try {
        const station = new Station({
            ...req.body,
            createdBy: req.user._id,
        });
        const createdStation = await station.save();
        res.status(201).json(createdStation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
