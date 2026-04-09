const express = require('express');
const router = express.Router();
const { getTurfs, getTurf, getTurfSlots, createTurf, updateTurf, deleteTurf } = require('../controllers/turfController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getTurfs);
router.get('/:id', getTurf);
router.get('/:id/slots', getTurfSlots);
router.post('/', protect, adminOnly, createTurf);
router.put('/:id', protect, adminOnly, updateTurf);
router.delete('/:id', protect, adminOnly, deleteTurf);

module.exports = router;
