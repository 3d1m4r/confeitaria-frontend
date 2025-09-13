import { useState, useEffect } from "react";
import { Calculator, TrendingUp, DollarSign, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ROICalculator() {
  const [investment, setInvestment] = useState(9.90);
  const [donutsPerDay, setDonutsPerDay] = useState(20);
  const [pricePerDonut, setPricePerDonut] = useState(5);
  const [workingDays, setWorkingDays] = useState(25);
  const [results, setResults] = useState({
    dailyRevenue: 0,
    monthlyRevenue: 0,
    monthlyCosts: 0,
    monthlyProfit: 0,
    roi: 0,
    paybackDays: 0
  });

  useEffect(() => {
    const dailyRevenue = donutsPerDay * pricePerDonut;
    const monthlyRevenue = dailyRevenue * workingDays;
    const monthlyCosts = monthlyRevenue * 0.35; // 35% custo dos ingredientes
    const monthlyProfit = monthlyRevenue - monthlyCosts;
    const roi = ((monthlyProfit - investment) / investment) * 100;
    const paybackDays = investment / (dailyRevenue * 0.65);

    setResults({
      dailyRevenue,
      monthlyRevenue,
      monthlyCosts,
      monthlyProfit,
      roi,
      paybackDays
    });
  }, [investment, donutsPerDay, pricePerDonut, workingDays]);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-muted border-2 border-primary/20 shadow-2xl" data-testid="roi-calculator">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
          <Calculator className="text-white text-2xl" />
        </div>
        <CardTitle className="text-3xl font-bold gradient-text">
          Calculadora de Lucro
        </CardTitle>
        <p className="text-muted-foreground text-lg">
          Descubra quanto você pode ganhar vendendo apenas donuts
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-primary">Seus Números:</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Donuts vendidos por dia:</label>
              <Input
                type="number"
                value={donutsPerDay}
                onChange={(e) => setDonutsPerDay(Number(e.target.value))}
                className="text-lg"
                data-testid="input-donuts-per-day"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Preço por donut (R$):</label>
              <Input
                type="number"
                step="0.50"
                value={pricePerDonut}
                onChange={(e) => setPricePerDonut(Number(e.target.value))}
                className="text-lg"
                data-testid="input-price-per-donut"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Dias trabalhados por mês:</label>
              <Input
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(Number(e.target.value))}
                className="text-lg"
                data-testid="input-working-days"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-primary">Seus Resultados:</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
                <DollarSign className="mx-auto text-green-600 mb-2" size={24} />
                <div className="text-2xl font-bold text-green-600">
                  R$ {results.dailyRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-green-700">Faturamento/dia</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <TrendingUp className="mx-auto text-blue-600 mb-2" size={24} />
                <div className="text-2xl font-bold text-blue-600">
                  R$ {results.monthlyRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-blue-700">Faturamento/mês</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                <Target className="mx-auto text-purple-600 mb-2" size={24} />
                <div className="text-2xl font-bold text-purple-600">
                  R$ {results.monthlyProfit.toFixed(2)}
                </div>
                <div className="text-sm text-purple-700">Lucro líquido/mês</div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                <Calculator className="mx-auto text-orange-600 mb-2" size={24} />
                <div className="text-2xl font-bold text-orange-600">
                  {results.roi.toFixed(0)}%
                </div>
                <div className="text-sm text-orange-700">ROI no 1º mês</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl text-white text-center">
              <h4 className="text-xl font-bold mb-2">💰 Retorno do Investimento</h4>
              <p className="text-3xl font-black mb-2">
                {results.paybackDays.toFixed(1)} dias
              </p>
              <p className="text-sm opacity-90">
                Tempo para recuperar os R$ 9,90 investidos
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl">
          <p className="text-lg font-semibold mb-2">
            🎯 Com apenas {donutsPerDay} donuts por dia, você pode lucrar
          </p>
          <p className="text-3xl font-black gradient-text mb-2">
            R$ {results.monthlyProfit.toFixed(2)} por mês
          </p>
          <p className="text-muted-foreground">
            Investindo apenas R$ 9,90 • ROI de {results.roi.toFixed(0)}% no primeiro mês
          </p>
        </div>
      </CardContent>
    </Card>
  );
}