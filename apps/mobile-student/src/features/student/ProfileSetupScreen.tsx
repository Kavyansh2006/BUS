import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Corrected path:
// From: '../../assets/images/profile-setup.svg' (Incorrect, only two levels up)
// To: '../../../assets/images/profile-setup.svg' (Three levels up: features, student, src)
import profileSetupIllustration from '../../assets/images/profile-setup.svg';

interface ProfileSetupScreenProps {
  onProfileComplete: () => void;
}

const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({ onProfileComplete }) => {
  // State for each input field
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [hostel, setHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [parentMobile, setParentMobile] = useState('');

  const handleSubmit = () => {
    // Simple validation to check if all fields are filled
    if (!name || !rollNumber || !hostel || !roomNumber || !studentMobile || !parentMobile) {
      Alert.alert('Incomplete Form', 'Please fill in all the details.');
      return;
    }
    
    // In a real app, you would save the data here.
    Alert.alert('Profile Submitted', 'Your details have been saved successfully!');
    
    // Call the function to move to the next screen
    onProfileComplete();
  };

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Image
              source={profileSetupIllustration}
              style={styles.illustration}
              resizeMode="contain"
            />
            <Text style={styles.heading}>Complete Your Profile</Text>
            <Text style={styles.subHeading}>Please fill in your details to continue.</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Student Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#A0AEC0"
              />
              <TextInput
                style={styles.input}
                placeholder="Roll Number"
                value={rollNumber}
                onChangeText={setRollNumber}
                placeholderTextColor="#A0AEC0"
              />
              <TextInput
                style={styles.input}
                placeholder="Hostel Name"
                value={hostel}
                onChangeText={setHostel}
                placeholderTextColor="#A0AEC0"
              />
              <TextInput
                style={styles.input}
                placeholder="Room Number"
                value={roomNumber}
                onChangeText={setRoomNumber}
                keyboardType="numeric"
                placeholderTextColor="#A0AEC0"
              />
              <TextInput
                style={styles.input}
                placeholder="Student Mobile Number"
                value={studentMobile}
                onChangeText={setStudentMobile}
                keyboardType="phone-pad"
                placeholderTextColor="#A0AEC0"
              />
              <TextInput
                style={styles.input}
                placeholder="Parent Mobile Number"
                value={parentMobile}
                onChangeText={setParentMobile}
                keyboardType="phone-pad"
                placeholderTextColor="#A0AEC0"
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save & Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 16,
    width: '100%',
    maxWidth: 450,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    // Shadow for Android
    elevation: 10,
  },
  illustration: {
    width: '60%',
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 8,
    marginBottom: 15,
    color: '#2D3748',
  },
  button: {
    marginTop: 15,
    paddingVertical: 14,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default ProfileSetupScreen;