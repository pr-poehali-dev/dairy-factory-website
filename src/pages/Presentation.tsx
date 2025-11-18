import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Верейский молочный завод',
      subtitle: 'Натуральные молочные продукты с 1952 года',
      content: 'Традиции качества и вкуса на протяжении более 70 лет',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
      theme: 'primary'
    },
    {
      title: 'О компании',
      subtitle: 'Наша история',
      content: 'С 1952 года мы производим качественные молочные продукты, сохраняя традиции и внедряя современные технологии. Наша миссия — обеспечивать каждую семью полезными и вкусными продуктами.',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&q=80',
      theme: 'secondary'
    },
    {
      title: 'Наша продукция',
      subtitle: 'Широкий ассортимент',
      content: 'Молоко, кефир, творог, сметана, йогурты и сыры — более 50 наименований натуральных продуктов на любой вкус.',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80',
      theme: 'accent'
    },
    {
      title: 'Производство',
      subtitle: 'Современные технологии',
      content: 'Автоматизированные линии, строгий контроль качества на каждом этапе и бережное отношение к продукту обеспечивают высочайшие стандарты.',
      image: 'https://images.unsplash.com/photo-1583257571990-66c0a7e7f0ca?w=1200&q=80',
      theme: 'primary'
    },
    {
      title: 'Контроль качества',
      subtitle: 'Сертификаты и стандарты',
      content: 'Все продукты проходят многоступенчатую проверку качества. Мы соответствуем всем требованиям ГОСТ и имеем международные сертификаты.',
      image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&q=80',
      theme: 'secondary'
    },
    {
      title: 'Свяжитесь с нами',
      subtitle: 'Мы всегда рады сотрудничеству',
      content: 'Московская область, г. Верея, ул. Заводская, д. 1\n+7 (495) 123-45-67\ninfo@vereyamilk.ru',
      image: 'https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=1200&q=80',
      theme: 'accent'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Slide Content */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: `url(${currentSlideData.image})`
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground animate-fade-in">
              {currentSlideData.title}
            </h1>
            <h2 className="text-2xl md:text-4xl mb-8 text-foreground/80 animate-fade-in">
              {currentSlideData.subtitle}
            </h2>
            <p className="text-lg md:text-2xl leading-relaxed whitespace-pre-line text-foreground/70 animate-fade-in">
              {currentSlideData.content}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-primary/80 hover:bg-primary backdrop-blur-sm text-white p-4 rounded-full transition-all shadow-lg"
          aria-label="Previous slide"
        >
          <Icon name="ChevronLeft" size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-primary/80 hover:bg-primary backdrop-blur-sm text-white p-4 rounded-full transition-all shadow-lg"
          aria-label="Next slide"
        >
          <Icon name="ChevronRight" size={32} />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="bg-card border-t border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-primary w-8'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/'}
            >
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
            >
              <Icon name="Printer" size={16} className="mr-2" />
              Печать
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;