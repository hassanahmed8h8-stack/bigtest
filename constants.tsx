
import { MenuItem, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', icon: '🍽️' },
  { id: 'burgers', name: 'برجر', icon: '🍔' },
  { id: 'pizza', name: 'بيتزا', icon: '🍕' },
  { id: 'chicken', name: 'كنتاكي', icon: '🍗' },
  { id: 'sides', name: 'مقبلات', icon: '🍟' },
  { id: 'drinks', name: 'مشروبات', icon: '🥤' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'c1',
    name: 'وجبة زنجر سوبريم',
    description: 'صدر دجاج مقرمش حار مع جبنة، خس، ومايونيز في خبز طازج.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'chicken'
  },
  {
    id: 'c2',
    name: 'سطل العائلة (١٠ قطع)',
    description: '١٠ قطع دجاج مقلي مقرمش، بطاطس عائلية، كول سلو كبير وخبز.',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'chicken',
    variants: [
      { id: 'normal', name: 'عادي', price: 28000 },
      { id: 'spicy', name: 'حار 🔥', price: 30000 },
    ]
  },
  {
    id: 'c3',
    name: 'ستربس دجاج (٥ قطع)',
    description: 'قطع فيليه دجاج مقرمشة بدون عظم مع صوص الثومية والبطاطس.',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'chicken'
  },
  {
    id: 'p1',
    name: 'بيتزا بيبروني',
    description: 'عجينة رقيقة، صلصة طماطم إيطالية، بيبروني بقري وجبنة موزاريلا.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'pizza',
    variants: [
      { id: 's', name: 'صغير', price: 6000 },
      { id: 'l', name: 'كبير', price: 8000 },
      { id: 'f', name: 'عائلي', price: 12000 },
    ]
  },
  {
    id: 'p2',
    name: 'بيتزا دجاج',
    description: 'بساطة المذاق الإيطالي مع ريحان طازج وزيت زيتون بكر.',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'pizza',
    variants: [
      { id: 's', name: 'صغير', price: 6000 },
      { id: 'l', name: 'كبير', price: 8000 },
      { id: 'f', name: 'عائلي', price: 12000 },
    ]
  },
  {
    id: 'b1',
    name: 'بيك جكن بيف برجر',
    description: 'قطعة لحم أنجوس مشوية مع جبنة شيدر مدخنة وصوص بيك جكن السري.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'burgers',
    calories: 650
  },
  {
    id: 'b2',
    name: 'تشيزي لافا',
    description: 'برجر محشو بجبنة الموزاريلا السائلة مع صوص الباربكيو.',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'burgers',
    calories: 820
  },
  {
    id: 's1',
    name: 'بطاطس بيك جكن المقرمشة',
    description: 'بطاطس مقلية متبلة بخلطة بهارات خاصة.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1630384066252-42a11f91176c?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'sides',
    calories: 320
  },
  {
    id: 'd1',
    name: 'ميلك شيك لوتس',
    description: 'ميلك شيك غني بنكهة بسكويت اللوتس والكريمة.',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&h=300&auto=format&fit=crop',
    category: 'drinks',
    calories: 580
  }
];
