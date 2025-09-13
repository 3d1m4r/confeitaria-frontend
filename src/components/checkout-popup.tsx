import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomerSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Smartphone } from "lucide-react";

const checkoutSchema = insertCustomerSchema.extend({
  taxId: z.string().min(11, "CPF deve ter pelo menos 11 dígitos")
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CheckoutResponse {
  billing: {
    id: string;
    paymentUrl?: string;
  };
  customer: {
    id: string;
    name: string;
  };
  pixId: string;
  pixCode: string;
  qrCodeUrl: string;
  amount: number;
  expiresAt: string;
}

export function CheckoutPopup({ isOpen, onClose }: CheckoutPopupProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState<CheckoutResponse | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      taxId: ""
    }
  });

  const checkoutMutation = useMutation({
    mutationFn: async (data: CheckoutForm) => {
      const response = await fetch(API_ENDPOINTS.CHECKOUT, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error("Erro ao processar pagamento");
      }
      
      return (await response.json()) as CheckoutResponse;
    },
    onSuccess: (data) => {
      setPaymentData(data);
      setShowPayment(true);
      toast({
        title: "QR Code gerado!",
        description: "Escaneie o código QR ou copie o código PIX para pagar",
      });
    },
    onError: (error: any) => {
      console.error("Checkout error:", error);
      toast({
        title: "Erro ao processar pagamento",
        description: "Tente novamente em alguns segundos",
        variant: "destructive"
      });
    }
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const onSubmit = (data: CheckoutForm) => {
    // Clean CPF and phone for submission
    const cleanData = {
      ...data,
      taxId: data.taxId.replace(/\D/g, ""),
      phone: data.phone.replace(/\D/g, "")
    };
    checkoutMutation.mutate(cleanData);
  };

  const copyPixCode = () => {
    if (paymentData?.pixCode) {
      navigator.clipboard.writeText(paymentData.pixCode);
      toast({
        title: "Código PIX copiado!",
        description: "Cole no seu app do banco para pagar",
      });
    }
  };

  const checkPayment = async () => {
    if (!paymentData?.pixId) return;
    
    setCheckingPayment(true);
    try {
      const response = await fetch(API_ENDPOINTS.PAYMENT_CHECK(paymentData.pixId));
      
      if (!response.ok) {
        throw new Error("Erro ao verificar pagamento");
      }
      
      const result = await response.json();
      
      if (result.isPaid) {
        toast({
          title: "Pagamento confirmado!",
          description: "Redirecionando para o acesso ao curso...",
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "https://confeitaria-obrigado.netlify.app/";
        }, 2000);
      } else {
        toast({
          title: "Pagamento ainda não confirmado",
          description: "Verifique se o pagamento foi efetuado e tente novamente",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao verificar pagamento",
        description: "Tente novamente em alguns segundos",
        variant: "destructive"
      });
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleClose = () => {
    setShowPayment(false);
    setPaymentData(null);
    setCheckingPayment(false);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            {showPayment ? "🎯 Finalize seu Pagamento" : "🚀 Adquira Agora - R$ 9,90"}
          </DialogTitle>
        </DialogHeader>

        {!showPayment ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="checkout-form">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Digite seu nome completo"
                  data-testid="input-name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu melhor e-mail"
                  data-testid="input-email"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="(11) 99999-9999"
                  onChange={(e) => {
                    e.target.value = formatPhone(e.target.value);
                  }}
                  data-testid="input-phone"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="taxId">CPF</Label>
                <Input
                  id="taxId"
                  {...register("taxId")}
                  placeholder="000.000.000-00"
                  onChange={(e) => {
                    e.target.value = formatCPF(e.target.value);
                  }}
                  data-testid="input-cpf"
                />
                {errors.taxId && (
                  <p className="text-sm text-red-600">{errors.taxId.message}</p>
                )}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Pagamento via PIX</span>
              </div>
              <p className="text-sm text-green-700 text-center">
                Aprovação instantânea • 100% seguro • Dados protegidos
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 text-lg"
              disabled={checkoutMutation.isPending}
              data-testid="button-generate-qr"
            >
              {checkoutMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gerando QR Code...
                </>
              ) : (
                <>
                  <Smartphone className="w-5 h-5 mr-2" />
                  GERAR QR CODE PIX
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                🔒 Compra 100% segura • Garantia de 7 dias
              </p>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center" data-testid="payment-section">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                ✅ QR Code Gerado com Sucesso!
              </h3>
              <p className="text-blue-700">
                Escaneie o código QR abaixo ou copie o código PIX
              </p>
            </div>

            {paymentData?.qrCodeUrl && (
              <div className="flex justify-center">
                <img 
                  src={paymentData.qrCodeUrl} 
                  alt="QR Code PIX" 
                  className="w-64 h-64 border-2 border-gray-300 rounded-lg"
                  data-testid="qr-code-image"
                />
              </div>
            )}

            {paymentData?.pixCode && (
              <div className="space-y-3">
                <p className="font-semibold">Ou copie o código PIX:</p>
                <div className="bg-gray-100 p-3 rounded border break-all text-sm">
                  {paymentData.pixCode}
                </div>
                <Button
                  onClick={copyPixCode}
                  variant="outline"
                  className="w-full"
                  data-testid="button-copy-pix"
                >
                  📋 Copiar Código PIX
                </Button>
              </div>
            )}

            <div className="space-y-4">
              <Button
                onClick={checkPayment}
                disabled={checkingPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                data-testid="button-check-payment"
              >
                {checkingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "✅ Já efetuei o pagamento"
                )}
              </Button>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⏱️ <strong>Após efetuar o pagamento</strong>, clique no botão acima para confirmar e acessar o curso
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}