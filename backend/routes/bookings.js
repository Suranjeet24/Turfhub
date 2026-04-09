const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

router.post('/', protect, validate(schemas.createBooking), createBooking);
router.get('/', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
