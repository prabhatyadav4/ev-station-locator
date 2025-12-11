# API Documentation

## Authentication

### POST /api/auth/signup
Register a new user.
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### POST /api/auth/login
Login user.
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Stations

### GET /api/stations
Get all stations. Supports geo-query.
**Query Params:**
- `lat`: Latitude
- `lng`: Longitude
- `radius`: Radius in meters (default 5000)
- `type`: Connector type (CCS, CHAdeMO, Type2)

### GET /api/stations/:id
Get station details by ID.

### POST /api/stations (Admin)
Create a new station.

## Bookings

### POST /api/bookings
Create a new booking.
**Body:**
```json
{
  "stationId": "station_id",
  "connectorType": "CCS",
  "startTime": "2023-10-27T10:00:00Z",
  "durationMins": 30,
  "paymentMethod": "mock"
}
```

### GET /api/bookings/my
Get logged-in user's bookings.
