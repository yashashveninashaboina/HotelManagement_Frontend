# 🏨 Grand Royale — Frontend (React.js)

This is the **React.js frontend** for the Grand Royale Hotel Management System.

## Tech Stack
| Technology | Purpose |
|---|---|
| **React 18** | UI Component Framework |
| **Vite** | Build Tool & Dev Server |
| **Vanilla CSS** | Custom Dark Glassmorphism Design System |
| **Fetch API** | HTTP calls to Spring Boot backend |

## Project Structure
```
frontend/
├── src/
│   ├── api/
│   │   └── hotelApi.js       ← All API calls (auth, rooms, bookings, etc.)
│   ├── components/
│   │   ├── Header.jsx        ← Top navigation bar
│   │   ├── HeroBanner.jsx    ← Hero section
│   │   ├── StatsGrid.jsx     ← 4 stat cards
│   │   ├── RoomsView.jsx     ← Room listing + filters
│   │   ├── BookingsView.jsx  ← Bookings table + actions
│   │   ├── CustomersView.jsx ← Customer directory
│   │   ├── PaymentsView.jsx  ← Payment records
│   │   ├── AuthModal.jsx     ← Login / Register modal
│   │   ├── BookingModal.jsx  ← Room booking modal
│   │   └── Toast.jsx         ← Toast notification system
│   ├── App.jsx               ← Root component
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global dark design system
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

> Make sure the **backend** is running on `http://localhost:8080` first!

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App will open at: **http://localhost:5173**

## Demo Credentials
| Role | Email | Password |
|---|---|---|
| Admin | admin@hotel.com | admin123 |
| Receptionist | receptionist@hotel.com | receptionist123 |
| Customer | yashashveni@gmail.com | customer123 |
