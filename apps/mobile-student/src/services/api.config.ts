// API Configuration - Base URL and Endpoints
// Maps to API Gateway endpoints defined in booking-system/API_GATEWAY_SETUP.md

export const API_CONFIG = {
  // TODO: Replace with actual API Gateway URL after deployment
  BASE_URL: 'https://b7qa2tmqhg.execute-api.ap-south-1.amazonaws.com/dev',
  TIMEOUT: 30000, // 30 seconds
};

// API Endpoints mapping to Lambda handlers
export const API_ENDPOINTS = {
  // Auth endpoints - No authorization required
  AUTH: {
    REGISTER: '/api/auth/register',    // → RegisterUserHandler
    LOGIN: '/api/auth/login',          // → LoginUserHandler
  },
  
  // Trip endpoints - Requires Bearer token
  TRIPS: {
    AVAILABLE: '/api/trips/available', // → GetAvailableTripsHandler (GET with query params)
    CREATE: '/api/trips',              // → CreateTripHandler (Admin only)
  },
  
  // Booking endpoints - Requires Bearer token
  BOOKINGS: {
    CREATE: '/api/bookings',           // → BookTripHandler
    CANCEL: '/api/bookings',           // → CancelBookingHandler (DELETE /{bookingId})
  },
  
  // QR Code endpoints - Requires Operator token
  QR: {
    VALIDATE: '/api/qr/validate',      // → ValidateQRHandler
  },
};
