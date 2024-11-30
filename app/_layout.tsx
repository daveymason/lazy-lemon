import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { LoginProvider, useLogin } from '../context/LoginContext';

function RootLayoutNav() {
  const { isLoggedIn } = useLogin();
  console.log('isLoggedIn status:', isLoggedIn);

  return (
    <CartProvider>
      <Stack>
        {!isLoggedIn ? (
          <Stack.Screen 
            name="onboarding" 
            options={{ 
              headerShown: false,
            }}
            initialParams={{ isInitial: true }}
          />
        ) : (
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
            }}
          />
        )}
      </Stack>
    </CartProvider>
  );
}

export default function RootLayout() {
  return (
    <LoginProvider>
      <RootLayoutNav />
    </LoginProvider>
  );
}
