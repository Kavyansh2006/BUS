import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

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

// --- PLACEHOLDER: Header Component ---
const Header = ({ onProfileClick }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Campus Connect</Text>
    <TouchableOpacity onPress={onProfileClick}>
      <Text style={styles.headerProfileText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

// --- PLACEHOLDER: TripCard Component ---
const TripCard = ({ time, availableSeats, totalSeats, status }) => {
  const isBusFull = status === 'Bus Full';
  const isBookingSoon = status === 'Booking Opens Soon';

  return (
    <View style={styles.card}>
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
    </View>
  );
};


// --- MAIN COMPONENT ---
interface HomeDashboardProps {
  onGoToProfile: () => void;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ onGoToProfile }) => {
  const [activeRoute, setActiveRoute] = useState('campusToCity');
  const [activeDate, setActiveDate] = useState('today');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date, options) => {
    return date.toLocaleDateString('en-US', options);
  };

  const tripsToShow = mockData[activeRoute][activeDate];

  return (
    <SafeAreaView style={styles.page}>
      <Header onProfileClick={onGoToProfile} />
      <ScrollView style={styles.content}>
        {/* Route Tabs */}
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

        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={[styles.dateButton, activeDate === 'today' && styles.activeDateButton]}
            onPress={() => setActiveDate('today')}>
            <Text style={[styles.dateButtonText, activeDate === 'today' && styles.activeDateButtonText]}>
              Today ({formatDate(today, { month: 'short', day: 'numeric' })})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateButton, activeDate === 'tomorrow' && styles.activeDateButton]}
            onPress={() => setActiveDate('tomorrow')}>
            <Text style={[styles.dateButtonText, activeDate === 'tomorrow' && styles.activeDateButtonText]}>
              Tomorrow ({formatDate(tomorrow, { month: 'short', day: 'numeric' })})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trip List */}
        <View>
          {tripsToShow.map(trip => (
            <TripCard
              key={trip.id}
              time={trip.time}
              availableSeats={trip.availableSeats}
              totalSeats={trip.totalSeats}
              status={trip.status}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerProfileText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
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
    marginBottom: 4,
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