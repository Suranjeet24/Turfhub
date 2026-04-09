const Turf = require('../models/Turf');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Get all turfs
// @route   GET /api/turfs
const getTurfs = async (req, res) => {
    try {
        const { sport, city, minPrice, maxPrice, search } = req.query;
        let query = { status: 'active' };

        // Escape user input to prevent regex injection
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (sport) query.sports = { $in: [new RegExp(escapeRegex(sport), 'i')] };
        if (city) query.city = new RegExp(escapeRegex(city), 'i');
        if (search) query.name = new RegExp(escapeRegex(search), 'i');
        if (minPrice || maxPrice) {
            query.pricePerHour = {};
            if (minPrice) query.pricePerHour.$gte = Number(minPrice);
            if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
        }

        const turfs = await Turf.find(query).sort({ createdAt: -1 });
        res.json({ success: true, count: turfs.length, turfs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single turf
// @route   GET /api/turfs/:id
const getTurf = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid turf ID' });
        }
        const turf = await Turf.findById(req.params.id);
        if (!turf) {
            return res.status(404).json({ success: false, message: 'Turf not found' });
        }
        res.json({ success: true, turf });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get available slots for a turf on a date
// @route   GET /api/turfs/:id/slots
const getTurfSlots = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid turf ID' });
        }
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ success: false, message: 'Date is required' });
        }

        const allSlots = [
            '6:00 AM - 7:00 AM', '7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM',
            '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
            '12:00 PM - 1:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM',
            '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM',
            '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM', '9:00 PM - 10:00 PM'
        ];

        const bookedSlots = await Booking.find({
            turfId: req.params.id,
            date: String(date),
            status: { $ne: 'cancelled' }
        }).select('time');

        const bookedTimes = bookedSlots.map(b => b.time);
        const slots = allSlots.map(slot => ({
            time: slot,
            isBooked: bookedTimes.includes(slot)
        }));

        res.json({ success: true, slots });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create turf (admin)
// @route   POST /api/turfs
const createTurf = async (req, res) => {
    try {
        const turf = await Turf.create(req.body);
        res.status(201).json({ success: true, turf });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update turf (admin)
// @route   PUT /api/turfs/:id
const updateTurf = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid turf ID' });
        }
        // Whitelist updatable fields to prevent mass assignment
        const { name, description, location, city, sports, pricePerHour, image, images, amenities, status } = req.body;
        const updateData = {};
        if (name !== undefined) updateData.name = String(name);
        if (description !== undefined) updateData.description = String(description);
        if (location !== undefined) updateData.location = String(location);
        if (city !== undefined) updateData.city = String(city);
        if (sports !== undefined) updateData.sports = Array.isArray(sports) ? sports.map(s => String(s)) : [];
        if (pricePerHour !== undefined) updateData.pricePerHour = Number(pricePerHour);
        if (image !== undefined) updateData.image = String(image);
        if (images !== undefined) updateData.images = Array.isArray(images) ? images.map(i => String(i)) : [];
        if (amenities !== undefined) updateData.amenities = Array.isArray(amenities) ? amenities.map(a => String(a)) : [];
        if (status !== undefined) {
            if (!['active', 'inactive'].includes(status)) {
                return res.status(400).json({ success: false, message: 'Invalid status value' });
            }
            updateData.status = status;
        }

        const turf = await Turf.findByIdAndUpdate(req.params.id, { $set: updateData }, {
            new: true,
            runValidators: true
        });
        if (!turf) {
            return res.status(404).json({ success: false, message: 'Turf not found' });
        }
        res.json({ success: true, turf });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete turf (admin)
// @route   DELETE /api/turfs/:id
const deleteTurf = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid turf ID' });
        }
        const turf = await Turf.findByIdAndDelete(req.params.id);
        if (!turf) {
            return res.status(404).json({ success: false, message: 'Turf not found' });
        }
        res.json({ success: true, message: 'Turf deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getTurfs, getTurf, getTurfSlots, createTurf, updateTurf, deleteTurf };
