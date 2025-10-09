import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BookingModal from './BookingModal';
// The Sidebar import is correct relative to src/features/student/
import Sidebar from '../../components/layout/Sidebar';
import Icon from 'react-native-vector-icons/Ionicons';

// --- MOCK DATA ---
const mockData = {
  campusToCity: {
    today: [
      { id: 1, time: '5:30 PM', availableSeats: 15, totalSeats: 35, status: 'Booking Open' },
      { id: 2, time: '6:00 PM', availableSeats: 5, totalSeats: 35, status: 'Booking Open' },
      { id: 3, time: '6:30 PM', availableSeats: 0, totalSeats: 35, status: 'Bus Full' },
    ],
    tomorrow: [
      { id: 4, time: '9:00 AM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon' },
      { id: 5, time: '5:30 PM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon' },
    ],
  },
  cityToCampus: {
    today: [
      { id: 6, time: '8:00 AM', availableSeats: 10, totalSeats: 35, status: 'Booking Open' },
      { id: 7, time: '8:30 AM', availableSeats: 0, totalSeats: 35, status: 'Bus Full' },
    ],
    tomorrow: [
      { id: 8, time: '8:00 AM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon' },
      { id: 9, time: '6:00 PM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon' },
    ],
  },
};

// --- Header Component ---
const Header = ({ onMenuClick, onProfileClick }) => (
  <View style={styles.header}>
    {/* This button triggers the function to open the sidebar */}
    <TouchableOpacity onPress={onMenuClick}>
      <Icon name="menu" size={32} color="#007bff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Campus Connect</Text>
    <TouchableOpacity onPress={onProfileClick}>
      <Icon name="person-circle-outline" size={32} color="#007bff" />
    </TouchableOpacity>
  </View>
);

const TripCard = ({ time, availableSeats, totalSeats, status, onPress }) => {
  const isBusFull = status === 'Bus Full';
  const isBookingSoon = status === 'Booking Opens Soon';
  const isActionable = status === 'Booking Open';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!isActionable}
      activeOpacity={isActionable ? 0.7 : 1.0}
    >
      <View>
        <Text style={styles.cardTime}>{time}</Text>
        <Text style={styles.cardSeats}>
          {availableSeats} / {totalSeats} seats available
        </Text>
      </View>
      <View style={[
          styles.statusBadge,
          isBusFull && styles.statusBadgeFull,
          isBookingSoon && styles.statusBadgeSoon
      ]}>
        <Text style={styles.statusBadgeText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Props Interface ---
interface HomeDashboardProps {
  onGoToProfile: () => void;
  onBookTrip: (tripDetails: any) => void;
  onGoToMyTrip: () => void;
  onGoToTripHistory: () => void;
  onGoToFeedback: () => void;
  onLogout: () => void; // <--- ADDED LOGOUT PROP
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onGoToProfile,
  onBookTrip,
  onGoToMyTrip,
  onGoToTripHistory,
  onGoToFeedback,
  onLogout, // <--- DESTRUCTURED LOGOUT PROP
}) => {
  const [activeRoute, setActiveRoute] = useState('campusToCity');
  const [activeDate, setActiveDate] = useState('today');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  // This state controls if the sidebar is open or closed
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date, options) => {
    return date.toLocaleDateString('en-US', options);
  };

  const handleBookTrip = (trip) => {
    if (trip.status !== 'Booking Open') return;
    const routeText = activeRoute === 'campusToCity' ? 'Campus to City' : 'City to Campus';
    const dateText = activeDate === 'today'
      ? formatDate(today, { month: 'long', day: 'numeric' })
      : formatDate(tomorrow, { month: 'long', day: 'numeric' });

    setSelectedTrip({ time: trip.time, date: dateText, route: routeText });
    setIsModalVisible(true);
  };

  const handleConfirmBooking = () => {
    if (selectedTrip) {
      onBookTrip(selectedTrip);
    }
    setIsModalVisible(false);
    setSelectedTrip(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedTrip(null);
  };

  const tripsToShow = mockData?.[activeRoute]?.[activeDate] || [];

  return (
    <SafeAreaView style={styles.page}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)} // Pass function to close sidebar
        onGoToMyTrip={onGoToMyTrip}
        onGoToTripHistory={onGoToTripHistory}
        onGoToFeedback={onGoToFeedback}
        onLogout={onLogout} // <--- PASSED LOGOUT PROP TO SIDEBAR
      />
      {/* Pass function to open the sidebar to the Header */}
      <Header
        onMenuClick={() => {
          console.log('Hamburger button was pressed!');
          setSidebarOpen(true);
        }}
        onProfileClick={onGoToProfile}
      />
      <ScrollView style={styles.content}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeRoute === 'campusToCity' && styles.activeTab]}
            onPress={() => setActiveRoute('campusToCity')}>
            <Text style={[styles.tabText, activeRoute === 'campusToCity' && styles.activeTabText]}>
              Campus → City
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeRoute === 'cityToCampus' && styles.activeTab]}
            onPress={() => setActiveRoute('cityToCampus')}>
            <Text style={[styles.tabText, activeRoute === 'cityToCampus' && styles.activeTabText]}>
              City → Campus
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={[styles.dateButton, activeDate === 'today' && styles.activeDateButton]}
            onPress={() => setActiveDate('today')}>
            <Text style={[styles.dateButtonText, activeDate === 'today' && styles.activeDateButtonText]}>
              Today (Oct 8)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateButton, activeDate === 'tomorrow' && styles.activeDateButton]}
            onPress={() => setActiveDate('tomorrow')}>
            <Text style={[styles.dateButtonText, activeDate === 'tomorrow' && styles.activeDateButtonText]}>
              Tomorrow (Oct 9)
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {tripsToShow.map(trip => (
            <TripCard
              key={trip.id}
              time={trip.time}
              availableSeats={trip.availableSeats}
              totalSeats={trip.totalSeats}
              status={trip.status}
              onPress={() => handleBookTrip(trip)}
            />
          ))}
        </View>
      </ScrollView>

      <BookingModal
        visible={isModalVisible}
        tripDetails={selectedTrip}
        onConfirm={handleConfirmBooking}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f7faff', // Lighter background
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f7faff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  tabText: {
    fontWeight: '600',
    color: '#6c757d',
    fontSize: 16,
  },
  activeTabText: {
    color: '#007bff',
  },
  dateSelector: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 25,
  },
  dateButton: {
    flex: 1,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  activeDateButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  activeDateButtonText: {
    color: 'white',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSeats: {
    fontSize: 14,
    color: '#6c757d',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#28a745',
  },
  statusBadgeFull: {
    backgroundColor: '#dc3545',
  },
  statusBadgeSoon: {
    backgroundColor: '#ffc107',
  },
  statusBadgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default HomeDashboard;