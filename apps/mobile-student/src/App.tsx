import React, { useState } from 'react';

import SplashScreen from './features/auth/SplashScreen';
import LoginScreen from './features/auth/LoginScreen';
import ProfileSetupScreen from './features/student/ProfileSetupScreen';
import HomeDashboard from './features/student/HomeDashboard';
import ProfileScreen from './features/student/ProfileScreen';
import BookingConfirmation from './features/student/BookingConfirmation';
import TripHistoryScreen from './features/student/TripHistoryScreen';
import MyTripScreen from './features/student/MyTripScreen'; // Import MyTripScreen
import FeedbackFormScreen from './features/student/FeedbackFormScreen'; // Import FeedbackFormScreen

interface TripDetails {
  time: string;
  date: string;
  route: 'Campus to City' | 'City to Campus';
}

// Add MY_TRIP and FEEDBACK_FORM to the AppState type
type AppState = 'SPLASH' | 'AUTH' | 'PROFILE_SETUP' | 'DASHBOARD' | 'PROFILE_SCREEN' | 'BOOKING_CONFIRMATION' | 'TRIP_HISTORY' | 'MY_TRIP' | 'FEEDBACK_FORM';

function App() {
  const [appState, setAppState] = useState<AppState>('SPLASH');
  const [bookedTripDetails, setBookedTripDetails] = useState<TripDetails | null>(null);

  const handleProceedToLogin = () => setAppState('AUTH');
  const handleLoginSuccess = () => setAppState('PROFILE_SETUP');
  const handleProfileComplete = () => setAppState('DASHBOARD');
  const handleGoToDashboard = () => setAppState('DASHBOARD');
  const handleGoToProfile = () => setAppState('PROFILE_SCREEN');
  const handleLogout = () => setAppState('AUTH');

  const handleBookingSuccess = (tripDetails: TripDetails) => {
    setBookedTripDetails(tripDetails);
    setAppState('BOOKING_CONFIRMATION');
  };

  const handleGoToTripHistory = () => {
    setAppState('TRIP_HISTORY');
  };

  // Add handler for My Active Trip screen
  const handleGoToMyTrip = () => {
    setAppState('MY_TRIP');
  };

  // Add handler for Feedback Form screen
  const handleGoToFeedback = () => {
    setAppState('FEEDBACK_FORM');
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
    // Pass the new handlers to the HomeDashboard
    return (
      <HomeDashboard
        onGoToProfile={handleGoToProfile}
        onBookTrip={handleBookingSuccess}
        onGoToMyTrip={handleGoToMyTrip}
        onGoToTripHistory={handleGoToTripHistory}
        onGoToFeedback={handleGoToFeedback}
      />
    );
  }

  if (appState === 'PROFILE_SCREEN') {
    return <ProfileScreen onGoToDashboard={handleGoToDashboard} onLogout={handleLogout} />;
  }

 if (appState === 'TRIP_HISTORY') {
   return <TripHistoryScreen onGoBack={handleGoToDashboard} />;
 }

  // Add rendering logic for the new screens
  if (appState === 'MY_TRIP') {
    return <MyTripScreen onGoBack={handleGoToDashboard} />;
  }

  if (appState === 'FEEDBACK_FORM') {
    return <FeedbackFormScreen onGoBack={handleGoToDashboard} />;
  }

  if (appState === 'BOOKING_CONFIRMATION' && bookedTripDetails) {
    return <BookingConfirmation tripDetails={bookedTripDetails} onGoToDashboard={handleGoToDashboard} />;
  }

  return <SplashScreen onProceed={handleProceedToLogin} />;
}

export default App;