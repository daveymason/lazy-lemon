import { View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useLogin } from '../context/LoginContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { setIsLoggedIn } = useLogin();
  const router = useRouter();

  const handleSubmit = () => {
    if (name.trim() && email.trim()) {
      setIsLoggedIn(true);
      router.replace('/(tabs)');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome to Lazy Lemon</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#666"
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
      >
        <ThemedText style={styles.buttonText}>Get Started</ThemedText>
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});