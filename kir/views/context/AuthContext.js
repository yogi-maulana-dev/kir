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
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error('Error loading user info:', error.message);
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
        console.log('Registration successful:', userInfo);
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
        console.log('Login successful:', userInfo);
      }
    } catch (error) {
      // Tangkap pesan error dari backend
      const errorMessage =
        error.response?.data?.message || 'Terjadi kesalahan, coba lagi.';
      console.log('Login error:', error.response?.data || error.message); // Debugging
      throw new Error(errorMessage); // Lempar pesan error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userInfo');
      setUserInfo(null);
      console.log('Logout successful');
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
