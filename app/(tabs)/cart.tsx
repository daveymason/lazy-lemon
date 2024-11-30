import { useCart } from '../../context/CartContext';
import { useLogin } from '../../context/LoginContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CartScreen() {
  const { cartItems, updateQuantity } = useCart();
  const { userInfo } = useLogin();
  const [orderMessage, setOrderMessage] = useState('');

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const incrementQuantity = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) updateQuantity(itemId, item.quantity + 1);
  };

  const decrementQuantity = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) updateQuantity(itemId, item.quantity - 1);
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
        data={cartItems}
        renderItem={({ item }) => (
          <ThemedView style={styles.cartItem}>
            <ThemedView style={styles.itemInfo}>
              <ThemedText style={styles.itemName}>{item.name.en}</ThemedText>
              <ThemedText style={styles.itemPrice}>${item.price}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.quantityControls}>
              <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                <Ionicons name="remove-circle-outline" size={24} />
              </TouchableOpacity>
              <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
              <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                <Ionicons name="add-circle-outline" size={24} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}
        ListFooterComponent={() => (
          <ThemedView>
            <ThemedView style={styles.totalContainer}>
              <ThemedText style={styles.totalText}>Total:</ThemedText>
              <ThemedText style={styles.totalAmount}>${calculateTotal()}</ThemedText>
            </ThemedView>
            <TouchableOpacity 
              style={styles.orderButton}
              onPress={() => {
                console.log('Order placed!');
                setOrderMessage('Order placed successfully! 🎉');
              }}
            >
              <ThemedText style={styles.orderButtonText}>Order Now</ThemedText>
            </TouchableOpacity>
            {orderMessage ? (
              <ThemedText style={styles.messageText}>{orderMessage}</ThemedText>
            ) : null}
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    opacity: 0.7,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#4CAF50',
  },
});
