import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-muted border border-border/50 
                 transition-all duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/30"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-primary shadow-md 
                    flex items-center justify-center transition-all duration-300 ease-in-out
                    ${theme === 'dark' ? 'left-7' : 'left-0.5'}`}
      >
        {theme === 'light' ? (
          <Sun size={14} className="text-primary-foreground" />
        ) : (
          <Moon size={14} className="text-primary-foreground" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
