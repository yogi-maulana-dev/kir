import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Platform,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const {logout} = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];

  const toggleSidebar = () => {
    const toValue = showSidebar ? -300 : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowSidebar(!showSidebar);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        {/* Profile Button */}
        <TouchableOpacity
          onPress={toggleProfileMenu}
          style={styles.profileButton}>
          <Icon name="person-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Menu */}
      {showProfileMenu && (
        <View style={styles.profileMenu}>
          <TouchableOpacity style={styles.profileMenuItem}>
            <Icon name="lock-closed-outline" size={20} color="#4b5563" />
            <Text style={styles.profileMenuText}>Ganti Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileMenuItem} onPress={logout}>
            <Icon name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.profileMenuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{translateX: slideAnim}],
          },
        ]}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john@example.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home-outline" size={24} color="#4b5563" />
            <Text style={styles.menuItemText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="person-outline" size={24} color="#4b5563" />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="settings-outline" size={24} color="#4b5563" />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-circle-outline" size={24} color="#4b5563" />
            <Text style={styles.menuItemText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="log-out-outline" size={24} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subText}>
            This is your dashboard. Here you can view all your important
            information.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Total Views</Text>
            <Text style={styles.statValue}>1,234</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Users</Text>
            <Text style={styles.statValue}>321</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Projects</Text>
            <Text style={styles.statValue}>12</Text>
          </View>
        </View>
      </View>

      {/* Overlay */}
      {showSidebar && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2563eb',
    padding: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    width: 200,
    borderRadius: 8,
    zIndex: 3, // Pastikan menu profil berada di atas
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  profileMenuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#4b5563',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'white',
    zIndex: 3, // Pastikan sidebar berada di atas konten utama
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  profileName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  menuItems: {
    padding: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  menuItemText: {
    fontSize: 16,
    color: '#4b5563',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  subText: {
    fontSize: 16,
    marginTop: 10,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '30%',
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2, // Pastikan overlay berada di atas konten
  },
});

export default HomeScreen;
