import { Heart } from 'lucide-react';

const PersonalBadge = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-soft-pink/50 dark:bg-soft-pink/30 rounded-full border border-accent/20 shadow-soft">
      <span className="text-xs font-medium text-foreground/80">Handmade with</span>
      <Heart className="w-3 h-3 text-accent fill-accent animate-heart-beat" />
      <span className="text-xs font-medium text-foreground/80">by</span>
      <span className="text-xs font-semibold font-handwritten text-accent">Manali</span>
    </div>
  );
};

export default PersonalBadge;
