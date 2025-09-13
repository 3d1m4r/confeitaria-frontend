import { useState, useEffect } from "react";
import { AlertTriangle, Clock, Flame, Users } from "lucide-react";

export default function UrgencyBanner() {
  const [currentStock, setCurrentStock] = useState(47);
  const [recentPurchases, setRecentPurchases] = useState(0);

  useEffect(() => {
    // Simulate stock decrease
    const stockInterval = setInterval(() => {
      setCurrentStock(prev => {
        if (prev > 5 && Math.random() > 0.7) {
          return prev - 1;
        }
        return prev;
      });
    }, 45000); // Decrease every 45 seconds

    // Simulate purchase counter
    const purchaseInterval = setInterval(() => {
      setRecentPurchases(prev => prev + 1);
    }, 8000); // New purchase every 8 seconds

    return () => {
      clearInterval(stockInterval);
      clearInterval(purchaseInterval);
    };
  }, []);

  const getUrgencyColor = () => {
    if (currentStock <= 10) return "from-destructive to-red-600";
    if (currentStock <= 25) return "from-orange-500 to-red-500";
    return "from-primary to-secondary";
  };

  const getUrgencyMessage = () => {
    if (currentStock <= 10) return "ÚLTIMAS VAGAS!";
    if (currentStock <= 25) return "POUCAS VAGAS RESTANTES!";
    return "OFERTA LIMITADA!";
  };

  return (
    <div className={`bg-gradient-to-r ${getUrgencyColor()} text-white py-3 px-4 sticky top-0 z-50 animate-pulse-fast`} data-testid="urgency-banner">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 text-center">
        <div className="flex items-center space-x-2">
          <Flame className="animate-bounce" size={20} />
          <span className="font-bold text-sm md:text-base">
            {getUrgencyMessage()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <AlertTriangle className="animate-pulse" size={16} />
          <span className="text-xs md:text-sm">
            Apenas <strong>{currentStock} vagas</strong> restantes
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Users className="animate-pulse" size={16} />
          <span className="text-xs md:text-sm">
            <strong>{recentPurchases}</strong> pessoas compraram hoje
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="animate-spin" size={16} />
          <span className="text-xs md:text-sm font-bold">
            Promoção acaba em breve!
          </span>
        </div>
      </div>
    </div>
  );
}