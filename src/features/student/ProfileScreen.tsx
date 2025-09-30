import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// React Native uses specific libraries for icons, 'react-native-vector-icons' is a popular choice.
// Make sure to install and link it in your project.
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

// Hardcoded data matching the fields from ProfileSetupScreen
const userData = {
  studentName: 'kavyansh mittal',
  rollNumber: '24ucs113',
  hostelName: 'BH-1',
  roomNumber: 'E-106',
  studentMobile: '+91 98765 43210',
  parentMobile: '+91 87654 32109',
  penaltyStatus: 'No Dues',
  statusColor: '#28a745', // Green for 'No Dues'
};

interface ProfileScreenProps {
  onGoToDashboard: () => void;
}

// Helper component for displaying rows of info
const InfoRow = ({ label, value, valueColor = '#1a202c' }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoRowLabel}>{label}</Text>
    <Text style={[styles.infoRowValue, { color: valueColor }]}>{value}</Text>
  </View>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onGoToDashboard }) => {
  return (
    <SafeAreaView style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoToDashboard}>
          <Icon name="chevron-left" size={20} color="#4a5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView>
        <View style={styles.mainContent}>
          {/* Personal Details Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="user" size={16} style={styles.cardHeaderIcon} />
              <Text style={styles.cardHeaderTitle}>Personal Details</Text>
            </View>
            <InfoRow label="Student Name" value={userData.studentName} />
            <InfoRow label="Roll Number" value={userData.rollNumber} />
          </View>

          {/* Campus Details Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="university" size={16} style={styles.cardHeaderIcon} />
              <Text style={styles.cardHeaderTitle}>Campus Details</Text>
            </View>
            <InfoRow label="Hostel Name" value={userData.hostelName} />
            <InfoRow label="Room Number" value={userData.roomNumber} />
          </View>

          {/* Contact Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="phone" size={16} style={styles.cardHeaderIcon} />
              <Text style={styles.cardHeaderTitle}>Contact Information</Text>
            </View>
            <InfoRow label="Student Mobile" value={userData.studentMobile} />
            <InfoRow label="Parent Mobile" value={userData.parentMobile} />
          </View>

          {/* Penalty Status Card */}
           <View style={styles.card}>
            <View style={styles.cardHeader}>
               <Icon name="warning" size={16} style={styles.cardHeaderIcon} />
               <Text style={styles.cardHeaderTitle}>Penalty Status</Text>
            </View>
            <InfoRow
              label="Current Status"
              value={userData.penaltyStatus}
              valueColor={userData.statusColor}
            />
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <FeatherIcon name="log-out" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7f8fc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a202c',
  },
  mainContent: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  cardHeaderIcon: {
    marginRight: 10,
    color: '#007bff',
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoRowLabel: {
    color: '#6c757d',
    fontSize: 14,
  },
  infoRowValue: {
    fontWeight: '600',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;