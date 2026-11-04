import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import CoffeeCard from '../components/Card';
import { COLORS } from '../constants/Theme';
import { COFFEE_MENU } from '../constants/Menu';

const CATEGORIES = ['Все', 'Арабика', 'Робуста', 'Бленды', 'Спешелти'];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [isMounted, setIsMounted] = useState(false);

  // Ждем, пока компонент полностью загрузится в браузере/на устройстве
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredMenu = selectedCategory === 'Все'
    ? COFFEE_MENU
    : COFFEE_MENU.filter(item => item.category === selectedCategory);

  // Пока не смонтировано, возвращаем пустой экран, чтобы не было конфликта SSR
  if (!isMounted) {
    return <View style={{ flex: 1, backgroundColor: COLORS.background }} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Зерновой кофе" showBackButton={false} />

      <View style={styles.categoriesContainer}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => {
            const isActive = item === selectedCategory;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(item)}
                style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.catalogList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CoffeeCard 
            item={item} 
            onPress={() => console.log('Переход на карточку кофе:', item.name)} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoriesContainer: {
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  catalogList: {
    padding: 16,
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-around',
  },
});
