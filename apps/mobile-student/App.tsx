import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from 'react-native';

import * as Font from 'expo-font';

import { Ionicons } from '@expo/vector-icons';

// Import the App component we created from the src folder
import AppNavigator from './src/App';

function App(): React.JSX.Element {
  // 1. State to track if loading is complete
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 2. Load the fonts when the component mounts
  useEffect(() => {
    async function loadAssets() {
      try {
        // Load the standard icon fonts used by @expo/vector-icons
        await Font.loadAsync({
          ...Ionicons.font, // This loads the common icon fonts (MaterialIcons, FontAwesome, etc.)
          // Add any custom fonts here if you have them:
          // 'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e); // Log any error
      } finally {
        // Set state to true when loading is done
        setFontsLoaded(true);
      }
    }
    loadAssets();
  }, []); // Run only once on mount

  // 3. Render a loading screen if fonts are not yet loaded
  if (!fontsLoaded) {
    // You can replace this with a prettier loading screen/splash screen
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading App...</Text>
      </View>
    );
  }

  // 4. Render the main app once fonts are ready
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {/* Render our app's navigation and logic */}
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;