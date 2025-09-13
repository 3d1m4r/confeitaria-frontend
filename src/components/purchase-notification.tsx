import { useState, useEffect } from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";

interface Notification {
  id: number;
  name: string;
  location: string;
  timeAgo: string;
}

const notifications: Notification[] = [
  { id: 1, name: "Maria S.", location: "São Paulo, SP", timeAgo: "3 min" },
  { id: 2, name: "Ana C.", location: "Rio de Janeiro, RJ", timeAgo: "7 min" },
  { id: 3, name: "Lucia P.", location: "Belo Horizonte, MG", timeAgo: "12 min" },
  { id: 4, name: "Carmen R.", location: "Salvador, BA", timeAgo: "18 min" },
  { id: 5, name: "Rosa M.", location: "Fortaleza, CE", timeAgo: "25 min" },
  { id: 6, name: "Fatima L.", location: "Brasília, DF", timeAgo: "31 min" },
  { id: 7, name: "Sandra O.", location: "Curitiba, PR", timeAgo: "38 min" },
  { id: 8, name: "Vera A.", location: "Recife, PE", timeAgo: "45 min" },
];

export default function PurchaseNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 8 seconds
    const initialTimer = setTimeout(showNotification, 8000);

    // Then show notifications every 15-25 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 10000 + 15000); // Random between 15-25 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification || !isVisible) return null;

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      data-testid="purchase-notification"
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 max-w-sm backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 mb-1">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Compra realizada!
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{currentNotification.name}</span> de{" "}
              <span className="text-gray-500">{currentNotification.location}</span>
            </p>
            <p className="text-xs text-gray-400">
              há {currentNotification.timeAgo}
            </p>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            🎉 Confeitaria Lucrativa - R$ 9,90
          </p>
        </div>
      </div>
    </div>
  );
}