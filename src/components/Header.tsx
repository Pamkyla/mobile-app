import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/Theme";
import { useCart } from "../context/CartContext";

// Словарь заголовков (при добавлении новых страниц просто дописываем их сюда)
const PAGE_TITLES: Record<string, string> = {
  "/": "Каталог кофе",
  "/Cart": "Корзина",
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();

  // Вычисляем, нужно ли показывать кнопку "Назад" и какой заголовок вывести
  const isHome = pathname === "/";
  const title = PAGE_TITLES[pathname] || "Coffee Shop";

  const handleCartPress = () => {
    // Защита от многократного нажатия на иконку корзины
    if (pathname !== "/Cart") {
      router.push("/Cart");
    }
  };

  return (
    <View style={styles.container}>
      {/* Левая кнопка "Назад" (появляется автоматически на всех страницах, кроме главной) */}
      {!isHome ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyButton} />
      )}

      {/* Центральный заголовок */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Правая кнопка "Корзина" */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleCartPress}
        activeOpacity={0.7}
      >
        <Ionicons name="bag-handle-outline" size={24} color={COLORS.primary} />

        {/* Твой индикатор количества товаров */}
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {totalItems > 99 ? "99+" : totalItems}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Важно для абсолютного позиционирования бейджа
  },
  emptyButton: {
    width: 40,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: COLORS.secondary, // Мягкий кофейный акцентный цвет для индикатора
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    // Легкая тень, чтобы кружок выделялся
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
  },
});
