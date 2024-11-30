import { View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useLogin } from '../context/LoginContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { setIsLoggedIn, setUserInfo } = useLogin();
  const router = useRouter();

  const handleSubmit = () => {
    if (name.trim() && email.trim()) {
      setUserInfo({ name: name.trim(), email: email.trim() });
      setIsLoggedIn(true);
      router.replace('/(tabs)');
    }
  };

  const isFormValid = name.trim() && email.trim();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Edit Profile</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Edit your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Edit your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#666"
      />

      <TouchableOpacity 
        style={[
          styles.button, 
          !isFormValid && styles.buttonDisabled
        ]} 
        onPress={handleSubmit}
        disabled={!isFormValid}
      >
        <ThemedText style={styles.buttonText}>Update</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});