import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  emoji: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya S.',
    text: 'The birthday hamper I ordered was absolutely beautiful! My friend loved every single item. The attention to detail is incredible.',
    emoji: '💕',
  },
  {
    id: 2,
    name: 'Rahul M.',
    text: 'Ordered a custom anniversary gift and it exceeded all expectations. Truly handmade with love!',
    emoji: '✨',
  },
  {
    id: 3,
    name: 'Ananya K.',
    text: 'The personalized photo frame was perfect. Quick delivery and amazing packaging. Will definitely order again!',
    emoji: '🎁',
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-handwritten text-center mb-10 text-gradient-soft">
          What Our Customers Say 💬
        </h2>

        <div className="relative">
          {/* Doodle quote marks */}
          <svg
            className="absolute -top-6 -left-4 w-12 h-12 text-accent/30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
          <svg
            className="absolute -bottom-6 -right-4 w-12 h-12 text-accent/30 rotate-180"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>

          {/* Testimonial cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="card-soft p-6 md:p-8 text-center">
                    <span className="text-3xl mb-4 block">{testimonial.emoji}</span>
                    <p className="text-muted-foreground mb-4 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <p className="font-semibold text-foreground">— {testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card border border-border shadow-soft flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-0 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="p-2 flex items-center justify-center"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span className={`block rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-6 h-2'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2 h-2'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
