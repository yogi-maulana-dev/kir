import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './views/context/AuthContext';
import HomeScreen from './views/home/HomeScreen';
import Login from './views/home/Login';
import Register from './views/home/Register';
import { ActivityIndicator, View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}

function MainNavigator() {
  const { userInfo, isLoading } = useContext(AuthContext);
  console.log('UserInfo:', userInfo);


  function renderScreens() {
    if (userInfo?.token) {
      console.log('Menampilkan HomeScreen karena token ada.');
      return <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />;
    }
    console.log('Menampilkan Login/Register karena token tidak ada.');
    return (
      <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </>
    );
  }

  // Jika sedang loading (misalnya, memeriksa token di AsyncStorage), tampilkan loading screen
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Sedang memuat...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#007bff' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
