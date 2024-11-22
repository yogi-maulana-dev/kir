import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Register({navigation}) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, register} = useContext(AuthContext);

  const handleRegister = () => {
    // Ensure that all fields are filled
    if (name && email && password) {
      register(name, email, password);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.wrapper}>
      <Spinner visible={isLoading} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.logo}
          />

          <Text style={styles.title}>Daftar</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              onChangeText={value => setName(value)}
              style={styles.input}
              placeholder="Masukan Nama Lengkap"
              placeholderTextColor="#aaa"
              value={name}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={value => setEmail(value)}
              style={styles.input}
              placeholder="Masukan Email Anda"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={value => setPassword(value)}
              style={styles.input}
              placeholder="Masukan Password Anda"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('LupaPassword')}>
            <Text style={styles.linkText}>Lupa Password?</Text>
          </TouchableOpacity>

          {/* Register Prompt */}
          <View style={[styles.registerContainer, styles.marginBottom]}>
            <Text style={styles.registerText}>Anda belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Daftar')}>
              <Text style={styles.registerLink}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 15,
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

  marginBottom: {
    marginBottom: 60,
  },
});
