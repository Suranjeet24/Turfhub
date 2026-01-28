// LocalStorage key
const BOOKINGS_KEY = 'turfhub_bookings';

// Get all bookings from localStorage
function getAllBookings() {
    const bookings = localStorage.getItem(BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
}

// Save a new booking
function saveBooking(booking) {
    const bookings = getAllBookings();
    bookings.push(booking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return booking;
}

// Delete a booking by ID
function deleteBooking(bookingId) {
    const bookings = getAllBookings();
    const filteredBookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filteredBookings));
    return true;
}

// Get bookings for a specific date and turf
function getBookingsForDateAndTurf(date, turfId) {
    const bookings = getAllBookings();
    return bookings.filter(b => b.date === date && b.turfId === turfId);
}

// Check if a specific time slot is available
function isSlotAvailable(date, turfId, time) {
    const bookings = getBookingsForDateAndTurf(date, turfId);
    return !bookings.some(b => b.time === time);
}

// Get booking by ID
function getBookingById(bookingId) {
    const bookings = getAllBookings();
    return bookings.find(b => b.id === bookingId);
}

// Update booking
function updateBooking(bookingId, updatedData) {
    const bookings = getAllBookings();
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updatedData };
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
        return bookings[index];
    }
    return null;
}

// Clear all bookings (for testing)
function clearAllBookings() {
    localStorage.removeItem(BOOKINGS_KEY);
}

// Get bookings count
function getBookingsCount() {
    return getAllBookings().length;
}

// Get upcoming bookings
function getUpcomingBookings() {
    const bookings = getAllBookings();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate >= today;
    });
}

// Get past bookings
function getPastBookings() {
    const bookings = getAllBookings();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate < today;
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getAllBookings,
        saveBooking,
        deleteBooking,
        getBookingsForDateAndTurf,
        isSlotAvailable,
        getBookingById,
        updateBooking,
        clearAllBookings,
        getBookingsCount,
        getUpcomingBookings,
        getPastBookings
    };
}
