import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { menuItems } from '@/constants/menu';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

export default function HomeScreen() {
  const { addToCart } = useCart();
  const params = useLocalSearchParams();
  const userInfo = params.userInfo ? JSON.parse(params.userInfo as string) : null;
  const [addMessage, setAddMessage] = useState('');

  const handleQuantityChange = (itemId: string, change: number) => {
    console.log('Attempting to add item:', itemId);
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      console.log('Found item:', item);
      addToCart(itemId);
      setAddMessage(`Added ${item.name.en} to cart!`);
      setTimeout(() => setAddMessage(''), 2000);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.welcome}>
          Welcome, {userInfo?.name || 'Guest'}! 🍋
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          What would you like to drink today?
        </ThemedText>
      </ThemedView>
       
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <ThemedView style={styles.menuItemContent}>
              <View>
                <ThemedText style={styles.itemName}>{item.name.en}</ThemedText>
                <ThemedText style={styles.itemNameCn}>{item.name.zh}</ThemedText>
                <ThemedText style={styles.description}>{item.description.en}</ThemedText>
              </View>
              <View style={styles.priceContainer}>
                <ThemedText style={styles.price}>€{item.price.toFixed(2)}</ThemedText>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => handleQuantityChange(item.id, 1)}
                >
                  <Ionicons name="add-circle" size={24} color="#32CD32" />
                </TouchableOpacity>
              </View>
            </ThemedView>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.menuList}
      />
            {addMessage ? (
        <ThemedText style={styles.addMessage}>{addMessage}</ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  menuList: {
    gap: 16,
  },
  menuItem: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItemContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemNameCn: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    padding: 4,
  },
  addMessage: {
    textAlign: 'center',
    padding: 8,
    fontSize: 16,
    color: '#32CD32',
    fontWeight: '500',
  },
});
