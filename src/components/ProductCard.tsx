import { ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className="card-soft overflow-hidden group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-foreground text-sm md:text-base mb-2 line-clamp-2 
                     group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg md:text-xl font-bold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium 
                       transition-all duration-300 active:scale-95 ${
              isAdded
                ? 'bg-mint text-foreground'
                : 'bg-primary text-primary-foreground hover:shadow-glow hover:scale-105'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span className="hidden sm:inline">Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span className="hidden sm:inline">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
