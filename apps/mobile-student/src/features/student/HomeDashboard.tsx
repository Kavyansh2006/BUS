// apps/mobile-student/src/features/student/HomeDashboard.tsx

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
import Sidebar from '../../components/layout/Sidebar';
import Icon from 'react-native-vector-icons/Ionicons';

// --- MOCK DATA ---
const mockData = {
  campusToCity: {
    today: [
      { id: 1, time: '5:30 PM', availableSeats: 15, totalSeats: 35, status: 'Booking Open', waitlistCount: 0 },
      { id: 2, time: '6:00 PM', availableSeats: 5, totalSeats: 35, status: 'Booking Open', waitlistCount: 0 },
      { id: 3, time: '6:30 PM', availableSeats: 0, totalSeats: 35, status: 'Bus Full', waitlistCount: 5 },
    ],
    tomorrow: [
      { id: 4, time: '9:00 AM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon', waitlistCount: 0 },
      { id: 5, time: '5:30 PM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon', waitlistCount: 0 },
    ],
  },
  cityToCampus: {
    today: [
      { id: 6, time: '8:00 AM', availableSeats: 10, totalSeats: 35, status: 'Booking Open', waitlistCount: 0 },
      { id: 7, time: '8:30 AM', availableSeats: 0, totalSeats: 35, status: 'Bus Full', waitlistCount: 8 },
    ],
    tomorrow: [
      { id: 8, time: '8:00 AM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon', waitlistCount: 0 },
      { id: 9, time: '6:00 PM', availableSeats: 35, totalSeats: 35, status: 'Booking Opens Soon', waitlistCount: 0 },
    ],
  },
};

// --- Header Component ---
const Header = ({ onMenuClick, onProfileClick }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onMenuClick}>
      <Icon name="menu" size={32} color="#007bff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Campus Connect</Text>
    <TouchableOpacity onPress={onProfileClick}>
      <Icon name="person-circle-outline" size={32} color="#007bff" />
    </TouchableOpacity>
  </View>
);

// --- TripCard Component ---
const TripCard = ({ time, availableSeats, totalSeats, status, waitlistCount, onPress }) => {
  const isBusFull = status === 'Bus Full';
  const isBookingSoon = status === 'Booking Opens Soon';
  const isActionable = status === 'Booking Open' || isBusFull;

  let badgeText = status;
  let badgeStyle = styles.statusBadge;

  if (isBusFull) {
    badgeText = 'Join Waitlist';
    badgeStyle = styles.statusBadgeWaitlist;
  } else if (isBookingSoon) {
    badgeText = 'Booking Soon';
    badgeStyle = styles.statusBadgeSoon;
  }

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
          {isBusFull
            ? `${waitlistCount} students on waitlist`
            : `${availableSeats} / ${totalSeats} seats available`}
        </Text>
      </View>
      <View style={badgeStyle}>
        <Text style={styles.statusBadgeText}>{badgeText}</Text>
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
  onLogout: () => void;
}

// --- MAIN COMPONENT (Updated) ---
const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onGoToProfile,
  onBookTrip,
  onGoToMyTrip,
  onGoToTripHistory,
  onGoToFeedback,
  onLogout,
}) => {
  const [activeRoute, setActiveRoute] = useState('campusToCity');
  const [activeDate, setActiveDate] = useState('today');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date, options) => {
    return date.toLocaleDateString('en-US', options);
  };

  const handleTripPress = (trip) => {
    const routeText = activeRoute === 'campusToCity' ? 'Campus to City' : 'City to Campus';
    const dateText = activeDate === 'today'
      ? formatDate(today, { month: 'long', day: 'numeric', year: 'numeric' })
      : formatDate(tomorrow, { month: 'long', day: 'numeric', year: 'numeric' });

    // This object now includes the isWaitlist flag
    const tripDetails = {
        time: trip.time,
        date: dateText,
        route: routeText,
        isWaitlist: trip.status === 'Bus Full',
    };

    // Open the modal for both regular booking and waitlist confirmation
    setSelectedTrip(tripDetails);
    setIsModalVisible(true);
  };

  const handleConfirmBooking = () => {
    if (selectedTrip) {
      // onBookTrip will now handle both cases
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
        onClose={() => setSidebarOpen(false)}
        onGoToMyTrip={onGoToMyTrip}
        onGoToTripHistory={onGoToTripHistory}
        onGoToFeedback={onGoToFeedback}
        onLogout={onLogout}
      />
      <Header
        onMenuClick={() => setSidebarOpen(true)}
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
              Today (Oct 10)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateButton, activeDate === 'tomorrow' && styles.activeDateButton]}
            onPress={() => setActiveDate('tomorrow')}>
            <Text style={[styles.dateButtonText, activeDate === 'tomorrow' && styles.activeDateButtonText]}>
              Tomorrow (Oct 11)
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
              waitlistCount={trip.waitlistCount}
              onPress={() => handleTripPress(trip)}
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
  page: { flex: 1, backgroundColor: '#f7faff' },
  content: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#f7faff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  tabsContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 5, marginVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: 'rgba(0, 123, 255, 0.1)' },
  tabText: { fontWeight: '600', color: '#6c757d', fontSize: 16 },
  activeTabText: { color: '#007bff' },
  dateSelector: { flexDirection: 'row', gap: 15, marginVertical: 25 },
  dateButton: { flex: 1, paddingVertical: 15, borderWidth: 1, borderColor: '#dee2e6', borderRadius: 10, backgroundColor: 'white', alignItems: 'center' },
  activeDateButton: { backgroundColor: '#007bff', borderColor: '#007bff' },
  dateButtonText: { fontSize: 14, fontWeight: '600', color: '#495057' },
  activeDateButtonText: { color: 'white' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardTime: { fontSize: 18, fontWeight: 'bold' },
  cardSeats: { fontSize: 14, color: '#6c757d' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#28a745' },
  statusBadgeWaitlist: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#fd7e14' },
  statusBadgeSoon: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#6c757d' },
  statusBadgeText: { color: 'white', fontWeight: '600', fontSize: 12 },
});

export default HomeDashboard;