import { useState, useEffect } from "react";
import { 
  Play, 
  Rocket, 
  ShoppingCart, 
  Star, 
  Users, 
  DollarSign, 
  Home, 
  Clock, 
  Crown,
  Shield,
  Lock,
  Infinity,
  CreditCard,
  ChevronDown,
  Award,
  TrendingUp,
  Target,
  Zap,
  Heart,
  CheckCircle,
  Timer,
  Sparkles,
  BadgeCheck,
  Gift
} from "lucide-react";
import CountdownTimer from "@/components/countdown-timer";
import TestimonialCarousel from "@/components/testimonial-carousel";
import FAQSection from "@/components/faq-section";
import PurchaseNotification from "@/components/purchase-notification";
import { CheckoutPopup } from "@/components/checkout-popup";

export default function HomePage() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Make openCheckoutPopup available globally for the HTML buttons
  useEffect(() => {
    (window as any).openCheckoutPopup = () => {
      setShowCheckout(true);
    };
    
    return () => {
      delete (window as any).openCheckoutPopup;
    };
  }, []);

  const scrollToOffer = () => {
    document.getElementById('oferta')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const scrollToVideo = () => {
    document.getElementById('video')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky CTA Button */}
      {showStickyCTA && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
          <button
            onClick={scrollToOffer}
            className="block w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-full text-center shadow-2xl animate-pulse-fast"
            data-testid="sticky-cta"
          >
            <ShoppingCart className="inline mr-2" size={20} />
            QUERO FATURAR AGORA!
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden animate-gradient">
        {/* Enhanced floating elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full floating">💰</div>
          <div className="absolute top-32 right-8 w-16 h-16 bg-white rounded-full floating text-2xl flex items-center justify-center" style={{animationDelay: '1s'}}>🧁</div>
          <div className="absolute bottom-20 left-16 w-12 h-12 bg-white rounded-full floating text-lg flex items-center justify-center" style={{animationDelay: '2s'}}>⭐</div>
          <div className="absolute top-1/2 right-20 w-14 h-14 bg-white rounded-full floating text-xl flex items-center justify-center" style={{animationDelay: '3s'}}>🎯</div>
          <div className="absolute bottom-32 right-10 w-18 h-18 bg-white rounded-full floating text-2xl flex items-center justify-center" style={{animationDelay: '4s'}}>💎</div>
        </div>
        
        <div className="container mx-auto px-4 py-8 text-center relative z-10">
          <div className="animate-fadeIn">
            <div className="mb-6">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-bold mb-6 animate-bounceIn">
                <Sparkles className="mr-2 text-accent" size={20} />
                <span className="text-sm md:text-base">🔥 MÉTODO VALIDADO POR +5.000 ALUNAS</span>
                <Sparkles className="ml-2 text-accent" size={20} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight animate-fadeIn text-shadow-strong">
              TRANSFORME
              <span className="text-accent drop-shadow-2xl glow"> R$ 9,90</span><br/>
              EM ATÉ<br/>
              <span className="gradient-text animate-gradient">R$ 4.000/MÊS</span><br/>
              <span className="text-3xl md:text-4xl lg:text-5xl text-accent">TRABALHANDO DE CASA! 🏠</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/95 mb-8 max-w-4xl mx-auto font-bold leading-relaxed animate-slideUp text-shadow-strong">
              🎯 O <span className="text-accent underline decoration-wavy">ÚNICO MÉTODO</span> que ensina
              <strong className="text-accent bg-white/20 px-2 py-1 rounded"> receitas secretas de confeitaria</strong> que 
              <strong className="text-yellow-300">faturam até R$ 15.000 por mês</strong> mesmo para iniciantes!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center mb-12 max-w-4xl mx-auto">
              <div className="flex items-center text-white bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30 scale-hover">
                <Star className="text-accent mr-3 animate-pulse" size={24} />
                <div>
                  <div className="font-black text-xl">4.9★</div>
                  <div className="text-sm opacity-90">+2.847 Avaliações</div>
                </div>
              </div>
              <div className="flex items-center text-white bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30 scale-hover">
                <Users className="text-accent mr-3 animate-pulse" size={24} />
                <div>
                  <div className="font-black text-xl">5.247</div>
                  <div className="text-sm opacity-90">Alunas Ativas</div>
                </div>
              </div>
              <div className="flex items-center text-white bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/30 scale-hover">
                <TrendingUp className="text-accent mr-3 animate-pulse" size={24} />
                <div>
                  <div className="font-black text-xl">R$ 187k</div>
                  <div className="text-sm opacity-90">Faturado Este Mês</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 mb-16">
              <button
                onClick={scrollToVideo}
                className="inline-block bg-white text-primary font-black text-2xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 glow scale-hover animate-pulse-fast"
                data-testid="hero-cta"
              >
                <Play className="inline mr-3 animate-bounce" size={28} />
                🎥 ASSISTIR VÍDEO AGORA
              </button>
              
              <div className="text-white/90 text-sm">
                ⚡ <strong>ATENÇÃO:</strong> Vídeo disponível por tempo limitado!
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 bg-gradient-to-r from-white to-muted border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text animate-fadeIn">
              🏆 Método Validado & Comprovado
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-center opacity-70">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                📊
              </div>
              <p className="text-sm font-semibold">Resultados Comprovados</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                📈
              </div>
              <p className="text-sm font-semibold">Crescimento Garantido</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                👥
              </div>
              <p className="text-sm font-semibold">Comunidade Ativa</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                ⭐
              </div>
              <p className="text-sm font-semibold">Excelência Reconhecida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-gradient-to-br from-muted to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-destructive text-white px-6 py-3 rounded-full font-bold mb-6 animate-bounceIn">
                <Timer className="mr-2" size={20} />
                <span>🔥 VÍDEO EXCLUSIVO - DISPONÍVEL POR TEMPO LIMITADO</span>
                <Timer className="ml-2" size={20} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
                👀 Veja Como Maria Faturou R$ 8.347
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Em apenas 45 dias vendendo brigadeiros gourmet na porta de casa
              </p>
            </div>
            
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8">
              <iframe 
                src="https://www.youtube.com/embed/EwJ2IfHfMU8" 
                title="Confeitaria Lucrativa - Curso Completo"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="youtube-video"
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 p-6 rounded-2xl max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-600 mr-2" size={24} />
                  <span className="text-green-800 font-bold text-lg">GARANTIA EXCLUSIVA:</span>
                </div>
                <p className="text-green-700 text-center">
                  Se em 7 dias você não conseguir fazer sua primeira venda, 
                  <strong> devolvemos 100% do seu dinheiro!</strong>
                </p>
              </div>
              
              <button
                onClick={scrollToOffer}
                className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-black text-2xl px-16 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-pulse-fast glow"
                data-testid="video-cta"

              >
                <Rocket className="inline mr-3 animate-bounce" size={28} />
                🚀 QUERO COMEÇAR AGORA!
              </button>
              
              <p className="text-sm text-muted-foreground">
                ⚡ Últimas 47 vagas disponíveis • Oferta expira em breve
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Course Content Section */}
      <section className="py-20 bg-gradient-to-br from-white to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-bold mb-6 animate-bounceIn">
              <BadgeCheck className="mr-2" size={20} />
              <span>✅ MÉTODO VALIDADO E TESTADO</span>
              <BadgeCheck className="ml-2" size={20} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 gradient-text">
              💎 O Arsenal Completo de Receitas
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-semibold">
              <strong className="text-primary">10 apostilas exclusivas</strong> com receitas que 
              <span className="text-destructive underline">mudaram a vida de centenas</span> 
              de mulheres em todo o Brasil! 🇧🇷
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                emoji: "🧁", 
                title: "Chantininho", 
                description: "Receitas exclusivas do doce que mais vende em festas e eventos especiais",
                profit: "R$ 300-600/dia",
                difficulty: "Fácil"
              },
              { 
                emoji: "🌈", 
                title: "Macarrons", 
                description: "O segredo dos macarrons franceses que vendem por R$ 8-12 cada um",
                profit: "R$ 400-800/dia",
                difficulty: "Intermediário"
              },
              { 
                emoji: "💍", 
                title: "Bem Casado", 
                description: "Fature alto em casamentos com esta receita tradicional e lucrativa",
                profit: "R$ 500-1000/evento",
                difficulty: "Fácil"
              },
              { 
                emoji: "🍮", 
                title: "Pudim", 
                description: "Variações do pudim que conquistam qualquer paladar e garantem recompra",
                profit: "R$ 200-400/dia",
                difficulty: "Muito Fácil"
              },
              { 
                emoji: "🍩", 
                title: "Donuts", 
                description: "Donuts artesanais que vendem como água no mercado atual",
                profit: "R$ 350-700/dia",
                difficulty: "Fácil"
              },
              { 
                emoji: "🧁", 
                title: "Cupcake", 
                description: "Cupcakes gourmet com técnicas profissionais de decoração",
                profit: "R$ 250-500/dia",
                difficulty: "Fácil"
              },
              { 
                emoji: "🎄", 
                title: "Panetone & Chocotone", 
                description: "Doces natalinos que geram renda extra no fim do ano",
                profit: "R$ 800-2000/mês",
                difficulty: "Intermediário"
              },
              { 
                emoji: "🎂", 
                title: "Bolos Caseiros", 
                description: "Bolos irresistíveis para aniversários e comemorações",
                profit: "R$ 400-800/dia",
                difficulty: "Fácil"
              },
              { 
                emoji: "🍫", 
                title: "Brigadeiro Gourmet", 
                description: "Brigadeiros sofisticados que vendem por R$ 3-6 cada unidade",
                profit: "R$ 300-900/dia",
                difficulty: "Muito Fácil"
              },
              { 
                emoji: "🍿", 
                title: "Pipoca Gourmet", 
                description: "Negócio da pipoca gourmet com margem de lucro de até 400%",
                profit: "R$ 200-600/dia",
                difficulty: "Muito Fácil"
              },
            ].map((module, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-primary/20 scale-hover" data-testid={`module-${index}`}>
                <div className="text-5xl mb-4 animate-bounce" style={{animationDelay: `${index * 0.1}s`}}>{module.emoji}</div>
                <h3 className="text-2xl font-black mb-3 text-primary">{module.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{module.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">💰 Potencial:</span>
                    <span className="text-sm font-bold text-green-700">{module.profit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">📊 Dificuldade:</span>
                    <span className="text-sm font-bold text-blue-700">{module.difficulty}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <p className="text-xs text-center font-bold text-primary">
                    ✅ Receita testada por +500 alunas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-white to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-bold mb-6 animate-bounceIn">
              <Crown className="mr-2" size={20} />
              <span>🏆 DIFERENCIAIS EXCLUSIVOS</span>
              <Crown className="ml-2" size={20} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 gradient-text">
              🚀 Por Que Somos Líderes no Mercado?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mais de <strong className="text-primary">5.247 mulheres</strong> já escolheram nosso método para transformar suas vidas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: DollarSign, 
                title: "Lucro de até 40x o investimento", 
                description: "Invista R$ 9,90 e fature até R$ 4.000/mês. ROI comprovado de nossas alunas!", 
                bgGradient: "from-green-100 to-green-200",
                iconColor: "text-green-600",
                stat: "+890% ROI médio"
              },
              { 
                icon: Zap, 
                title: "Resultados em 7 Dias", 
                description: "Método testado que garante sua primeira venda na primeira semana", 
                bgGradient: "from-blue-100 to-blue-200",
                iconColor: "text-blue-600",
                stat: "97% vendem em 7 dias"
              },
              { 
                icon: Heart, 
                title: "Suporte Vitalício", 
                description: "Comunidade exclusiva de apoio com mentoria contínua", 
                bgGradient: "from-purple-100 to-purple-200",
                iconColor: "text-purple-600",
                stat: "Suporte 24/7"
              },
              { 
                icon: Target, 
                title: "Método Validado", 
                description: "Fórmula testada e aprovada por +5.247 alunas em todo o Brasil", 
                bgGradient: "from-orange-100 to-orange-200",
                iconColor: "text-orange-600",
                stat: "98% de aprovação"
              },
            ].map((benefit, index) => (
              <div key={index} className={`p-6 rounded-2xl bg-gradient-to-br ${benefit.bgGradient} border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 scale-hover text-center`} data-testid={`benefit-${index}`}>
                <div className={`w-16 h-16 ${benefit.iconColor} bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{benefit.description}</p>
                <div className={`inline-block ${benefit.iconColor} bg-white px-4 py-2 rounded-full text-sm font-bold shadow-md`}>
                  {benefit.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="py-20 gradient-bg animate-gradient relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full floating">💰</div>
          <div className="absolute bottom-20 right-16 w-24 h-24 bg-white rounded-full floating" style={{animationDelay: '2s'}}>🎆</div>
          <div className="absolute top-1/2 left-20 w-20 h-20 bg-white rounded-full floating" style={{animationDelay: '1s'}}>✨</div>
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border-4 border-primary/20 p-8 md:p-12 text-center relative glow">
            {/* Floating elements around the offer */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-destructive text-white px-8 py-3 rounded-full font-black text-lg animate-bounce">
                🔥 OFERTA RELÂMPAGO!
              </div>
            </div>
            <div className="mb-8 mt-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-destructive to-red-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide animate-pulse">
                  ⚡ ÚLTIMAS 47 VAGAS
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide">
                  🛡️ GARANTIA 7 DIAS
                </div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 gradient-text animate-gradient">
              🏆 CONFEITARIA LUCRATIVA
            </h2>
            
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300 p-6 rounded-2xl mb-8">
              <h3 className="text-2xl font-black text-yellow-800 mb-2">
                🎉 PROMOÇÃO DE LANÇAMENTO!
              </h3>
              <p className="text-yellow-700 text-lg">
                Apenas para as <strong>primeiras 17 clientes</strong> que comprarem hoje!
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-2xl font-bold text-primary mb-4">
                📚 10 Apostilas Completas + Bônus Milionários
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="font-bold text-green-700">🚀 Acesso Imediato</div>
                  <div className="text-sm text-green-600">Receba tudo agora por email</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="font-bold text-blue-700">♾️ Acesso Vitalício</div>
                  <div className="text-sm text-blue-600">Conteúdo seu para sempre</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="font-bold text-purple-700">📱 Suporte Exclusivo</div>
                  <div className="text-sm text-purple-600">Ajuda personalizada quando precisar</div>
                </div>
              </div>
            </div>
            
            <CountdownTimer />
            
            <div className="mb-8 text-center">
              <div className="text-7xl md:text-8xl font-black gradient-text mb-4">
                R$ 9,90
              </div>
              <div className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 p-6 rounded-2xl max-w-lg mx-auto">
                <p className="text-xl font-bold text-green-800 mb-2">
                  ✨ Investimento único • Acesso vitalício
                </p>
                <p className="text-lg text-green-700">
                  10 Apostilas Completas + Suporte Exclusivo
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Menos que uma pizza! 🍕
                </p>
              </div>
            </div>
            
            
            <div className="space-y-4 mb-8">
              <button
                onClick={() => setShowCheckout(true)}
                className="block w-full bg-gradient-to-r from-primary via-secondary to-accent text-white font-black text-3xl py-8 px-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mb-6 glow animate-pulse-fast relative overflow-hidden"
                data-testid="main-cta"
              >
                <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full animate-pulse"></div>
                <CreditCard className="inline mr-4 animate-bounce" size={32} />
                🚀 QUERO TRANSFORMAR MINHA VIDA AGORA!
              </button>
              
              <div className="text-center text-sm text-muted-foreground">
                🔒 Pagamento 100% seguro e criptografado • 🛡️ SSL Certificado
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl text-center">
                <Shield className="text-green-600 mx-auto mb-2" size={24} />
                <div className="font-bold text-green-800">Garantia Total</div>
                <div className="text-green-600">7 dias ou dinheiro de volta</div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl text-center">
                <Lock className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="font-bold text-blue-800">100% Seguro</div>
                <div className="text-blue-600">Pagamento criptografado</div>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl text-center">
                <Infinity className="text-purple-600 mx-auto mb-2" size={24} />
                <div className="font-bold text-purple-800">Acesso Vitalício</div>
                <div className="text-purple-600">Conteúdo seu para sempre</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              O Que Nossas Alunas Dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Mais de 5.000 mulheres já transformaram suas vidas
            </p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Dúvidas Frequentes
              </h2>
              <p className="text-xl text-muted-foreground">
                Tire todas as suas dúvidas sobre o curso
              </p>
            </div>
            
            <FAQSection />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Não Deixe Essa Oportunidade Passar!
            </h2>
            <p className="text-xl mb-8">
              Milhares de mulheres já transformaram suas vidas. Agora é a sua vez!
            </p>
            <button
              onClick={scrollToOffer}
              className="inline-block bg-white text-primary font-bold text-2xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              data-testid="final-cta"
            >
              <Crown className="inline mr-3" size={24} />
              QUERO MINHA TRANSFORMAÇÃO
            </button>
            <p className="text-sm mt-6 opacity-80">
              ⭐ Mais de 5.000 alunas aprovadas • 4.9★ de avaliação
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Confeitaria Lucrativa</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-3">Contato</h4>
                <p className="text-sm text-white/70">suporte@confeitarialucrativa.com.br</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Garantia</h4>
                <p className="text-sm text-white/70">7 dias de garantia total</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Pagamento</h4>
                <p className="text-sm text-white/70">Processamento seguro</p>
              </div>
            </div>
            
            <hr className="border-white/20 mb-6" />
            
            <div className="space-y-4 text-sm text-white/70">
              <p>
                <a href="#" className="hover:text-white transition-colors" data-testid="privacy-policy">Política de Privacidade</a> |
                <a href="#" className="hover:text-white transition-colors ml-2" data-testid="terms-of-use">Termos de Uso</a>
              </p>
              <p>
                Este produto contém conteúdo educacional baseado na experiência prática de empreendedoras de sucesso. Os resultados podem variar de acordo com a dedicação e aplicação individual de cada pessoa. Não garantimos resultados específicos, mas oferecemos conhecimento testado e validado por nossa comunidade.
              </p>
              <p>© 2024 Confeitaria Lucrativa. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
      
      <PurchaseNotification />
      
      {/* Checkout Popup */}
      <CheckoutPopup 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
    </div>
  );
}
