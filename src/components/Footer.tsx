import { Heart, Instagram, MessageCircle, Globe } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = '918104896311';
  const whatsappMessage = encodeURIComponent(
    "Hi Artisiannest, I'm interested in your handmade gifts."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* About the Creator Section */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            About the Creator
          </h3>
          <div className="card-soft p-6 md:p-8">
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
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram size={18} />
            <span>@artisiannest</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle size={18} />
            <span>8104896311</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Globe size={18} />
            <span>artisiannest.com</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © 2026 Artisiannest. Made with
            <Heart className="w-4 h-4 text-accent fill-accent inline animate-pulse-soft" />
            for you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
