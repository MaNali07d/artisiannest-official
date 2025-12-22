import { ReactNode, useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface SparkleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const SparkleButton = ({ children, onClick, className = '' }: SparkleButtonProps) => {
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`btn-primary relative overflow-visible group ${className}`}
    >
      {/* Animated sparkle */}
      <span
        className={`absolute -top-2 -right-2 transition-all duration-500 ${
          showSparkle ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <Sparkles className="w-4 h-4 text-accent animate-sparkle" />
      </span>
      
      {/* Animated heart */}
      <span
        className={`absolute -top-1 -left-1 transition-all duration-500 ${
          showSparkle ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        <Heart className="w-3 h-3 text-accent fill-accent" />
      </span>

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Hover glow effect */}
      <span className="absolute inset-0 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
    </button>
  );
};

export default SparkleButton;
