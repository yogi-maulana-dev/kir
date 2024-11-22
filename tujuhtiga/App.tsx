import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ7rJ0tSYjtBZ9d7JK7byv9UgJHI2yy88",
  authDomain: "tujuhtiga-c438f.firebaseapp.com",
  projectId: "tujuhtiga-c438f",
  storageBucket: "tujuhtiga-c438f.appspot.com",
  messagingSenderId: "240101259326",
  appId: "1:240101259326:web:14f82b6507720fd26a796f",
};

// Initialize Firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

// Request notification permission for Android
const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Izin Notifikasi',
          message: 'Aplikasi ini memerlukan izin untuk mengirimkan notifikasi.',
          buttonNeutral: 'Tanya Nanti',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // Mengizinkan otomatis untuk Android versi di bawah 33
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const App = () => {
  const [namaInput, setNamaInput] = useState('');
  const [idToken, setIdToken] = useState(null);
  const [aksiKlik, setAksiKlik] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    // Create notification channel
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // ID unik untuk channel
        channelName: "Default Channel", // Nama channel
        channelDescription: "Channel notifikasi default", // Deskripsi
        importance: 4, // Penting untuk ditampilkan
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );

    // Configure push notifications
    PushNotification.configure({
      onRegister: (token) => {
        setIdToken(token.token);
        console.log("TOKEN:", token.token); // Debugging token
      },
      onNotification: (notification) => {
        console.log("NOTIFICATION:", notification);
        PushNotification.localNotification({
          channelId: "default-channel-id", // Gunakan channelId
          title: notification.title || "Default Title",
          message: notification.message || "Default Message",
        });
        if (notification.finish) {
          notification.finish(); // Hapus penggunaan FetchResult
        }
      },
      requestPermissions: true,
    });

    // Loop untuk memeriksa izin notifikasi
    const checkPermissionLoop = async () => {
      while (!(await requestNotificationPermission())) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    };

    checkPermissionLoop();
  }, []);

  const klikSimpan = async () => {
    if (namaInput.trim() === '') {
      alert('Nama tidak boleh kosong!');
      return;
    }
    setAksiKlik(true);
    setResponseMessage('Memproses...'); // Tampilkan status sementara

    // Membuat objek data yang akan dikirim ke server
    const data = {
      nama: namaInput,
      token: idToken,
    };

    try {
      // Mengirimkan data ke server menggunakan axios
      const response = await axios.post('https://pangkalancaripelanggan.com/push/kirim.php', data, {
        headers: {
          'Content-Type': 'application/json', // Menggunakan JSON sebagai format request
        },
      });

      // Tampilkan respons dari server untuk debugging
      console.log("Response dari server:", response.data);

      // Cek status dari response
      if (response.data.status === 'success') {
        setResponseMessage('Data berhasil disimpan!');
      } else {
        setResponseMessage(response.data.message || 'Terjadi kesalahan.');
      }
    } catch (error) {
      // Tangani error jika ada masalah dengan permintaan
      console.error('Terjadi kesalahan:', error);
      setResponseMessage('Terjadi kesalahan, coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      {aksiKlik ? (
        <Text style={{ fontSize: 20 }}>Data berhasil dikirim! Nama Anda: {namaInput}</Text>
      ) : (
        <>
          <Text style={styles.item}>Masukkan Nama Anda</Text>
          <TextInput
            onChangeText={setNamaInput}
            placeholder="Masukkan Nama Anda..."
            style={styles.input}
          />
          <TouchableOpacity onPress={klikSimpan} style={styles.button}>
            <Text style={styles.buttonText}>Kirim Data</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    width: 300,
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
