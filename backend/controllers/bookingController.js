const Booking = require('../models/Booking');
const Turf = require('../models/Turf');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Create booking
// @route   POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const { turfId, date, time, duration, userDetails } = req.body;

        if (!isValidObjectId(turfId)) {
            return res.status(400).json({ success: false, message: 'Invalid turf ID' });
        }

        // Check if turf exists
        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({ success: false, message: 'Turf not found' });
        }

        // Check for booking conflict
        const existingBooking = await Booking.findOne({
            turfId,
            date: String(date),
            time: String(time),
            status: { $ne: 'cancelled' }
        });

        if (existingBooking) {
            return res.status(400).json({ success: false, message: 'This time slot is already booked' });
        }

        const totalAmount = turf.pricePerHour * duration;

        const booking = await Booking.create({
            userId: req.user._id,
            turfId,
            date: String(date),
            time: String(time),
            duration,
            totalAmount,
            userDetails
        });

        const populatedBooking = await Booking.findById(booking._id).populate('turfId', 'name location image');

        res.status(201).json({ success: true, booking: populatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id })
            .populate('turfId', 'name location image')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: bookings.length, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
const getBooking = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid booking ID' });
        }
        const booking = await Booking.findById(req.params.id).populate('turfId', 'name location image pricePerHour');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        // Only allow user's own booking or admin
        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update/Cancel booking
// @route   PUT /api/bookings/:id
const updateBooking = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid booking ID' });
        }
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        const allowedStatuses = ['pending', 'confirmed', 'cancelled'];
        const requestedStatus = String(req.body.status);
        const newStatus = allowedStatuses.includes(requestedStatus) ? requestedStatus : 'cancelled';

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: { status: newStatus } },
            { new: true }
        ).populate('turfId', 'name location');

        res.json({ success: true, booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid booking ID' });
        }
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking, getMyBookings, getBooking, updateBooking, deleteBooking };
