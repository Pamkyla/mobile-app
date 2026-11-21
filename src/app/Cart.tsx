import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/Theme';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, updateQuantity, totalPrice } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Избегаем ошибок гидратации (SSR) на веб-платформе
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <View style={{ flex: 1, backgroundColor: COLORS.background }} />;
  }

  // 1. Заглушка, если корзина пустая
  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-handle-outline" size={80} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Ваша корзина пуста</Text>
          <Text style={styles.emptySubTitle}>Похоже, вы еще не добавили свежеобжаренный кофе в корзину.</Text>
          <TouchableOpacity 
            style={styles.shopButton} 
            onPress={() => router.push('/')}
          >
            <Text style={styles.shopButtonText}>Перейти к каталогу</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 2. Основной контент корзины
  return (
    <View style={styles.container}>

      {/* Список выбранных товаров */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cartCard}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            
            <View style={styles.cardInfo}>
              <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.cardDetails}>{`${item.category} • ${item.weight}`}</Text>
              <Text style={styles.cardPrice}>{`${(item.price * item.quantity).toFixed(2)} BYN`}</Text>
            </View>

            {/* Контроллер количества пачек (плюс/минус) */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Ionicons name="remove" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{item.quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Ionicons name="add" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Нижняя панель оформления заказа */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Итого к оплате:</Text>
          <Text style={styles.totalPrice}>{`${totalPrice.toFixed(2)} BYN`}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => console.log('Оформление заказа...')}
        >
          <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubTitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  shopButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },
  listContent: {
    padding: 16,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: COLORS.line,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  cardDetails: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    paddingHorizontal: 12,
  },
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: width > 600 ? 400 : '100%',
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
