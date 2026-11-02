export interface CoffeeItem {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
}

// Обязательно добавляем export перед const!
export const COFFEE_MENU: CoffeeItem[] = [
  { 
    id: '1', 
    name: 'Эспрессо', 
    price: '4.50 BYN', 
    image: 'https://unsplash.com',
    description: 'Классический крепкий кофе, приготовленный под давлением.'
  },
  { 
    id: '2', 
    name: 'Капучино', 
    price: '6.00 BYN', 
    image: 'https://unsplash.com',
    description: 'Идеальный баланс плотного эспрессо, нежного молока и пышной пены.'
  },
  { 
    id: '3', 
    name: 'Латте Макиато', 
    price: '6.50 BYN', 
    image: 'https://unsplash.com',
    description: 'Трехслойный кофейный напиток, ложащийся красивыми слоями.'
  },
  { 
    id: '4', 
    name: 'Флэт Уайт', 
    price: '6.00 BYN', 
    image: 'https://unsplash.com',
    description: 'Напиток для ценителей вкуса кофе: двойной эспрессо с молоком.'
  },
];