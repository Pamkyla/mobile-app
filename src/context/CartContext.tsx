import React, { createContext, useContext, useState, ReactNode } from "react";
import { CoffeeItem } from "../constants/Menu";

// Описываем структуру товара внутри корзины (тот же кофе + выбранное количество)
export interface CartItem extends CoffeeItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CoffeeItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Добавление в корзину
  const addToCart = (item: CoffeeItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // Если товар уже в корзине, просто увеличиваем количество на 1
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      // Если товара нет, добавляем его с количеством 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // 2. Полное удаление товара из корзины
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 3. Изменение количества (+1 или -1)
  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + amount;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        // Если количество стало 0 или меньше, автоматически удаляем товар
        .filter((item) => item.quantity > 0),
    );
  };

  // 4. Очистить корзину
  const clearCart = () => setCartItems([]);

  // Подсчет общей стоимости зёрен в корзине
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Подсчет общего количества пачек в корзине (для бейджа на иконке)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Кастомный хук для удобного использования контекста в компонентах
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен использоваться внутри CartProvider");
  }
  return context;
}
