const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Turf',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate bookings
timeSlotSchema.index({ turfId: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
