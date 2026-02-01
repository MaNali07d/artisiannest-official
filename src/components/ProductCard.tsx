import { ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const hasMultipleImages = images.length > 1;

  // First 4 products are above the fold, load eagerly with high priority
  const isAboveFold = index < 4;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="card-soft overflow-hidden group animate-slide-up cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
        onClick={handleCardClick}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading={isAboveFold ? "eager" : "lazy"}
            fetchPriority={isAboveFold ? "high" : "auto"}
            decoding={isAboveFold ? "sync" : "async"}
            width={320}
            height={320}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background 
                           rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} className="text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background 
                           rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           shadow-md"
                aria-label="Next image"
              >
                <ChevronRight size={18} className="text-foreground" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? 'bg-primary w-4' 
                        : 'bg-background/70 hover:bg-background'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-5">
          <h3 className="font-semibold text-foreground text-sm md:text-base mb-2 line-clamp-2 
                       group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg md:text-xl font-bold text-primary">
              {product.priceLabel ? product.priceLabel : `₹${product.price.toLocaleString('en-IN')}`}
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

      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
