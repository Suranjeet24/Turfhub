const express = require('express');
const router = express.Router();
const { getStats, getAllBookings } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, getStats);
router.get('/bookings', protect, adminOnly, getAllBookings);

module.exports = router;
