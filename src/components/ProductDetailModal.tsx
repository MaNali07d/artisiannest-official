import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingBag, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const hasMultipleImages = images.length > 1;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-muted flex items-center justify-center min-h-[300px] md:min-h-[400px]">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain"
            />
            
            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background 
                             rounded-full p-2 shadow-lg transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-foreground" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background 
                             rounded-full p-2 shadow-lg transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-foreground" />
                </button>
              </>
            )}
            
            {/* Image Indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-background/70 hover:bg-background'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 bg-background/80 p-2 rounded-lg">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {product.name}
            </h2>
            
            <p className="text-3xl font-bold text-primary mb-4">
              {product.priceLabel ? product.priceLabel : `₹${product.price.toLocaleString('en-IN')}`}
            </p>

            {product.description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.details && product.details.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Product Details:</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-border">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full text-lg font-medium 
                           transition-all duration-300 active:scale-95 ${
                  isAdded
                    ? 'bg-mint text-foreground'
                    : 'bg-primary text-primary-foreground hover:shadow-glow hover:scale-[1.02]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={24} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={24} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
