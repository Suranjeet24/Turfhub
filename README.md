# 🎾 TurfHub - Turf Booking Platform

A full-stack turf booking platform with a Node.js/Express/MongoDB backend and a vanilla JS frontend. Users can browse turfs, select time slots, create accounts, and book — with data persisted in MongoDB. The frontend falls back to LocalStorage when the backend is unavailable.

## 🚀 Features

### ✅ Core Functionality
- **Browse Turfs**: View all available turfs with filtering and search
- **Turf Details**: See detailed information, amenities, and available time slots
- **Slot Booking**: Real-time slot availability with booking conflict prevention
- **Price Calculation**: Dynamic pricing based on duration (hours)
- **My Bookings**: View and manage all your bookings
- **User Auth**: JWT-based register/login, with navbar updating on auth state
- **LocalStorage fallback**: All pages work without the backend running

## 📁 Project Structure

```
TurfHub/
├── index.html              # Home page
├── turfs.html              # Listing page with filters
├── turf-details.html       # Individual turf details & slot selection
├── booking.html            # Complete booking with user info
├── my-bookings.html        # View and manage bookings
├── login.html              # Login page
├── signup.html             # Sign up page
├── Dockerfile              # Docker image for backend
├── docker-compose.yml      # Docker Compose (MongoDB + backend)
│
├── css/
│   └── style.css           # Styles including auth page styles
│
├── js/
│   ├── api.js              # API client (AuthAPI, TurfsAPI, BookingsAPI)
│   ├── auth.js             # Auth state management + navbar update
│   ├── data.js             # Static turf data (fallback)
│   └── storage.js          # LocalStorage utilities (fallback)
│
└── backend/
    ├── server.js           # Express app entry point
    ├── seed.js             # Database seeder (turfs + demo users)
    ├── package.json
    ├── .env.example
    ├── config/
    │   └── database.js     # Mongoose connection
    ├── models/
    │   ├── User.js
    │   ├── Turf.js
    │   ├── Booking.js
    │   └── TimeSlot.js
    ├── middleware/
    │   ├── auth.js         # JWT protect + adminOnly middleware
    │   └── validation.js   # Joi request validation
    ├── controllers/
    │   ├── authController.js
    │   ├── turfController.js
    │   ├── bookingController.js
    │   └── adminController.js
    └── routes/
        ├── auth.js
        ├── turfs.js
        ├── bookings.js
        └── admin.js
```

## 🛠️ Backend Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally (or use Docker)

### Local Setup

```bash
cd backend
cp .env.example .env
# Edit .env and set MONGODB_URI, JWT_SECRET, etc.
npm install
npm run seed    # Seeds turfs + creates demo users
npm start       # Starts on port 5000
```

### Demo credentials (after seeding)
| Role  | Email               | Password   |
|-------|---------------------|------------|
| Admin | admin@turfhub.com   | Admin@123  |
| User  | user@turfhub.com    | User@123   |

### Docker Setup

```bash
docker-compose up -d
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

To seed the database when using Docker:
```bash
docker exec -it turfhub-backend node seed.js
```

## 🌐 API Endpoints

### Auth
| Method | Endpoint            | Auth | Description          |
|--------|---------------------|------|----------------------|
| POST   | /api/auth/register  | No   | Register user        |
| POST   | /api/auth/login     | No   | Login                |
| POST   | /api/auth/logout    | Yes  | Logout               |
| GET    | /api/auth/profile   | Yes  | Get profile          |

### Turfs
| Method | Endpoint              | Auth  | Description          |
|--------|-----------------------|-------|----------------------|
| GET    | /api/turfs            | No    | List all turfs       |
| GET    | /api/turfs/:id        | No    | Get single turf      |
| GET    | /api/turfs/:id/slots  | No    | Get slots for date   |
| POST   | /api/turfs            | Admin | Create turf          |
| PUT    | /api/turfs/:id        | Admin | Update turf          |
| DELETE | /api/turfs/:id        | Admin | Delete turf          |

### Bookings
| Method | Endpoint         | Auth | Description          |
|--------|------------------|------|----------------------|
| POST   | /api/bookings    | Yes  | Create booking       |
| GET    | /api/bookings    | Yes  | Get my bookings      |
| GET    | /api/bookings/:id| Yes  | Get single booking   |
| PUT    | /api/bookings/:id| Yes  | Cancel booking       |
| DELETE | /api/bookings/:id| Yes  | Delete booking       |

### Admin
| Method | Endpoint              | Auth  | Description          |
|--------|-----------------------|-------|----------------------|
| GET    | /api/admin/stats      | Admin | Dashboard stats      |
| GET    | /api/admin/bookings   | Admin | All bookings         |

## 🔧 Frontend Integration

- `js/api.js` — API client with `AuthAPI`, `TurfsAPI`, `BookingsAPI`, `AdminAPI`
- `js/auth.js` — `Auth` object for session management; `updateNavbar()` adds login/logout/user greeting dynamically
- All pages include `api.js` and `auth.js` before existing scripts
- **Graceful fallback**: if the backend is unreachable, all pages continue to use static data + LocalStorage

## 🚀 Getting Started (Frontend Only)

Open `index.html` in any modern browser — no server required.

```bash
# Or use a local dev server
python -m http.server 8000
# Visit http://localhost:8000
```

---

Built with ❤️ — Node.js · Express · MongoDB · Vanilla JS

