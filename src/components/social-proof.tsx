import { useState, useEffect } from "react";
import { MapPin, Star, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const notifications = [
  {
    name: "Maria Silva",
    location: "São Paulo, SP",
    action: "acabou de comprar",
    timeAgo: "2 min",
    avatar: "MS"
  },
  {
    name: "Ana Costa",
    location: "Rio de Janeiro, RJ", 
    action: "faturou R$ 3.200 este mês",
    timeAgo: "5 min",
    avatar: "AC"
  },
  {
    name: "Carla Oliveira",
    location: "Belo Horizonte, MG",
    action: "acabou de comprar",
    timeAgo: "8 min",
    avatar: "CO"
  },
  {
    name: "Fernanda Santos",
    location: "Brasília, DF",
    action: "conquistou 200 clientes",
    timeAgo: "12 min",
    avatar: "FS"
  },
  {
    name: "Juliana Lima",
    location: "Porto Alegre, RS",
    action: "acabou de comprar",
    timeAgo: "15 min", 
    avatar: "JL"
  },
  {
    name: "Roberta Sousa",
    location: "Salvador, BA",
    action: "faturou R$ 4.500 este mês",
    timeAgo: "18 min",
    avatar: "RS"
  }
];

export default function SocialProof() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];

  return (
    <>
      {/* Floating Social Proof Notification */}
      <div 
        className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        data-testid="social-proof-notification"
      >
        <Card className="bg-white shadow-2xl border-2 border-green-200 p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
              {notification.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                {notification.name}
              </p>
              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin size={12} className="mr-1" />
                {notification.location}
              </p>
              <p className="text-xs text-green-600 font-medium">
                {notification.action}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {notification.timeAgo}
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Strip */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <Users size={20} />
              <div>
                <div className="font-bold text-lg">5.247</div>
                <div className="text-xs opacity-90">Alunas ativas</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={20} />
              <div>
                <div className="font-bold text-lg">4.9/5</div>
                <div className="text-xs opacity-90">Avaliação média</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp size={20} />
              <div>
                <div className="font-bold text-lg">R$ 187k</div>
                <div className="text-xs opacity-90">Faturado este mês</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={20} />
              <div>
                <div className="font-bold text-lg">26 estados</div>
                <div className="text-xs opacity-90">Presença nacional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}