import { Tabs, Redirect } from 'expo-router';
import { useLogin } from '../../context/LoginContext';
import { useCart } from '../../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { isLoggedIn } = useLogin();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoggedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#32CD32',
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="cart" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name="person-outline"
              size={size} 
              color={color}
              style={{ marginTop: 3 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
