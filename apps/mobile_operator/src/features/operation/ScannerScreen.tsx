import React, { useState, useEffect } from 'react';
// Import Platform and PermissionsAndroid to handle permissions
import { View, Text, TouchableOpacity, StyleSheet, Animated, PermissionsAndroid, Platform } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ScannerScreen: React.FC<any> = ({ navigation, route }) => {
  const { tripId } = route.params;

  const [isScanning, setIsScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState<'valid' | 'invalid' | 'duplicate' | null>(null);
  const [scannedName, setScannedName] = useState('');
  const [boardedCount, setBoardedCount] = useState(25);
  const [totalCount, setTotalCount] = useState(30);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // NEW: State to track if the user has granted camera permission
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // NEW: This useEffect hook runs when the screen loads to request permission
  useEffect(() => {
    const requestCameraPermission = async () => {
      // For Android, we must explicitly ask for permission
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission Required',
              message: 'This app needs access to your camera to scan student QR codes.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            setHasPermission(false);
          }
        } catch (err) {
          console.warn(err);
          setHasPermission(false);
        }
      } else {
        // For iOS, permission is handled by the Info.plist file. We can assume it's true.
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []); // The empty array ensures this runs only once on mount

  const onScanSuccess = (e: { data: string }) => {
    if (!isScanning) return;
    setIsScanning(false);

    setScannedName(e.data);
    setScanStatus('valid');

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1700),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setScanStatus(null);
      setIsScanning(true);
    });
  };

  const getOverlayStyle = () => {
    if (scanStatus === 'valid') return { borderColor: '#38A169', text: 'VALID' };
    if (scanStatus === 'invalid') return { borderColor: '#E53E3E', text: 'INVALID QR' };
    if (scanStatus === 'duplicate') return { borderColor: '#ECC94B', text: 'ALREADY SCANNED' };
    return { borderColor: 'transparent', text: '' };
  };

  const { borderColor, text } = getOverlayStyle();

  // NEW: Conditional rendering based on permission status to prevent freezing
  if (hasPermission === null) {
    // While waiting for the user to respond to the permission pop-up
    return <View style={styles.container}><Text style={styles.permissionText}>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    // If the user explicitly denies permission
    return (
        <View style={styles.container}>
            <Text style={styles.permissionText}>Camera permission has been denied. Please enable it in your device settings.</Text>
        </View>
    );
  }

  // Only render the scanner component IF permission has been granted
  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onScanSuccess}
        cameraStyle={styles.cameraContainer}
        reactivate={isScanning}
        reactivateTimeout={2500}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Trip ID: {tripId}</Text>
          <TouchableOpacity style={styles.endShiftButton} onPress={() => navigation.popToTop()}>
            <Icon name="times-circle" size={24} color="#D9534F" />
            <Text style={styles.endShiftButtonText}>End Shift</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.markerContainer}>
          <View style={styles.marker} />
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.passengerListButton}
            onPress={() => navigation.navigate('PassengerList', { tripId: tripId })}
          >
            <Icon name="users" size={20} color="white" />
            <Text style={styles.passengerListButtonText}>View Passenger List</Text>
          </TouchableOpacity>
          <View style={styles.counter}>
            <Text style={styles.counterText}>Boarded: {boardedCount}/{totalCount}</Text>
          </View>
        </View>
      </View>

      {scanStatus && (
        <Animated.View style={[styles.feedbackOverlay, { borderColor, opacity: fadeAnim }]}>
          <Text style={styles.feedbackText}>{text}</Text>
          <Text style={styles.feedbackName}>{scannedName}</Text>
        </Animated.View>
      )}
    </View>
  );
};

// --- STYLES (with one addition) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', padding: 20 },
  cameraContainer: { height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  header: {
    padding: 20, paddingTop: 50, backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  endShiftButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
  },
  endShiftButtonText: { color: 'white', marginLeft: 8, fontWeight: '600' },
  markerContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingBottom: 100,
  },
  marker: {
    width: 250, height: 250, borderRadius: 12,
    borderWidth: 3, borderColor: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 90, backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingBottom: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)',
  },
  passengerListButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#3182CE',
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8,
  },
  passengerListButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  counter: {},
  counterText: { color: 'white', fontSize: 16, fontWeight: '600' },
  feedbackOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', borderWidth: 8,
  },
  feedbackText: { color: 'white', fontSize: 32, fontWeight: 'bold', letterSpacing: 2 },
  feedbackName: { color: 'white', fontSize: 20, marginTop: 8 },
  // ADD THIS STYLE for the permission text
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  }
});

export default ScannerScreen;