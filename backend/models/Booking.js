const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf',
        required: true
    },
    date: {
        type: String,
        required: [true, 'Booking date is required']
    },
    time: {
        type: String,
        required: [true, 'Booking time slot is required']
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 hour'],
        max: [5, 'Duration cannot exceed 5 hours']
    },
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    },
    userDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
