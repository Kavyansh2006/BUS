import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert, // Use Alert for submission feedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// 1. IMPORT THE MODAL AND ITS REQUIRED TYPES
import ReportingModal, { ReportableStudent, ReportData } from './ReportingModal';

// --- TYPE DEFINITIONS ---
interface Passenger {
  id: string;
  name: string;
  status: 'Boarded' | 'Not Boarded';
}

// Mock data to simulate fetching a passenger list for a trip
const MOCK_PASSENGERS: Passenger[] = [
  { id: 'STU101', name: 'Alice Johnson', status: 'Boarded' },
  { id: 'STU102', name: 'Bob Williams', status: 'Boarded' },
  { id: 'STU103', name: 'Charlie Brown', status: 'Not Boarded' },
  { id: 'STU104', name: 'Diana Miller', status: 'Boarded' },
  { id: 'STU105', name: 'Ethan Davis', status: 'Not Boarded' },
  { id: 'STU106', name: 'Fiona Garcia', status: 'Not Boarded' },
];

// --- COMPONENT ---
const PassengerListScreen = ({ navigation, route }) => {
  const { tripId } = route.params; // Get tripId passed from ScannerScreen

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. ADD STATE TO MANAGE THE REPORTING MODAL
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [studentToReport, setStudentToReport] = useState<ReportableStudent | null>(null);

  // Fetch passenger data when the screen loads
  useEffect(() => {
    // Simulate an API call to get the list
    setTimeout(() => {
      setPassengers(MOCK_PASSENGERS);
      setIsLoading(false);
    }, 800);
  }, [tripId]);

  /**
   * 3. CREATE HANDLER FUNCTIONS FOR THE MODAL
   */

  // Opens the modal with the data of the selected student.
  const handleOpenReportModal = (passenger: Passenger) => {
    setStudentToReport({ id: passenger.id, name: passenger.name });
    setReportModalVisible(true);
  };

  // Handles the final submission of the report.
  const handleReportSubmit = (data: ReportData) => {
    console.log('Submitting report from Passenger List:', data);
    // In a real application, this is where you would make an API call to your backend.

    // Provide feedback to the user
    Alert.alert(
      'Report Submitted',
      `Your report for ${data.studentName} has been sent successfully.`
    );

    // The modal closes itself, so no need to set visibility to false here.
  };

  // Render each passenger item in the list
  const renderPassengerItem = ({ item }: { item: Passenger }) => (
    // Tapping this TouchableOpacity will open the report modal for this student
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleOpenReportModal(item)}>
      <Icon
        name={item.status === 'Boarded' ? 'check-circle' : 'times-circle'}
        solid // Use solid icons for better visibility
        color={item.status === 'Boarded' ? '#38A169' : '#A0AEC0'}
        size={24}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemId}>ID: {item.id}</Text>
      </View>
      {/* A visual cue to indicate the row is tappable */}
      <Icon name="chevron-right" size={16} color="#CBD5E0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#1a202c" />
        </TouchableOpacity>
        <Text style={styles.title}>Passenger List</Text>
        <View style={{ width: 40 }} /> {/* Spacer to keep title centered */}
      </View>
      <Text style={styles.subHeader}>Trip ID: {tripId}</Text>

      {/* List Content */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#38A169" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={passengers}
          renderItem={renderPassengerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* 4. RENDER THE MODAL COMPONENT */}
      {/* It remains hidden until isReportModalVisible becomes true */}
      <ReportingModal
        visible={isReportModalVisible}
        student={studentToReport}
        onClose={() => setReportModalVisible(false)} // This allows the modal to be closed
        onSubmit={handleReportSubmit} // This handles the final submission
      />
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: { padding: 4 },
  title: { fontSize: 22, fontWeight: '700', color: '#1a202c' },
  subHeader: {
    fontSize: 14,
    color: '#718096',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  listContent: { paddingHorizontal: 16, paddingTop: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemDetails: { flex: 1, marginLeft: 16 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#2D3748' },
  itemId: { fontSize: 12, color: '#718096', marginTop: 2 },
});

export default PassengerListScreen;