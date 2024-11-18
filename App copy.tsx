import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const PermissionDialog = ({ visible, onClose }) => {
  // Definisikan permission yang akan diminta berdasarkan platform
  const notificationPermission = Platform.select({
    ios: PERMISSIONS.IOS.NOTIFICATIONS,
    android: Platform.Version >= 33 
      ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS 
      : null, // Untuk Android < 13, notifikasi tidak memerlukan permission khusus
  });

  const handlePermissionRequest = async () => {
    if (!notificationPermission) {
      console.log('Permission not required for this platform/version');
      onClose();
      return;
    }

    try {
      const result = await request(notificationPermission);
      console.log('Permission result:', result);
      if (result === RESULTS.GRANTED) {
        console.log('Notification permission granted');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
    onClose();
  };

  // Jika tidak ada permission yang perlu diminta, jangan tampilkan dialog
  if (!notificationPermission && Platform.OS === 'android') {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dialogContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔔</Text>
          </View>
          
          <Text style={styles.title}>
            Izinkan aplikasi mengirim notifikasi kepada Anda?
          </Text>

          <TouchableOpacity
            style={styles.allowButton}
            onPress={handlePermissionRequest}
          >
            <Text style={styles.allowButtonText}>IZINKAN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.denyButton}
            onPress={onClose}
          >
            <Text style={styles.denyButtonText}>JANGAN IZINKAN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 15,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    fontWeight: '500',
    lineHeight: 22,
  },
  allowButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  allowButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  denyButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  denyButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
});

// Component App yang menggunakan dialog
const App = () => {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.NOTIFICATIONS,
      android: Platform.Version >= 33 
        ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS 
        : null,
    });

    // Jika tidak ada permission yang perlu dicek (Android < 13)
    if (!permission) {
      console.log('Permission check not required for this platform/version');
      return;
    }

    try {
      const result = await check(permission);
      if (result === RESULTS.DENIED) {
        setShowPermissionDialog(true);
      }
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PermissionDialog
        visible={showPermissionDialog}
        onClose={() => setShowPermissionDialog(false)}
      />
      {/* Konten aplikasi lainnya */}
    </View>
  );
};

export default App;