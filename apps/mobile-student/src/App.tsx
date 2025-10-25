// apps/mobile-student/src/App.tsx

import React, { useState } from 'react';
// Import Alert from react-native
import { Alert } from 'react-native';

import SplashScreen from './features/auth/SplashScreen';
import LoginScreen from './features/auth/LoginScreen';
import ProfileSetupScreen from './features/student/ProfileSetupScreen';
import HomeDashboard from './features/student/HomeDashboard';
import ProfileScreen from './features/student/ProfileScreen';
import BookingConfirmation from './features/student/BookingConfirmation';
import TripHistoryScreen from './features/student/TripHistoryScreen';
import MyTripScreen from './features/student/MyTripScreen';
import FeedbackFormScreen from './features/student/FeedbackFormScreen';
import CancellationSuccessScreen from './features/student/CancellationSuccessScreen';

interface TripDetails {
  time: string;
  date: string;
  route: 'Campus to City' | 'City to Campus';
  isWaitlist?: boolean;
}

type AppState = 'SPLASH' | 'AUTH' | 'PROFILE_SETUP' | 'DASHBOARD' | 'PROFILE_SCREEN' | 'BOOKING_CONFIRMATION' | 'TRIP_HISTORY' | 'MY_TRIP' | 'FEEDBACK_FORM' | 'CANCELLATION_SUCCESS';

function App() {
  // This is the new code for debugging
  const [appState, setAppState] = useState<AppState>('SPLASH'); // Starts the app on the trip screen

  // Starts the app with a pre-booked trip for testing
  const [bookedTripDetails, setBookedTripDetails] = useState<TripDetails | null>({
    time: '5:30 PM',
    date: 'October 10, 2025',
    route: 'Campus to City',
    busNumber: 'DL1PC1234', // Make sure to include a bus number
  });

  const handleProceedToLogin = () => setAppState('AUTH');
  const handleLoginSuccess = () => setAppState('PROFILE_SETUP');
  const handleProfileComplete = () => setAppState('DASHBOARD');
  const handleGoToDashboard = () => setAppState('DASHBOARD');
  const handleGoToProfile = () => setAppState('PROFILE_SCREEN');
  const handleLogout = () => setAppState('AUTH');

  const handleBookingSuccess = (tripDetails: TripDetails) => {
    // This function now handles both booking and waitlisting
    setBookedTripDetails(tripDetails);
    setAppState('BOOKING_CONFIRMATION');
  };

  const handleGoToTripHistory = () => {
    setAppState('TRIP_HISTORY');
  };

  const handleGoToMyTrip = () => {
    // Removed the conditional logic.
    // The app will now always navigate to the MyTripScreen.
    setAppState('MY_TRIP');
  };

  const handleGoToFeedback = () => {
    setAppState('FEEDBACK_FORM');
  };

  const handleTripCancellation = () => {
    setBookedTripDetails(null);
    setAppState('CANCELLATION_SUCCESS');
  };

  if (appState === 'SPLASH') {
    return <SplashScreen onProceed={handleProceedToLogin} />;
  }

  if (appState === 'AUTH') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToDashboard={handleGoToDashboard} />;
  }

  if (appState === 'PROFILE_SETUP') {
    return <ProfileSetupScreen onProfileComplete={handleProfileComplete} />;
  }

  if (appState === 'DASHBOARD') {
    return (
      <HomeDashboard
        onGoToProfile={handleGoToProfile}
        onBookTrip={handleBookingSuccess}
        onGoToMyTrip={handleGoToMyTrip}
        onGoToTripHistory={handleGoToTripHistory}
        onGoToFeedback={handleGoToFeedback}
        onLogout={handleLogout}
      />
    );
  }

  if (appState === 'PROFILE_SCREEN') {
    return <ProfileScreen onGoToDashboard={handleGoToDashboard} onLogout={handleLogout} />;
  }

  if (appState === 'TRIP_HISTORY') {
    return <TripHistoryScreen onGoBack={handleGoToDashboard} />;
  }

  if (appState === 'MY_TRIP') {
    // Pass the bookedTripDetails to the MyTripScreen component
    return <MyTripScreen
              bookedTrip={bookedTripDetails}
              onGoBack={handleGoToDashboard}
              onCancelTrip={handleTripCancellation}
           />;
  }

  if (appState === 'FEEDBACK_FORM') {
    return <FeedbackFormScreen onGoBack={handleGoToDashboard} />;
  }

  if (appState === 'CANCELLATION_SUCCESS') {
    return <CancellationSuccessScreen onGoToDashboard={handleGoToDashboard} />;
  }

  if (appState === 'BOOKING_CONFIRMATION' && bookedTripDetails) {
    return <BookingConfirmation tripDetails={bookedTripDetails} onGoToDashboard={handleGoToDashboard} />;
  }

  return <SplashScreen onProceed={handleProceedToLogin} />;
}

export default App;