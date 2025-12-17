import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Instagram } from 'lucide-react';
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
            <a
              href="https://instagram.com/artisiannest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={18} />
              <span className="text-sm">@artisiannest</span>
            </a>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-full text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
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

            <Link
              to="/custom-order"
              className="hidden sm:flex btn-secondary text-sm px-4 py-2"
            >
              Custom Order
            </Link>

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com/artisiannest"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <Instagram size={20} className="text-primary" />
                <span>@artisiannest</span>
              </a>
              <Link
                to="/custom-order"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>✨</span>
                <span>Custom Order</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
