import React, { useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';

import SplashScreen from './features/auth/SplashScreen';
import LoginScreen from './features/auth/LoginScreen';
import ProfileSetupScreen from './features/student/ProfileSetupScreen';
import HomeDashboard from './features/student/HomeDashboard';
import ProfileScreen from './features/student/ProfileScreen';

// For type safety, we define the possible states of the app's navigation
type AppState = 'SPLASH' | 'AUTH' | 'PROFILE_SETUP' | 'DASHBOARD' | 'PROFILE_SCREEN';

const App = () => {
  const [appState, setAppState] = useState<AppState>('SPLASH');

  // --- Navigation Handlers ---
  const handleProceedToLogin = () => setAppState('AUTH');
  const handleLoginSuccess = () => setAppState('PROFILE_SETUP');
  const handleProfileComplete = () => setAppState('DASHBOARD');
  const handleGoToDashboard = () => setAppState('DASHBOARD');
  const handleGoToProfile = () => setAppState('PROFILE_SCREEN');

  // Helper function to render the current screen based on the state
  const renderScreen = () => {
    switch (appState) {
      case 'SPLASH':
        return <SplashScreen onProceed={handleProceedToLogin} />;
      case 'AUTH':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onGoToDashboard={handleGoToDashboard}
          />
        );
      case 'PROFILE_SETUP':
        return <ProfileSetupScreen onProfileComplete={handleProfileComplete} />;
      case 'DASHBOARD':
        return <HomeDashboard onGoToProfile={handleGoToProfile} />;
      case 'PROFILE_SCREEN':
        return <ProfileScreen onGoToDashboard={handleGoToDashboard} />;
      default:
        // Default to splash screen as a fallback
        return <SplashScreen onProceed={handleProceedToLogin} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;