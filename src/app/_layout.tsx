import { Stack, router, usePathname } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CoffeeLogo from "../../assets/images/logo.svg"; // Проверь свой путь до SVG
import Header from "../components/Header"; // Импорт без скобок, так как export default
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <CartProvider>
      <View style={{ flex: 1, backgroundColor: "#FAF6F0" }}>
        {/* 1. Статичный верхний блок с твоим SVG-логотипом */}
        <SafeAreaView edges={["top"]} style={{ backgroundColor: "#6F4E37" }}>
          <View
            style={{
              height: 48,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (pathname !== "/") router.dismissAll();
              }}
            >
              <CoffeeLogo width={100} height={100} fill="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* 2. Твоя панель с заголовком страницы, кнопкой Назад и Корзиной */}
        <Header />

        {/* 3. Сами страницы */}
        <Stack
          screenOptions={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#FAF6F0" },
          }}
        />
      </View>
    </CartProvider>
  );
}
