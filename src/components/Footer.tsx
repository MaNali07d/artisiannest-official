import { Heart, Instagram, MessageCircle, Globe } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = '918104896311';
  const whatsappMessage = encodeURIComponent(
    "Hi Artisiannest, I'm interested in your handmade gifts."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="bg-card border-t border-border mt-auto relative overflow-hidden">
      {/* Decorative pastel patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top wave pattern */}
        <svg
          className="absolute -top-1 left-0 w-full h-8 text-background"
          viewBox="0 0 1200 30"
          preserveAspectRatio="none"
        >
          <path
            d="M0,15 Q150,0 300,15 T600,15 T900,15 T1200,15 V0 H0 Z"
            fill="currentColor"
          />
        </svg>

        {/* Decorative hearts */}
        <svg className="absolute top-8 left-[5%] w-4 h-4 text-accent/20 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute top-12 right-[8%] w-5 h-5 text-soft-pink animate-float-reverse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg className="absolute bottom-20 left-[12%] w-3 h-3 text-coral/20 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        {/* Decorative stars */}
        <svg className="absolute bottom-16 right-[15%] w-4 h-4 text-mint animate-wiggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg className="absolute top-20 left-[45%] w-3 h-3 text-peach-dark animate-float-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>

        {/* Decorative swirls/circles */}
        <svg className="absolute bottom-8 left-[30%] w-6 h-6 text-accent/10 animate-float-reverse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
        </svg>
        <svg className="absolute top-16 right-[25%] w-5 h-5 text-primary/10 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" strokeDasharray="6 3" />
        </svg>

        {/* Gift box doodle */}
        <svg className="absolute bottom-24 right-[5%] w-8 h-8 text-soft-pink/50 animate-wiggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="8" width="18" height="13" rx="2" />
          <path d="M12 8V21" />
          <path d="M3 12H21" />
          <path d="M12 8C12 8 12 5 9 5C6 5 6 8 9 8" />
          <path d="M12 8C12 8 12 5 15 5C18 5 18 8 15 8" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* About the Creator Section */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h3 className="text-lg font-handwritten text-2xl text-gradient-soft mb-4 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-primary animate-heart-beat" />
            About the Creator
          </h3>
          <div className="card-soft p-6 md:p-8 relative">
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
            
            <p className="text-muted-foreground leading-relaxed">
              I am an engineering student who started Artisiannest by balancing college studies and my passion 
              for creating meaningful, handmade gifts. This platform reflects my journey of learning, creativity, 
              and consistency. Every product here is designed with care, love, and attention to detail, while I 
              continue growing both as a student and a creator.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
          <a
            href="https://instagram.com/artisiannest"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <Instagram size={18} className="group-hover:animate-wiggle" />
            <span>@artisiannest</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <MessageCircle size={18} className="group-hover:animate-wiggle" />
            <span>8104896311</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <Globe size={18} className="group-hover:animate-wiggle" />
            <span>artisiannest.com</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © 2026 <span className="font-handwritten text-lg text-gradient-soft">Artisiannest</span>. Made with
            <Heart className="w-4 h-4 text-accent fill-accent inline animate-heart-beat" />
            for you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
