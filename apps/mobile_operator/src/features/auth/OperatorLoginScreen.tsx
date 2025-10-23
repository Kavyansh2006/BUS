import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import the icon library
import Icon from 'react-native-vector-icons/FontAwesome';

// CORRECTED RELATIVE PATHS
import operatorLogo from '../../assets/images/operatorLogo.png';
import busStopIcon from '../../assets/images/busStopIcon.png';


interface OperatorLoginScreenProps {
  onLoginSuccess: () => void;
  onGoToDashboard: () => void;
}

const OperatorLoginScreen: React.FC<OperatorLoginScreenProps> = ({
  onLoginSuccess,
  onGoToDashboard,
}) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    // Basic validation (replace with actual auth logic)
    if (employeeId === 'op101' && password === 'buspass') {
      Alert.alert('Login successful!', 'Welcome, Bus Operator.');
      onLoginSuccess();
    } else {
      setPassword('');
      Alert.alert('Login failed', 'Invalid Employee ID or Password.');
    }
  };

  return (
    // We only need the SafeAreaView, as the root background is managed by AppNavigator/SplashScreen
    <SafeAreaView style={styles.page}>
      <View style={styles.card}>
        {/* Logo/Branding */}
        <Image source={operatorLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.welcomeHeading}>OPERATOR LOGIN</Text>

        {/* Main Illustration/Icon */}
        <Image
          source={busStopIcon}
          style={styles.busIcon} // Changed to busIcon for consistency with student screen styles
          resizeMode="contain"
        />

        <Text style={styles.subheading}>Ready for the Route</Text>

        {/* Manual Sign-In Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Icon name="user" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Employee ID"
              placeholderTextColor="#9CA3AF"
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="none"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <View style={styles.inputGroup}>
            <Icon name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginClick}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Development/Navigation Buttons */}
        <View style={styles.devButtonsContainer}>
          <TouchableOpacity style={styles.devButton} onPress={onLoginSuccess}>
            <Text style={styles.devButtonText}>(Dev: Skip Login)</Text>
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
  // *** REMOVED rootBackground STYLE ***

  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebf4ff', // Light background color for this view
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    // Shadow (using operator theme)
    shadowColor: '#1A4D2E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  logo: {
    height: 80,
    width: '60%',
    marginBottom: 30,
  },
  welcomeHeading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1a202c',
    marginBottom: 10,
  },
  busIcon: { // Renamed from mainIcon to match student's key
    width: 180,
    height: 130,
    marginBottom: 30,
    marginTop: 10,
    zIndex: 1,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    color: '#1A202C',
    fontSize: 16,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 340,
    paddingVertical: 14,
    backgroundColor: '#38A169',
    borderRadius: 8,
    shadowColor: 'rgba(56, 161, 105, 0.4)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  devButtonsContainer: {
    marginTop: 20,
    gap: 10,
    width: '100%',
    maxWidth: 340,
  },
  devButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#A0AEC0',
    borderRadius: 6,
    alignItems: 'center',
  },
  devButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default OperatorLoginScreen;
