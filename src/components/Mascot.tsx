interface MascotProps {
  className?: string;
  pointing?: 'left' | 'right' | 'down';
  message?: string;
}

const Mascot = ({ className = '', pointing = 'right', message }: MascotProps) => {
  return (
    <div className={`relative inline-flex items-end gap-2 ${className}`}>
      {/* Speech bubble */}
      {message && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-3 py-1.5 text-xs font-medium shadow-soft whitespace-nowrap animate-bounce-in">
          {message}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
        </div>
      )}
      
      {/* Cute bunny mascot */}
      <svg
        width="60"
        height="70"
        viewBox="0 0 60 70"
        fill="none"
        className={`transition-transform duration-300 hover:scale-110 ${
          pointing === 'left' ? 'scale-x-[-1]' : ''
        }`}
      >
        {/* Ears */}
        <ellipse cx="20" cy="15" rx="6" ry="14" className="fill-soft-pink" />
        <ellipse cx="20" cy="15" rx="3" ry="10" className="fill-accent/30" />
        <ellipse cx="40" cy="15" rx="6" ry="14" className="fill-soft-pink" />
        <ellipse cx="40" cy="15" rx="3" ry="10" className="fill-accent/30" />
        
        {/* Body */}
        <ellipse cx="30" cy="50" rx="22" ry="18" className="fill-soft-pink" />
        
        {/* Head */}
        <circle cx="30" cy="38" r="18" className="fill-soft-pink" />
        
        {/* Cheeks */}
        <circle cx="18" cy="42" r="4" className="fill-accent/40" />
        <circle cx="42" cy="42" r="4" className="fill-accent/40" />
        
        {/* Eyes */}
        <circle cx="24" cy="36" r="3" className="fill-foreground" />
        <circle cx="36" cy="36" r="3" className="fill-foreground" />
        <circle cx="25" cy="35" r="1" className="fill-background" />
        <circle cx="37" cy="35" r="1" className="fill-background" />
        
        {/* Nose */}
        <ellipse cx="30" cy="42" rx="2" ry="1.5" className="fill-accent" />
        
        {/* Mouth */}
        <path d="M28 45 Q30 47 32 45" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-foreground/60" />
        
        {/* Pointing arm */}
        {pointing !== 'down' && (
          <g className="animate-wiggle origin-center">
            <ellipse 
              cx={pointing === 'right' ? 50 : 10} 
              cy="48" 
              rx="8" 
              ry="5" 
              className="fill-soft-pink" 
              transform={`rotate(${pointing === 'right' ? -30 : 30} ${pointing === 'right' ? 50 : 10} 48)`}
            />
          </g>
        )}
        
        {/* Little heart */}
        <path
          d="M30 28 L31 26.5 Q32 25 33 26 L33 27 L30 30 L27 27 L27 26 Q28 25 29 26.5 Z"
          className="fill-accent animate-heart-beat"
        />
      </svg>
    </div>
  );
};

export default Mascot;
