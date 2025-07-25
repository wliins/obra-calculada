import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BudgetForm from "@/components/BudgetForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Save, 
  FileText,
  DollarSign,
  Package,
  Users,
  Calculator
} from "lucide-react";

interface BudgetData {
  projectName: string;
  clientName: string;
  projectType: string;
  area: string;
  rooms: string;
  bathrooms: string;
  floors: string;
  description: string;
}

const NewBudget = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = (data: BudgetData) => {
    setBudgetData(data);
    
    // Simulação de cálculo baseado na área
    const area = parseFloat(data.area) || 0;
    const rooms = parseInt(data.rooms) || 1;
    const bathrooms = parseInt(data.bathrooms) || 1;
    
    // Valores base por m² (simulação)
    const basePricePerSqm = 1200;
    const roomMultiplier = rooms * 150;
    const bathroomMultiplier = bathrooms * 300;
    
    const materials = area * (basePricePerSqm * 0.6) + roomMultiplier + bathroomMultiplier;
    const labor = area * (basePricePerSqm * 0.4);
    const total = materials + labor;
    
    const breakdown = {
      materials: {
        concreto: area * 45,
        aco: area * 28,
        tijolos: area * 82,
        revestimento: area * 35,
        tinta: area * 15,
        janelas: rooms * 800,
        portas: rooms * 600,
        hidraulica: bathrooms * 1200,
        eletrica: area * 25
      },
      labor: {
        construcao: area * 180,
        alvenaria: area * 120,
        eletricista: area * 45,
        encanador: bathrooms * 400,
        pintura: area * 35
      }
    };

    setCalculation({
      area,
      materials: Math.round(materials),
      labor: Math.round(labor),
      total: Math.round(total),
      breakdown
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Novo Orçamento</h1>
            <p className="text-muted-foreground">
              Crie um orçamento preciso e detalhado
            </p>
          </div>
          {calculation && (
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4" />
                Salvar Rascunho
              </Button>
              <Button variant="accent">
                <Download className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <div>
            <BudgetForm onCalculate={handleCalculate} />
          </div>

          {/* Results */}
          <div className="space-y-6">
            {calculation ? (
              <>
                {/* Summary */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Resumo do Orçamento
                    </CardTitle>
                    <CardDescription>
                      {budgetData?.projectName} • {calculation.area}m²
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Materiais</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(calculation.materials)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Mão de obra</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(calculation.labor)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <span className="text-lg font-semibold">Total</span>
                        </div>
                        <p className="text-3xl font-bold text-primary">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(calculation.total)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        ~{new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(calculation.total / calculation.area)} por m²
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Composição Detalhada</CardTitle>
                    <CardDescription>
                      Breakdown completo dos custos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Materials */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Materiais
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(calculation.breakdown.materials).map(([item, cost]) => (
                          <div key={item} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(cost as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Labor */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Mão de Obra
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(calculation.breakdown.labor).map(([item, cost]) => (
                          <div key={item} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(cost as number)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full">
                        <Share2 className="h-4 w-4" />
                        Compartilhar
                      </Button>
                      <Button variant="hero" className="w-full">
                        <FileText className="h-4 w-4" />
                        Gerar Proposta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Calculator className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Aguardando dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Preencha o formulário ao lado para ver o orçamento
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewBudget;