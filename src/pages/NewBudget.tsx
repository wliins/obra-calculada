import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import BudgetForm from "@/components/BudgetForm";
import CalculatorForm from "@/components/CalculatorForm";
import BudgetResult from "@/components/BudgetResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft,
  Calculator,
  Search,
  AlertCircle,
  Plus
} from "lucide-react";
import { useBudget } from "@/hooks/useBudget";
import { defaultCalculators, getCalculatorsByCategory, Calculator as CalculatorType } from "@/lib/calculators";
import { ProjectData, projectSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

const NewBudget = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    createBudget,
    calculateBudget,
    validateInputs,
    exportBudget,
    isLoading,
    error
  } = useBudget();

  const [step, setStep] = useState<'project' | 'calculator' | 'result'>('project');
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState<Record<string, any>>({});
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [currentBudgetId, setCurrentBudgetId] = useState<string | null>(null);

  const calculatorsByCategory = getCalculatorsByCategory(defaultCalculators);

  const handleProjectSubmit = async (data: ProjectData) => {
    try {
      // Validar dados do projeto
      const validatedData = projectSchema.parse(data);
      setProjectData(validatedData);
      setStep('calculator');
    } catch (err: any) {
      toast({
        title: "Erro de validação",
        description: err.errors?.[0]?.message || "Dados inválidos",
        variant: "destructive"
      });
    }
  };

  const handleCalculatorSelect = (calculator: CalculatorType) => {
    setSelectedCalculator(calculator);
    setCalculatorInputs({});
    setCalculationResult(null);
  };

  const handleCalculatorSubmit = async (inputs: Record<string, any>) => {
    if (!selectedCalculator) return;

    try {
      // Validar inputs
      const errors = validateInputs(selectedCalculator, inputs);
      if (errors.length > 0) {
        toast({
          title: "Erro de validação",
          description: errors.join(', '),
          variant: "destructive"
        });
        return;
      }

      // Calcular orçamento
      const result = calculateBudget(selectedCalculator, inputs);
      if (!result) {
        toast({
          title: "Erro no cálculo",
          description: "Não foi possível calcular o orçamento",
          variant: "destructive"
        });
        return;
      }

      setCalculatorInputs(inputs);
      setCalculationResult(result);

      // Criar orçamento no sistema
      if (projectData) {
        const budget = await createBudget(projectData, selectedCalculator.id, inputs);
        setCurrentBudgetId(budget.id);
      }

      setStep('result');
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Erro ao processar orçamento",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    if (currentBudgetId) {
      exportBudget(currentBudgetId);
      toast({
        title: "Orçamento exportado",
        description: "O arquivo foi baixado com sucesso"
      });
    }
  };

  const handleShare = () => {
    if (calculationResult && projectData) {
      const shareData = {
        title: `Orçamento - ${projectData.projectName}`,
        text: `Orçamento para ${projectData.projectName} - Total: R$ ${calculationResult.total.toLocaleString('pt-BR')}`,
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        // Fallback para copiar link
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado",
          description: "O link foi copiado para a área de transferência"
        });
      }
    }
  };

  const handleGenerateProposal = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A geração de propostas será implementada em breve"
    });
  };

  const handleNewBudget = () => {
    setStep('project');
    setProjectData(null);
    setSelectedCalculator(null);
    setCalculatorInputs({});
    setCalculationResult(null);
    setCurrentBudgetId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Novo Orçamento</h1>
              <p className="text-muted-foreground">
                {step === 'project' && 'Informações do projeto'}
                {step === 'calculator' && 'Selecione uma calculadora'}
                {step === 'result' && 'Resultado do orçamento'}
              </p>
            </div>
          </div>
          
          {step === 'result' && (
            <Button onClick={handleNewBudget} variant="outline">
              <Plus className="h-4 w-4" />
              Novo Orçamento
            </Button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Content */}
        {step === 'project' && (
          <div className="max-w-2xl">
            <BudgetForm onCalculate={handleProjectSubmit} />
          </div>
        )}

        {step === 'calculator' && projectData && (
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Projeto Selecionado</CardTitle>
                <CardDescription>
                  {projectData.projectName} • {projectData.clientName} • {projectData.area}m²
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Calculator Selection */}
            <div className="space-y-6">
              {Object.entries(calculatorsByCategory).map(([category, calculators]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {calculators.map((calculator) => (
                      <Card
                        key={calculator.id}
                        className={`cursor-pointer transition-all hover:shadow-card ${
                          selectedCalculator?.id === calculator.id
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handleCalculatorSelect(calculator)}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <calculator.icon className="h-4 w-4" />
                            {calculator.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {calculator.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculator Form */}
            {selectedCalculator && (
              <div className="max-w-2xl">
                <CalculatorForm
                  calculator={selectedCalculator}
                  onSubmit={handleCalculatorSubmit}
                  onCancel={() => setSelectedCalculator(null)}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        )}

        {step === 'result' && projectData && selectedCalculator && calculationResult && (
          <div className="max-w-4xl">
            <BudgetResult
              projectData={projectData}
              result={calculationResult}
              calculatorName={selectedCalculator.name}
              onExport={handleExport}
              onShare={handleShare}
              onGenerateProposal={handleGenerateProposal}
            />
          </div>
        )}

        {/* Empty State */}
        {step === 'calculator' && !selectedCalculator && (
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Selecione uma calculadora</h3>
                  <p className="text-sm text-muted-foreground">
                    Escolha um tipo de serviço para calcular o orçamento
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NewBudget;