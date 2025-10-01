import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

// Import a Google icon from a React Native icon library
// Make sure you have 'react-native-vector-icons' installed and linked
import Icon from 'react-native-vector-icons/FontAwesome';

// Import local images using the 'require' syntax
import collegeLogo from '../../assets/images/collegeLogo.png';
// NOTE: React Native doesn't support SVG out of the box.
// You'll need to convert this to a PNG or use a library like 'react-native-svg'.
// Assuming it's been converted to 'login-illustration.png' for this example.
import loginIllustration from '../../assets/images/login-illustration.svg';


interface LoginScreenProps {
  onLoginSuccess: () => void;
  onGoToDashboard: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToDashboard }) => {
  const handleLoginClick = () => {
    Alert.alert('Login successful!', 'Proceeding to profile setup.');
    onLoginSuccess();
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.card}>
        <Image source={collegeLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.welcomeHeading}>WELCOME</Text>
        <Image
          source={loginIllustration}
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.subheading}>Get on Board</Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLoginClick}>
          <View style={styles.googleIconContainer}>
            <Icon name="google" size={20} color="#4285F4" />
          </View>
          <Text style={styles.loginButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.devButtonsContainer}>
          <TouchableOpacity style={styles.devButton} onPress={onLoginSuccess}>
            <Text style={styles.devButtonText}>(Dev: Go to Profile Setup)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.devButton} onPress={onGoToDashboard}>
            <Text style={styles.devButtonText}>(Dev: Go to Dashboard)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    // Shadow for Android
    elevation: 10,
  },
  logo: {
    height: 45,
    width: '50%',
    marginBottom: 40,
  },
  welcomeHeading: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 20,
  },
  illustration: {
    width: '80%',
    height: 200, // Fixed height for illustration
    marginBottom: 40,
  },
  subheading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 30,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 340,
    paddingVertical: 12,
    backgroundColor: '#4285F4',
    borderRadius: 9999, // Full pill shape
    // Shadow for iOS
    shadowColor: 'rgba(0, 118, 255, 0.39)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    // Shadow for Android
    elevation: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  googleIconContainer: {
    marginRight: 12,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 9999,
  },
  devButtonsContainer: {
    marginTop: 20,
    gap: 10,
    width: '100%',
    maxWidth: 340,
  },
  devButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#6c757d',
    borderRadius: 6,
    alignItems: 'center',
  },
  devButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default LoginScreen;