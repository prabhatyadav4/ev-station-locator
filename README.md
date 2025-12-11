# EV Station Locator

A full-stack web application to locate EV charging stations, view live availability, and book slots.

## Features

- **Interactive Map**: Find stations near you using Google Maps.
- **Real-time Availability**: View live slot status (simulated).
- **Booking System**: Book charging slots with atomic reservation logic.
- **User Profile**: Manage your bookings and vehicle details.
- **Mock Payments**: Simulate payment flow.
- **Responsive Design**: Futuristic Neon UI built with Tailwind CSS.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Zustand, React Router, Google Maps API.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Infrastructure**: Docker, Docker Compose.

## Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Maps API Key (Optional for dev, but map won't load without it)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd ev-station-locator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   npm run install:all
   ```

3. **Environment Configuration**
   Copy `.env.example` to `.env` in the root (or create separate .env files in frontend/backend if preferred, but the docker-compose uses root env or defaults).
   
   For local dev without docker:
   - Create `backend/.env` based on `.env.example`
   - Create `frontend/.env` based on `.env.example` (rename keys to `VITE_...` for Vite)

   **Note**: The provided `.env.example` uses `REACT_APP_` prefix, but Vite uses `VITE_`. Please update your `.env` accordingly.
   
   Example `frontend/.env`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Run Locally**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## Docker Setup

1. **Build and Run**
   ```bash
   docker-compose up --build
   ```

## API Documentation

See [docs/API.md](docs/API.md) for detailed API endpoints.

## Demo Flow

1. **Sign Up**: Create a new account.
2. **Locate**: Go to "Find Stations" map view.
3. **Select**: Click on a station marker to view details.
4. **Book**: Choose a connector and a time slot.
5. **Pay**: Click "Confirm & Pay" (Mock payment).
6. **Verify**: Check "My Profile" to see the confirmed booking.
