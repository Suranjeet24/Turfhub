const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Turf name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        default: 'Bangalore'
    },
    sports: [{
        type: String,
        required: true
    }],
    pricePerHour: {
        type: Number,
        required: [true, 'Price per hour is required'],
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        required: [true, 'Main image is required']
    },
    images: [{
        type: String
    }],
    amenities: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Turf', turfSchema);
