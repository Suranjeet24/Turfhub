# 🎾 TurfHub - Turf Booking Platform

A complete, production-ready front-end MVP for a turf booking platform. Users can browse turfs, select time slots, and book them with full booking logic handled using JavaScript and LocalStorage.

## 🚀 Features

### ✅ Core Functionality
- **Browse Turfs**: View all available turfs with filtering and search
- **Turf Details**: See detailed information, amenities, and available time slots
- **Slot Booking**: Real-time slot availability with booking prevention
- **Price Calculation**: Dynamic pricing based on duration (hours)
- **My Bookings**: View and manage all your bookings
- **LocalStorage**: All data persists across sessions

### 🎨 UI/UX Features
- Modern, sports-themed design with neon green accents
- Smooth animations and hover effects
- Sticky navigation bar
- Responsive mobile-friendly design
- Active slot button highlighting
- Success confirmation modals
- Empty states for better UX

### 💡 Advanced Features
- **Smart Filtering**: Filter by sport, price range, and turf name
- **Double Booking Prevention**: Booked slots are automatically disabled
- **Duration Selection**: Choose 1, 2, or 3 hour bookings
- **Date Picker**: Book slots for any future date
- **Booking Management**: Cancel upcoming bookings
- **Status Indicators**: Upcoming vs completed bookings

## 📁 Project Structure

```
turf-booking/
│
├── index.html              # Home page with hero & popular turfs
├── turfs.html             # Listing page with filters
├── turf-details.html      # Individual turf details & slot selection
├── booking.html           # Complete booking with user info
├── my-bookings.html       # View and manage bookings
│
├── css/
│   └── style.css          # Complete styling with animations
│
├── js/
│   ├── data.js           # Sample turf data (12 turfs)
│   └── storage.js        # LocalStorage management functions
│
└── README.md             # This file
```

## 🎯 Key Pages

### 1️⃣ **Home Page** (index.html)
- Hero section with location search
- Sports category cards (Cricket, Football, Badminton, Tennis)
- Popular turfs grid with booking cards
- Each card shows: image, name, location, price, sports, book button

### 2️⃣ **Turf Listing Page** (turfs.html)
- Advanced filtering sidebar (by sport, price, name)
- Responsive grid layout
- Real-time filtering with DOM manipulation
- Results counter
- Empty state handling

### 3️⃣ **Turf Details Page** (turf-details.html)
- Image gallery with thumbnails
- Detailed turf information and amenities
- Date picker (min: today)
- Time slot selection (6 AM - 10 PM)
- Disabled booked slots with visual indicators
- Booking summary card
- Sticky booking panel

### 4️⃣ **Booking Page** (booking.html)
- Complete booking details
- User information form (name, phone, email)
- Duration selector (1hr/2hr/3hr)
- Price calculation: `Total = Price per hour × Hours`
- Booking summary with total amount
- Success modal with navigation options

### 5️⃣ **My Bookings Page** (my-bookings.html)
- List all bookings (sorted by date)
- Status badges (Upcoming/Completed)
- Detailed booking information
- Cancel booking functionality
- Empty state for new users

## 🔥 Booking Logic

### Slot Management
```javascript
// Check if slot is booked
function getBookingsForDateAndTurf(date, turfId) {
    const bookings = getAllBookings();
    return bookings.filter(b => b.date === date && b.turfId === turfId);
}

// Prevent double booking
const isBooked = bookings.some(b => b.time === slot);
```

### Price Calculation
```javascript
const totalAmount = pricePerHour × selectedDuration;
```

