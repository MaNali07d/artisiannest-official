import weddingRukhwat1 from '@/assets/wedding-rukhwat-1.jpeg';
import weddingRukhwat2 from '@/assets/wedding-rukhwat-2.jpeg';
import weddingRukhwat3 from '@/assets/wedding-rukhwat-3.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  details?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Handmade Birthday Hamper',
    price: 399,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&h=400&fit=crop',
    ],
    description: 'A beautifully curated birthday hamper filled with handpicked goodies, wrapped with love and care.',
    details: [
      'Handcrafted with premium materials',
      'Includes personalized birthday card',
      'Contains assorted chocolates & treats',
      'Eco-friendly packaging',
      'Perfect for all ages',
    ],
  },
  {
    id: 2,
    name: 'Personalized Gift Box',
    price: 499,
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1607469256872-48074e807b0d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&h=400&fit=crop',
    ],
    description: 'A customizable gift box that can be tailored to your loved ones preferences and interests.',
    details: [
      'Fully customizable contents',
      'Add names or special messages',
      'Premium quality gift box',
      'Multiple size options available',
      'Gift wrapping included',
    ],
  },
  {
    id: 3,
    name: 'Custom Greeting Card (Set of 3)',
    price: 299,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=400&fit=crop',
    ],
    description: 'Set of 3 beautifully designed greeting cards with custom messages for any occasion.',
    details: [
      'Set of 3 unique designs',
      'Premium cardstock paper',
      'Customizable messages inside',
      'Envelopes included',
      'Suitable for any occasion',
    ],
  },
  {
    id: 4,
    name: 'Mini Gift Hamper',
    price: 599,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    ],
    description: 'A compact yet delightful hamper perfect for small celebrations and thoughtful gestures.',
    details: [
      'Compact and elegant design',
      'Curated premium items',
      'Perfect for office gifting',
      'Reusable basket included',
      'Same-day delivery available',
    ],
  },
  {
    id: 5,
    name: 'Wedding Rukhwat',
    price: 1999,
    image: weddingRukhwat1,
    images: [weddingRukhwat1, weddingRukhwat2, weddingRukhwat3],
    description: 'Traditional wedding rukhwat set with exquisite decorations and premium quality items.',
    details: [
      'Traditional handcrafted design',
      'Premium quality materials',
      'Complete set with all essentials',
      'Customizable decorations',
      'Auspicious and elegant packaging',
    ],
  },
  {
    id: 6,
    name: 'Anniversary Gift Set',
    price: 599,
    image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
    ],
    description: 'Celebrate your special day with this romantic anniversary gift set designed for couples.',
    details: [
      'Romantic themed packaging',
      'Includes couple accessories',
      'Personalized anniversary card',
      'Premium chocolates included',
      'Rose petals decoration',
    ],
  },
  {
    id: 7,
    name: 'Customize Flowers Bouquet',
    price: 499,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop',
    ],
    description: 'Fresh, handpicked flowers arranged in a stunning customizable bouquet for any occasion.',
    details: [
      'Fresh flowers daily',
      'Choose your flower types',
      'Custom color combinations',
      'Elegant wrapping options',
      'Add-on message card available',
    ],
  },
  {
    id: 8,
    name: 'Wedding Ceremonial Cloth',
    price: 499,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop',
    ],
    description: 'Traditional ceremonial cloth for wedding rituals, crafted with intricate designs and premium fabric.',
    details: [
      'Premium quality fabric',
      'Traditional embroidery work',
      'Multiple color options',
      'Suitable for all ceremonies',
      'Gift packaging included',
    ],
  },
];
