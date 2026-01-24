import { useState, useMemo } from 'react';
import { Sparkles, Gift, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import DoodleBackground from '@/components/DoodleBackground';
import Mascot from '@/components/Mascot';
import PersonalBadge from '@/components/PersonalBadge';
import SparkleButton from '@/components/SparkleButton';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { products } from '@/data/products';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <DoodleBackground />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20 px-4">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute top-40 right-1/4 w-24 h-24 bg-coral-light/20 rounded-full blur-2xl" />
          </div>

          <div className="container mx-auto text-center relative z-10">
            {/* Personal Badge */}
            <div className="flex justify-center mb-4 animate-slide-up">
              <PersonalBadge />
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <span className="font-handwritten text-4xl md:text-6xl lg:text-7xl">Welcome to</span>{' '}
              <span className="font-handwritten text-4xl md:text-6xl lg:text-7xl text-gradient-soft block mt-2">Artisiannest</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Unique handcrafted gifts for birthdays, festivals, anniversaries and special moments.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <span className="flex items-center gap-2 px-4 py-2 bg-soft-pink rounded-full text-sm">
                <Gift className="w-4 h-4" />
                Birthday Gifts
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-mint rounded-full text-sm">
                <Heart className="w-4 h-4" />
                Anniversary
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-lavender rounded-full text-sm">
                <Sparkles className="w-4 h-4" />
                Custom Hampers
              </span>
            </div>

            {/* Custom Order Button with Sparkle */}
            <div className="animate-slide-up" style={{ animationDelay: '350ms' }}>
              <Link to="/custom-order">
                <SparkleButton>
                  <Gift className="w-4 h-4" />
                  Create Custom Order
                </SparkleButton>
              </Link>
            </div>

            {/* Mascot */}
            <div className="absolute bottom-0 right-4 md:right-20 hidden md:block animate-bounce-in" style={{ animationDelay: '500ms' }}>
              <Mascot pointing="left" message="Check out our gifts! ✨" />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl">
                <span className="font-handwritten text-3xl md:text-4xl text-gradient-soft">Our Handmade Collection</span>
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Gift className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No products found for "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 btn-secondary text-sm"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialCarousel />

        {/* Why Choose Us Section */}
        <section className="py-12 md:py-16 px-4 bg-muted/30 relative">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-10">
              <span className="font-handwritten text-3xl md:text-4xl text-gradient-soft">Why Choose Artisiannest?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🎨',
                  title: '100% Handmade',
                  description: 'Every gift is crafted with love and attention to detail.',
                },
                {
                  icon: '✨',
                  title: 'Fully Customizable',
                  description: "Tell us your ideas and we'll bring them to life.",
                },
                {
                  icon: '💝',
                  title: 'Made with Love',
                  description: 'Each gift carries a piece of our heart to yours.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card-soft p-6 text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mascot pointing to custom orders */}
          <div className="absolute bottom-4 left-4 hidden lg:block">
            <Mascot pointing="right" />
          </div>
        </section>
      </main>

      <Footer />
      <Cart />
      
      <Chatbot />
    </div>
  );
};

export default Index;
