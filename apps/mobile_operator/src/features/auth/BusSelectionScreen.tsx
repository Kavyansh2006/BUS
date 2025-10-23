import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Define Trip type
interface Trip {
  id: string;
  time: string;
  busNumber: string;
  route: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

interface BusSelectionScreenProps {
  onStartScanning: (tripId: string) => void;
  onLogout: () => void;
}

// Mocked Trip Data
const mockTrips: Trip[] = [
  { id: 'T401', time: '6:30 PM', busNumber: 'Bus #05', route: 'Campus → City', status: 'Upcoming' },
  { id: 'T402', time: '7:00 PM', busNumber: 'Bus #12', route: 'City → Campus', status: 'Active' },
  { id: 'T403', time: '8:00 PM', busNumber: 'Bus #03', route: 'Campus → West', status: 'Upcoming' },
  { id: 'T404', time: '5:00 PM', busNumber: 'Bus #01', route: 'Completed', status: 'Completed' },
];

const BusSelectionScreen: React.FC<BusSelectionScreenProps> = ({
  onStartScanning,
  onLogout,
}) => {
  const [availableTrips, setAvailableTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Simulate API call
    const loadTrips = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (isMounted) {
          setAvailableTrips(mockTrips.filter(t => t.status !== 'Completed'));
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTrips();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStartShift = () => {
    if (selectedTrip) {
      setShowConfirmModal(true);
    } else {
      setShowErrorModal(true);
    }
  };

  const confirmStartShift = () => {
    if (selectedTrip) {
      setShowConfirmModal(false);
      onStartScanning(selectedTrip.id);
    }
  };

  const getIconColor = (item: Trip): string => {
    if (item.status === 'Active') {
      return '#ECC94B'; // Yellow for active
    }
    if (selectedTrip?.id === item.id) {
      return '#FFFFFF'; // White for selected
    }
    return '#38A169'; // Green for default
  };

  const getTextColor = (item: Trip, isPrimary: boolean): string => {
    if (selectedTrip?.id === item.id) {
      return isPrimary ? '#FFFFFF' : '#EBF4FF';
    }
    if (item.status === 'Active') {
      return isPrimary ? '#1a202c' : '#4A5568';
    }
    return isPrimary ? '#1a202c' : '#4A5568';
  };

  const renderTripItem = ({ item }: { item: Trip }) => {
    const isActive = item.status === 'Active';
    const isSelected = selectedTrip?.id === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.tripItem,
          isSelected && styles.selectedTripItem,
          isActive && styles.activeTripItem,
        ]}
        onPress={() => setSelectedTrip(item)}
        activeOpacity={0.7}
      >
        <Icon
          name="bus"
          size={24}
          color={getIconColor(item)}
          style={styles.tripIcon}
        />
        <View style={styles.tripDetails}>
          <Text
            style={[
              styles.tripTime,
              { color: getTextColor(item, true) }
            ]}
          >
            {item.time}
          </Text>
          <Text
            style={[
              styles.tripRoute,
              { color: getTextColor(item, false) }
            ]}
          >
            {item.busNumber} | {item.route}
          </Text>
        </View>
        {isActive && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>IN PROGRESS</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Trip</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Icon name="sign-out-alt" size={20} color="#D9534F" />
        </TouchableOpacity>
      </View>

      <Text style={styles.instructionText}>
        Select a current or upcoming trip to associate this device for scanning.
      </Text>

      <View style={styles.listContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#38A169" />
        ) : availableTrips.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming trips found.</Text>
        ) : (
          <FlatList
            data={availableTrips}
            renderItem={renderTripItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            extraData={selectedTrip}
          />
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.startButton,
          !selectedTrip && styles.startButtonDisabled,
        ]}
        onPress={handleStartShift}
        disabled={!selectedTrip}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>
          {selectedTrip ? `Start Scanning: ${selectedTrip.busNumber}` : 'Select a Trip'}
        </Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Shift Start</Text>
            <Text style={styles.modalText}>
              Starting trip {selectedTrip?.id} on {selectedTrip?.route}.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmStartShift}
              >
                <Text style={styles.confirmButtonText}>Start Scanning</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal
        visible={showErrorModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selection Required</Text>
            <Text style={styles.modalText}>
              Please select a trip before starting.
            </Text>
            <Pressable
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.confirmButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf4ff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a202c',
  },
  logoutButton: {
    padding: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  selectedTripItem: {
    backgroundColor: '#38A169',
    borderColor: '#1A4D2E',
  },
  activeTripItem: {
    backgroundColor: '#FFECB3',
    borderColor: '#ECC94B',
  },
  tripIcon: {
    marginRight: 15,
  },
  tripDetails: {
    flex: 1,
  },
  tripTime: {
    fontSize: 18,
    fontWeight: '700',
  },
  tripRoute: {
    fontSize: 14,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#ECC94B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusBadgeText: {
    color: '#38A169',
    fontSize: 12,
    fontWeight: 'bold',
  },
  startButton: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 15,
    backgroundColor: '#38A169',
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#718096',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E2E8F0',
  },
  confirmButton: {
    backgroundColor: '#38A169',
  },
  cancelButtonText: {
    color: '#4A5568',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default BusSelectionScreen;

