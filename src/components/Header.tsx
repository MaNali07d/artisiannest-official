import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import logo from '@/assets/logo.png';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-soft transition-transform duration-300 group-hover:scale-105">
              <img src={logo} alt="Artisiannest Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Artisiannest</h1>
              <p className="text-xs text-muted-foreground hidden md:block">
                Handmade gifts. Custom hampers. Personalized love
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground 
                               group-focus-within:text-primary transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search handmade gifts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 xl:w-80 pl-12 pr-5 py-2.5 bg-muted/60 border border-border/40 rounded-full text-sm 
                         shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-sm
                         hover:bg-muted/80 hover:border-primary/30 hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.08)]
                         focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary/50 
                         focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.1)] 
                         transition-all duration-300 ease-out"
              />
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Search size={20} />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 md:px-4 md:py-2 btn-primary flex items-center gap-2"
            >
              <ShoppingBag size={18} />
              <span className="hidden md:inline text-sm">Checkout</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs 
                               rounded-full flex items-center justify-center font-bold animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4 animate-slide-up">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground 
                               group-focus-within:text-primary transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search handmade gifts…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 bg-muted/60 border border-border/40 rounded-2xl text-base 
                         shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-sm
                         focus:outline-none focus:bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary/50 
                         focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.1)] 
                         transition-all duration-300 ease-out"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              {/* Menu items can be added here */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
