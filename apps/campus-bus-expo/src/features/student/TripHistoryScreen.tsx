import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Mock data for the student's last 10 trips
const pastTrips = [
  { id: '1', route: 'Campus to City', date: 'October 7, 2025', time: '5:30 PM', status: 'Completed' },
  { id: '2', route: 'City to Campus', date: 'October 6, 2025', time: '8:00 AM', status: 'Completed' },
  { id: '3', route: 'Campus to City', date: 'October 5, 2025', time: '6:00 PM', status: 'Completed' },
  { id: '4', route: 'Campus to City', date: 'October 3, 2025', time: '5:30 PM', status: 'Completed' },
  { id: '5', route: 'City to Campus', date: 'October 2, 2025', time: '8:30 AM', status: 'Cancelled' },
  { id: '6', route: 'Campus to City', date: 'October 1, 2025', time: '6:30 PM', status: 'Completed' },
  { id: '7', route: 'City to Campus', date: 'September 30, 2025', time: '8:00 AM', status: 'Completed' },
  { id: '8', route: 'Campus to City', date: 'September 29, 2025', time: '5:30 PM', status: 'Completed' },
  { id: '9', route: 'City to Campus', date: 'September 28, 2025', time: '8:00 AM', status: 'Completed' },
  { id: '10', route: 'Campus to City', date: 'September 27, 2025', time: '6:00 PM', status: 'Completed' },
];

interface TripHistoryScreenProps {
  onGoBack: () => void;
}

const TripHistoryItem = ({ route, date, time, status }) => {
    const isCancelled = status === 'Cancelled';
    const statusTextColor = isCancelled ? '#dc3545' : '#28a745';

    return (
        <View style={styles.tripCard}>
            <View>
                <Text style={styles.tripRoute}>{route}</Text>
                <Text style={styles.tripDateTime}>{date} at {time}</Text>
            </View>
            <View style={[styles.statusBadge, isCancelled && styles.statusBadgeCancelled]}>
                <Text style={[styles.statusText, { color: statusTextColor }]}>{status}</Text>
            </View>
        </View>
    );
};

const TripHistoryScreen: React.FC<TripHistoryScreenProps> = ({ onGoBack }) => {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Icon name="chevron-left" size={20} color="#4a5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Trip History</Text>
      </View>

      <FlatList
        data={pastTrips}
        renderItem={({ item }) => (
          <TripHistoryItem
            route={item.route}
            date={item.date}
            time={item.time}
            status={item.status}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 20,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  tripRoute: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 4,
  },
  tripDateTime: {
    fontSize: 14,
    color: '#6c757d',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
  },
  statusBadgeCancelled: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
  },
});

export default TripHistoryScreen;