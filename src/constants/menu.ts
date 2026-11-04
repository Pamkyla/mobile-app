export interface CoffeeItem {
  id: string;
  name: string;
  category: 'Арабика' | 'Робуста' | 'Бленды' | 'Спешелти';
  roastLevel: number; // Степень обжарки от 1 до 5
  weight: string;     // Вес упаковки (например, "250 г" или "1 кг")
  price: number;
  rating: number;
  description: string;
  image: string;
}

export const COFFEE_MENU: CoffeeItem[] = [
  {
    id: '1',
    name: 'Ethiopia Yirgacheffe',
    category: 'Спешелти',
    roastLevel: 2,
    weight: '250 г',
    price: 24.0,
    rating: 4.9,
    description: 'Яркий моносорт арабики с отчетливыми нотами бергамота, лимона и спелых черных ягод. Легкое чайное тело.',
    image: 'https://unsplash.com',
  },
  {
    id: '2',
    name: 'Brazil Santos',
    category: 'Арабика',
    roastLevel: 3,
    weight: '250 г',
    price: 18.5,
    rating: 4.7,
    description: 'Классический плотный вкус сбалансированной арабики. Выраженные ноты жареного фундука, шоколада и карамели.',
    image: 'https://unsplash.com',
  },
  {
    id: '3',
    name: 'Crema Blend (80/20)',
    category: 'Бленды',
    roastLevel: 4,
    weight: '1 кг',
    price: 55.0,
    rating: 4.8,
    description: 'Авторский купаж из 80% бразильской арабики и 20% индийской робусты. Плотное тело, идеальная густая пенка крема.',
    image: 'https://unsplash.com',
  },
  {
    id: '4',
    name: 'Uganda Robusta',
    category: 'Робуста',
    roastLevel: 5,
    weight: '250 г',
    price: 15.0,
    rating: 4.5,
    description: 'Плотный, экстра-крепкий кофе с высокой интенсивностью. Землистые и древесные оттенки, ноты горького какао.',
    image: 'https://unsplash.com',
  },
];
