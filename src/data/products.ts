import handmadeBirthdayHamper from '@/assets/handmade-birthday-hamper.png';
import personalizedGiftBox from '@/assets/personalized-gift-box.png';
import customGreetingCards from '@/assets/custom-greeting-cards.png';
import miniGiftHamper from '@/assets/mini-gift-hamper.png';
import weddingRukhwat from '@/assets/wedding-rukhwat.png';
import weddingRukhwat4 from '@/assets/wedding-rukhwat-4.png';
import weddingRukhwat5 from '@/assets/wedding-rukhwat-5.png';
import weddingRukhwat6 from '@/assets/wedding-rukhwat-6.png';
import weddingRukhwat7 from '@/assets/wedding-rukhwat-7.png';
import customizeFlowers from '@/assets/customize-flowers.png';
import weddingCeremonialCloth from '@/assets/wedding-ceremonial-cloth.png';
import weddingCeremonialCloth2 from '@/assets/wedding-ceremonial-cloth-2.png';
import weddingPlatter1 from '@/assets/wedding-platter-1.png';
import weddingPlatter2 from '@/assets/wedding-platter-2.png';

export interface Product {
  id: number;
  name: string;
  price: number;
  priceLabel?: string;
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
    image: handmadeBirthdayHamper,
    images: [handmadeBirthdayHamper],
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
    image: personalizedGiftBox,
    images: [personalizedGiftBox],
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
    image: customGreetingCards,
    images: [customGreetingCards],
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
    image: miniGiftHamper,
    images: [miniGiftHamper],
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
    image: weddingRukhwat,
    images: [weddingRukhwat, weddingRukhwat4, weddingRukhwat5, weddingRukhwat6, weddingRukhwat7],
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
    name: 'Customize Flowers Bouquet',
    price: 499,
    image: customizeFlowers,
    images: [customizeFlowers],
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
    id: 7,
    name: 'Wedding Ceremonial Cloth',
    price: 499,
    image: weddingCeremonialCloth,
    images: [weddingCeremonialCloth, weddingCeremonialCloth2],
    description: 'Traditional ceremonial cloth for wedding rituals, crafted with intricate designs and premium fabric.',
    details: [
      'Premium quality fabric',
      'Traditional embroidery work',
      'Multiple color options',
      'Suitable for all ceremonies',
      'Gift packaging included',
    ],
  },
  {
    id: 8,
    name: 'Wedding Customize Platters',
    price: 0,
    priceLabel: 'Price based on customization',
    image: weddingPlatter1,
    images: [weddingPlatter1, weddingPlatter2],
    description: 'Beautifully decorated wedding platters customized to match your ceremony theme and requirements.',
    details: [
      'Fully customizable designs',
      'Premium decorative elements',
      'Available for all ceremonies (Haldi, Ring, Mehendi)',
      'Handcrafted with love',
      'Contact us for pricing',
    ],
  },
];
