import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '../context/CartContext';
export default function RootLayout() {
  return (
    <CartProvider>
      {/* Настройка системной строки (время, батарея) */}
      <StatusBar style="dark" />
      
      {/* Чистый навигатор без стандартных шапок */}
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}
