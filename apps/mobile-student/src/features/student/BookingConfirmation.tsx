import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- PROPS INTERFACE ---
interface BookingConfirmationProps {
  tripDetails: {
    time: string;
    date: string; // e.g., "October 8"
    route: 'Campus to City' | 'City to Campus';
  };
  onGoToDashboard: () => void;
}

// --- MAIN COMPONENT ---
const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ tripDetails, onGoToDashboard }) => {
  return (
    // Converted from a page to a Modal component
    <Modal
      transparent
      visible={true}
      onRequestClose={onGoToDashboard}
      animationType="fade"
    >
      {/* Translucent overlay */}
      <View style={styles.overlay}>
        {/* White container for the modal content */}
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Icon name="checkmark-circle" size={100} color="#28a745" />
          </View>

          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>Your seat has been successfully reserved.</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsHeader}>TRIP DETAILS</Text>
            <View style={styles.detailRow}>
              <Icon name="navigate-circle-outline" size={20} color="#4A5568" style={styles.detailIcon} />
              <Text style={styles.detailText}>{tripDetails.route}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="calendar-outline" size={20} color="#4A5568" style={styles.detailIcon} />
              <Text style={styles.detailText}>{tripDetails.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="time-outline" size={20} color="#4A5568" style={styles.detailIcon} />
              <Text style={styles.detailText}>{tripDetails.time}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={onGoToDashboard}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  // Style for the translucent background overlay
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // This is the white card that holds the modal content
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    // Shadow for Android
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30,
  },
  detailsContainer: {
    backgroundColor: '#f7f8fc',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  detailsHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0AEC0',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#2D3748',
  },
  doneButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default BookingConfirmation;