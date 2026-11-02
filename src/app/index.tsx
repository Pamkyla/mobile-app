import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

import { COFFEE_MENU, CoffeeItem } from '../constants/menu';

export default function CatalogScreen() {
  
  // 3. Функция, которая рисует одну кофейную карточку
  const renderItem = ({ item }: { item: CoffeeItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      
      {/* Кнопка — при нажатии пока просто выводим стандартное мобильное уведомление */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => Alert.alert('Клик!', `Вы выбрали ${item.name}`)}
      >
        <Text style={styles.buttonText}>Заказать</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 4. Выводим весь наш список в виде сетки из 2 колонок */}
      <FlatList
        data={COFFEE_MENU}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Делаем плиткой в два ряда
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// 5. Уютные кофейные стили (вместо привычного веб-CSS)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F0' }, // Нежный кремовый фон
  list: { padding: 8 },
  card: { 
    flex: 1, 
    backgroundColor: '#fff', 
    margin: 8, 
    padding: 12, 
    borderRadius: 12, 
    alignItems: 'center',
    // Тени для iOS и Android
    elevation: 2, 
    shadowColor: '#4A3B32', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  image: { width: '100%', height: 120, borderRadius: 10, marginBottom: 10, resizeMode: 'cover' },
  name: { fontSize: 15, fontWeight: '600', color: '#4A3B32', textAlign: 'center', marginBottom: 4 },
  price: { fontSize: 14, color: '#8C6239', fontWeight: 'bold', marginBottom: 10 },
  button: { backgroundColor: '#6F4E37', paddingVertical: 8, width: '100%', borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
