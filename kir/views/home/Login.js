import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

const {height} = Dimensions.get('window');

import Register from './Register';
import {AuthContext} from '../context/AuthContext';

export default function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const {isLoading, login} = useContext(AuthContext);

  // const handleLogin = () => {
  //   // Ensure that all fields are filled
  //   if (email && password) {
  //     login(email, password);
  //   } else {
  //     alert('Please fill in all fields');
  //   }
  // };
  const [error, setError] = useState(''); // State untuk pesan error
  const {login} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setError(''); // Reset error
      await login(email, password);
    } catch (err) {
      console.log('Error message:', err.message); // Debug

      // Clean the error message - only show the main message
      const cleanErrorMessage = err.message.split('(')[0].trim();
      setError(cleanErrorMessage);
      Alert.alert('Login Gagal', cleanErrorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://via.placeholder.com/100'}}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        onChangeText={value => setEmail(value)}
        style={styles.input}
        placeholder="Masukan Username atau Email Anda"
        placeholderTextColor="#aaa"
      />

      <TextInput
        onChangeText={value => setPassword(value)}
        style={styles.input}
        placeholder="Masukan Password Anda"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('lupapassword')}>
        <Text style={styles.linkText}>Lupa Password?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Anda belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 50,
    // height: height * 0.3,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#555',
  },
  registerLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});