### LocalStorage Structure
```javascript
{
    id: 1706543210789,
    turfId: 1,
    turfName: "GreenField Arena",
    date: "2026-02-10",
    time: "6:00 PM - 7:00 PM",
    duration: 2,
    pricePerHour: 800,
    totalAmount: 1600,
    userName: "John Doe",
    userPhone: "9876543210",
    userEmail: "john@example.com",
    bookedAt: "2026-01-28T10:30:00.000Z"
}
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Neon Green (#00ff88)
- **Secondary**: Pink Red (#ff3366)
- **Background**: Dark Navy (#0a0e27)
- **Cards**: Dark Blue (#1a1f3a)

### Typography
- **Display**: Righteous (headings, logo)
- **Body**: Outfit (all other text)

### Animations
- Fade in on scroll
- Hover effects on cards
- Button press animations
- Modal slide-up effects
- Pulse animations on icons

### Responsive Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🛠️ Technical Implementation

### JavaScript Features Used
- DOM Manipulation
- Event Handling
- LocalStorage API
- Date Handling
- Array Methods (filter, map, find, some)
- URL Parameters (URLSearchParams)
- Session Storage (for booking flow)

### CSS Features Used
- CSS Grid & Flexbox
- CSS Variables
- Keyframe Animations
- Transitions
- Backdrop Filter
- Gradient Text
- Sticky Positioning

## 🚀 Getting Started

### Option 1: Direct Opening
1. Extract the folder
2. Open `index.html` in any modern browser
3. Start booking!

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code
# Install "Live Server" extension and click "Go Live"
```

Then visit: `http://localhost:8000`

## 💼 Interview Talking Points

**"This is a front-end MVP of a turf booking platform with real-world e-commerce flow."**

### Key Technical Highlights:
1. **Real Booking Logic**: Slot availability, double booking prevention
2. **State Management**: Complete LocalStorage implementation
3. **DOM Manipulation**: Dynamic rendering based on filters
4. **User Flow**: 5-page booking journey from search to confirmation
5. **Price Calculation**: Dynamic pricing based on user selection
6. **Data Persistence**: Bookings survive page refreshes
7. **Responsive Design**: Works on all devices
8. **Clean Code**: Modular JavaScript with separate concerns

### Business Problem Solved:
Sports facility booking is a common real-world problem. This platform:
- Reduces phone bookings
- Prevents double bookings
- Shows real-time availability
- Provides booking history
- Enables online payments (UI ready)

### Skills Demonstrated:
✅ JavaScript (ES6+)  
✅ DOM Manipulation  
✅ LocalStorage API  
✅ Responsive CSS  
✅ UX/UI Design  
✅ Project Organization  
✅ Real-world Problem Solving  

## 🎯 Future Enhancements

### Easy Additions:
- [ ] Login/Signup UI (no backend)
- [ ] Dark mode toggle
- [ ] Location dropdown with auto-complete
- [ ] Booking success animation (confetti)
- [ ] Fake payment screen
- [ ] Print booking receipt
- [ ] Share booking via WhatsApp

### Advanced Features:
- [ ] User reviews and ratings
- [ ] Photo upload for turfs
- [ ] Calendar view for bookings
- [ ] Email notifications (UI only)
- [ ] Discount codes
- [ ] Recurring bookings
- [ ] Team tournaments

## 📱 Screenshots

All pages are fully functional and can be tested by:
1. Opening index.html
2. Browsing turfs
3. Selecting a turf
4. Choosing date and time
5. Completing booking
6. Viewing in "My Bookings"

## 🏆 Why This Project Stands Out

1. **Complete User Journey**: Not just a landing page, but a full booking flow
2. **Real Logic**: Actual booking prevention and state management
3. **Professional UI**: Modern, polished design that looks production-ready
4. **Best Practices**: Clean code structure, modular approach
5. **Attention to Detail**: Loading states, empty states, error handling
6. **Industry Standard**: Similar to real booking platforms (Playo, HudHud)

## 📝 Credits

Built as a front-end portfolio project demonstrating:
- Modern web development practices
- User-centric design
- Real-world problem solving
- Production-ready code quality

---

**Happy Booking! 🎾⚽🏸**

Built with ❤️ and lots of JavaScript
