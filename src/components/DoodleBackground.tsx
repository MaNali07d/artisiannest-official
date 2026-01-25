import { useEffect, useState } from 'react';

interface DoodleElement {
  id: number;
  type: 'heart' | 'star' | 'circle' | 'swirl';
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
}

const DoodleBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const doodles: DoodleElement[] = [
    { id: 1, type: 'heart', x: 5, y: 10, size: 20, rotation: 15, delay: 0 },
    { id: 2, type: 'star', x: 90, y: 15, size: 16, rotation: -10, delay: 1 },
    { id: 3, type: 'circle', x: 85, y: 40, size: 12, rotation: 0, delay: 2 },
    { id: 4, type: 'heart', x: 10, y: 50, size: 14, rotation: -20, delay: 0.5 },
    { id: 5, type: 'swirl', x: 95, y: 70, size: 18, rotation: 30, delay: 1.5 },
    { id: 6, type: 'star', x: 3, y: 80, size: 14, rotation: 45, delay: 2.5 },
    { id: 7, type: 'heart', x: 92, y: 90, size: 16, rotation: -15, delay: 0.8 },
    { id: 8, type: 'circle', x: 8, y: 30, size: 10, rotation: 0, delay: 1.2 },
  ];

  const renderDoodle = (doodle: DoodleElement) => {
    const parallaxY = scrollY * 0.1 * (doodle.id % 2 === 0 ? 1 : -1);
    
    const style: React.CSSProperties = {
      left: `${doodle.x}%`,
      top: `${doodle.y}%`,
      transform: `translateY(${parallaxY}px) rotate(${doodle.rotation}deg)`,
      animationDelay: `${doodle.delay}s`,
    };

    switch (doodle.type) {
      case 'heart':
        return (
          <svg
            key={doodle.id}
            className="absolute opacity-[0.15] animate-float-slow pointer-events-none"
            style={style}
            width={doodle.size}
            height={doodle.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              className="text-accent"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        );
      case 'star':
        return (
          <svg
            key={doodle.id}
            className="absolute opacity-[0.12] animate-float-reverse pointer-events-none"
            style={style}
            width={doodle.size}
            height={doodle.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              className="text-coral"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      case 'circle':
        return (
          <svg
            key={doodle.id}
            className="absolute opacity-[0.1] animate-float pointer-events-none"
            style={style}
            width={doodle.size}
            height={doodle.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle className="text-soft-pink" cx="12" cy="12" r="10" strokeDasharray="4 2" />
          </svg>
        );
      case 'swirl':
        return (
          <svg
            key={doodle.id}
            className="absolute opacity-[0.1] animate-wiggle pointer-events-none"
            style={style}
            width={doodle.size}
            height={doodle.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              className="text-mint"
              d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9"
              strokeLinecap="round"
            />
            <path
              className="text-mint"
              d="M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {doodles.map(renderDoodle)}
    </div>
  );
};

export default DoodleBackground;
