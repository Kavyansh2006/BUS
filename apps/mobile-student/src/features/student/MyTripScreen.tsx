import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock data for an active trip
const activeTrip = {
  route: 'Campus to City',
  date: 'October 8, 2025',
  time: '5:30 PM',
  busNumber: 'DL1PC1234',
  qrCodeUrl: 'https://placehold.co/300x300/png?text=Scan+Me', // Placeholder for QR code
};

interface MyTripScreenProps {
  onGoBack: () => void;
}

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const MyTripScreen: React.FC<MyTripScreenProps> = ({ onGoBack }) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Icon name="chevron-back" size={24} color="#4a5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Active Trip</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.qrCard}>
          <Text style={styles.qrHeader}>Scan for Boarding</Text>
          <Image source={{ uri: activeTrip.qrCodeUrl }} style={styles.qrCode} />
        </View>

        <View style={styles.detailsCard}>
            <Text style={styles.detailsHeader}>TRIP DETAILS</Text>
            <InfoRow label="Route" value={activeTrip.route} />
            <InfoRow label="Date" value={activeTrip.date} />
            <InfoRow label="Time" value={activeTrip.time} />
            <InfoRow label="Bus Number" value={activeTrip.busNumber} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f7f8fc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: { padding: 5, marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#1a202c' },
  content: { padding: 20, alignItems: 'center' },
  qrCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: 25,
    elevation: 3,
  },
  qrHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 20,
  },
  qrCode: { width: 250, height: 250 },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 3,
  },
  detailsHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0AEC0',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: { fontSize: 16, color: '#6c757d' },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#1a202c' },
});

export default MyTripScreen;