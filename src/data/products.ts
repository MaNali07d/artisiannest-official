import { Product } from '@/contexts/CartContext';
import weddingRukhwat1 from '@/assets/wedding-rukhwat-1.jpeg';
import weddingRukhwat2 from '@/assets/wedding-rukhwat-2.jpeg';
import weddingRukhwat3 from '@/assets/wedding-rukhwat-3.png';

export const products: Product[] = [
  {
    id: 1,
    name: 'Handmade Birthday Hamper',
    price: 399,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Personalized Gift Box',
    price: 499,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Custom Greeting Card (Set of 3)',
    price: 299,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Mini Gift Hamper',
    price: 599,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Wedding Rukhwat',
    price: 1999,
    image: weddingRukhwat1,
    images: [weddingRukhwat1, weddingRukhwat2, weddingRukhwat3],
  },
  {
    id: 6,
    name: 'Anniversary Gift Set',
    price: 599,
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Customize Flowers Bouquet',
    price: 499,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Wedding Ceremonial Cloth',
    price: 499,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
  },
];
