// Booking Service
// Connects to: BookTripHandler, CancelBookingHandler

import apiClient from './api.client';
import { API_ENDPOINTS } from './api.config';
import { BookTripRequest, BookingResponse, CancelBookingRequest } from './api.types';

class BookingService {
  // Book a trip
  // → POST /api/bookings → BookTripHandler
  async bookTrip(tripId: string): Promise<BookingResponse> {
    const request: BookTripRequest = { tripId };
    
    const response = await apiClient.post<BookingResponse>(
      API_ENDPOINTS.BOOKINGS.CREATE,
      request,
      true // Requires authentication
    );

    return response;
  }

  // Cancel a booking
  // → DELETE /api/bookings/{bookingId} → CancelBookingHandler
  async cancelBooking(bookingId: string): Promise<{ message: string }> {
    const endpoint = `${API_ENDPOINTS.BOOKINGS.CANCEL}/${bookingId}`;
    
    const response = await apiClient.delete<{ message: string }>(
      endpoint,
      true // Requires authentication
    );

    return response;
  }
}

export default new BookingService();
