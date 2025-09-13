import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Em 30 dias já estava faturando R$ 2.500 por mês! As receitas são incríveis e realmente funcionam.",
    name: "Maria Silva",
    location: "São Paulo, SP",
  },
  {
    id: 2,
    text: "Consegui sair do desemprego e hoje tenho minha própria confeitaria. Gratidão eterna!",
    name: "Ana Costa",
    location: "Rio de Janeiro, RJ",
  },
  {
    id: 3,
    text: "Os brigadeiros gourmet são meu carro-chefe. Faturei R$ 3.800 só no último mês!",
    name: "Carla Oliveira",
    location: "Belo Horizonte, MG",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto" data-testid="testimonial-carousel">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 bg-white p-8 mx-2 rounded-2xl shadow-lg">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 flex items-center justify-center">
                  <User className="text-white text-2xl" />
                </div>
                <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                <h4 className="font-bold text-primary">{testimonial.name}</h4>
                <span className="text-muted-foreground">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
        onClick={previousTestimonial}
        data-testid="carousel-prev"
      >
        <ChevronLeft className="text-primary" />
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
        onClick={nextTestimonial}
        data-testid="carousel-next"
      >
        <ChevronRight className="text-primary" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary opacity-100"
                : "bg-muted-foreground opacity-50"
            }`}
            onClick={() => goToTestimonial(index)}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
