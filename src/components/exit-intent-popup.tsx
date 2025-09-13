import { useState, useEffect } from "react";
import { X, AlertTriangle, Gift, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2 && !hasShown && !isOpen) {
        timeoutId = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
        }, 2000);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasShown, isOpen]);

  const scrollToOffer = () => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById('oferta')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl border-4 border-destructive/50 bg-gradient-to-br from-white to-red-50" data-testid="exit-intent-popup">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="text-destructive mr-3 animate-bounce" size={32} />
              <span className="text-2xl font-black text-destructive">ESPERE!</span>
              <AlertTriangle className="text-destructive ml-3 animate-bounce" size={32} />
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Oferta especial exclusiva para você que está saindo
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center space-y-6 p-6">
          <h2 className="text-3xl font-bold text-destructive">
            Você está perdendo a oportunidade da sua vida!
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Mais de <strong>5.000 mulheres</strong> já transformaram suas vidas com a Confeitaria Lucrativa.
            <br />
            Não deixe essa chance passar!
          </p>
          
          <div className="bg-gradient-to-r from-destructive to-primary text-white p-6 rounded-2xl">
            <div className="flex items-center justify-center mb-4">
              <Gift className="mr-3" size={24} />
              <span className="text-xl font-bold">BÔNUS EXCLUSIVO</span>
              <Gift className="ml-3" size={24} />
            </div>
            <p className="text-lg mb-4">
              Se você comprar AGORA, ganha também:
            </p>
            <ul className="text-left space-y-2 max-w-sm mx-auto">
              <li>✅ E-book "Precificação Certeira" (R$ 47)</li>
              <li>✅ Lista VIP de Fornecedores (R$ 67)</li>
              <li>✅ Template para Redes Sociais (R$ 37)</li>
            </ul>
            <div className="text-2xl font-black mt-4">
              TOTAL: R$ 151 em BÔNUS GRÁTIS!
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-destructive font-bold">
            <Clock className="animate-pulse" size={20} />
            <span>Esta oferta expira em poucos minutos!</span>
            <Clock className="animate-pulse" size={20} />
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={scrollToOffer}
              className="w-full bg-gradient-to-r from-destructive to-primary text-white font-black text-xl py-6 glow animate-pulse-fast"
              data-testid="exit-popup-accept"
            >
              SIM! QUERO APROVEITAR ESTA OFERTA
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full text-muted-foreground hover:text-foreground"
              data-testid="exit-popup-decline"
            >
              Não, obrigada. Vou perder esta oportunidade.
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            ⚠️ Esta janela aparece apenas uma vez. Se fechar, não poderá ver os bônus novamente.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}