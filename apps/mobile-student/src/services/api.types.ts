// TypeScript interfaces for API requests and responses

// Auth Types
export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  room: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

// Trip Types
export interface Trip {
  tripId: string;
  route: 'CAMPUS_TO_CITY' | 'CITY_TO_CAMPUS';
  tripDate: string; // YYYY-MM-DD
  departureTime: string; // HH:mm
  capacity: number;
  facultyReserved: number;
  bookedCount: number;
  waitlistCount: number;
  status: 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
  availableSeats?: number;
}

export interface GetTripsRequest {
  route: 'CAMPUS_TO_CITY' | 'CITY_TO_CAMPUS';
  tripDate: string; // YYYY-MM-DD
}

// Booking Types
export interface BookTripRequest {
  tripId: string;
}

export interface BookingResponse {
  bookingId: string;
  tripId: string;
  status: 'CONFIRMED' | 'WAITLIST';
  waitlistPosition?: number;
  qrToken?: string;
  message: string;
}

export interface CancelBookingRequest {
  bookingId: string;
}

// API Error Response
export interface ApiError {
  message: string;
  statusCode?: number;
}
