import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/Theme";
import { CoffeeItem } from "../constants/Menu";
import { useCart } from "../context/CartContext";

interface CoffeeCardProps {
  item: CoffeeItem;
  onPress: () => void;
}

const { width } = Dimensions.get("window");
// Если в браузере экран слишком широкий, ограничим максимальную ширину карточки для красоты
const cardWidth = width > 600 ? 180 : (width - 40) / 2;

export default function CoffeeCard({ item, onPress }: CoffeeCardProps) {
  const { addToCart } = useCart();
  // Функция для отрисовки шкалы обжарки (например, 3 закрашенные точки из 5)
  const renderRoastDots = (level: number) => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.roastDot,
            i <= level ? styles.roastDotActive : styles.roastDotInactive,
          ]}
        />,
      );
    }
    return dots;
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      {/* Изображение товара */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {/* Плашка рейтинга */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        {/* Плашка с весом пачки поверх фото слева */}
        <View style={styles.weightBadge}>
          <Text style={styles.weightText}>{item.weight}</Text>
        </View>
      </View>

      {/* Информация о кофе */}
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Шкала обжарки вместо длинного описания */}
        <View style={styles.roastContainer}>
          <Text style={styles.roastLabel}>Обжарка:</Text>
          <View style={styles.dotsRow}>{renderRoastDots(item.roastLevel)}</View>
        </View>

        {/* Цена и кнопка добавления */}
        <View style={styles.footer}>
          <Text style={styles.price}>{`${item.price.toFixed(2)} BYN`}</Text>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={() => {
              addToCart(item);
              console.log(`Добавлено в корзину: ${item.name}`);
            }}
          >
            <Ionicons name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 130,
    backgroundColor: COLORS.line,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 3,
  },
  weightBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(78, 54, 41, 0.85)", // Полупрозрачный кофейный
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  weightText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "600",
  },
  infoContainer: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    color: COLORS.textLight,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 6,
  },
  roastContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  roastLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginRight: 6,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 3,
  },
  roastDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  roastDotActive: {
    backgroundColor: COLORS.secondary, // Закрашенная точка (обжарено)
  },
  roastDotInactive: {
    backgroundColor: COLORS.line, // Пустая точка
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
