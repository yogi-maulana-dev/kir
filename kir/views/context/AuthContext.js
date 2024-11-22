import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = 'http://192.168.100.161:8000/api/';

  useEffect(() => {
    const loadUserInfo = async () => {
      setIsLoading(true);
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        console.log(
          'Data userInfo dari AsyncStorage saat startup:',
          storedUserInfo,
        );

        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
          // Ensure token is stored separately
          if (parsedUserInfo.token) {
            await AsyncStorage.setItem('accessToken', parsedUserInfo.token);
          }
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error memuat userInfo:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}user/daftar/`, {
        name,
        email,
        password,
      });

      const userInfo = response.data;
      if (userInfo) {
        setUserInfo(userInfo);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        // Store token separately
        if (userInfo.token) {
          await AsyncStorage.setItem('accessToken', userInfo.token);
        }
      }
    } catch (error) {
      console.error(
        'Registration error:',
        error.response?.data || error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        email,
        password,
        device_name: 'ReactNativeApp',
      });

      const userInfo = response.data;
      if (userInfo) {
        setUserInfo(userInfo);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        // Store token separately
        if (userInfo.token) {
          await AsyncStorage.setItem('accessToken', userInfo.token);
        }
        console.log('Login successful:', userInfo);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Terjadi kesalahan, coba lagi.';
      console.log('Login error:', error.response?.data || error.message);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token sebelum logout:', token);

      if (token) {
        const response = await fetch(`${BASE_URL}logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = response.headers.get('content-type');

        if (
          response.ok &&
          contentType &&
          contentType.includes('application/json')
        ) {
          const data = await response.json();
          console.log('Logout berhasil:', data);
        } else {
          const errorText = await response.text();
          console.error('Logout gagal:', response.status, errorText);
        }
      } else {
        console.warn(
          'Token tidak ditemukan. Proses logout hanya menghapus state lokal.',
        );
      }

      await AsyncStorage.multiRemove(['accessToken', 'userInfo']);
      console.log(
        'AsyncStorage setelah logout:',
        await AsyncStorage.getAllKeys(),
      );

      setUserInfo(null);
      console.log('Logout selesai, state userInfo disetel ke null.');
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
