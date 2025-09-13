import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else {
          // Reset to 24 hours when countdown reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-destructive text-white p-6 rounded-2xl mb-8" data-testid="countdown-timer">
      <h3 className="text-lg font-bold mb-4">⏰ OFERTA EXPIRA EM:</h3>
      <div className="flex justify-center space-x-4 text-2xl md:text-3xl font-black">
        <div className="text-center">
          <div className="bg-white text-destructive rounded-lg px-3 py-2" data-testid="countdown-hours">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-sm mt-1">HORAS</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-destructive rounded-lg px-3 py-2" data-testid="countdown-minutes">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm mt-1">MIN</div>
        </div>
        <div className="text-center">
          <div className="bg-white text-destructive rounded-lg px-3 py-2" data-testid="countdown-seconds">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm mt-1">SEG</div>
        </div>
      </div>
    </div>
  );
}
