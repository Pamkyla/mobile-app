import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/Theme';
import { useCart } from '../context/CartContext'; // Импортируем контекст корзины

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const router = useRouter();
  const { totalItems } = useCart(); // Получаем общее количество товаров

  return (
    <View style={styles.container}>
      {/* Левая кнопка "Назад" */}
      {showBackButton ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyButton} />
      )}

      {/* Центральный заголовок */}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>

      {/* Правая кнопка "Корзина" */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('../Cart')}
        activeOpacity={0.7}
      >
        <Ionicons name="bag-handle-outline" size={24} color={COLORS.primary} />
        
        {/* Индикатор количества товаров (показывается, только если больше 0) */}
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {totalItems > 99 ? '99+' : totalItems}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: statusBarHeight + 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Важно для абсолютного позиционирования бейджа
  },
  emptyButton: {
    width: 40,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.secondary, // Мягкий кофейный акцентный цвет для индикатора
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    // Легкая тень, чтобы кружок выделялся
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
});
