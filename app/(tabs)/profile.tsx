import { StyleSheet, TouchableOpacity } from 'react-native';
import { useLogin } from '../../context/LoginContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { userInfo, setIsLoggedIn, setUserInfo } = useLogin();
  const router = useRouter();

  const handleLogout = () => {
    setUserInfo(null);
    setIsLoggedIn(false);
    router.replace('/onboarding');
  };

  const handleEdit = () => {
    router.replace('/editprofile');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Profile</ThemedText>
      
      <ThemedView style={styles.infoContainer}>
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Name:</ThemedText>
          <ThemedText style={styles.value}>{userInfo?.name || 'Not set'}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Email:</ThemedText>
          <ThemedText style={styles.value}>{userInfo?.email || 'Not set'}</ThemedText>
        </ThemedView>
      </ThemedView>

      <TouchableOpacity 
        style={styles.editButton} 
        onPress={handleEdit}
      >
        <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <ThemedText style={styles.logoutButtonText}>Log Out</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    flex: 2,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
