import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CalculatorEditor from "@/components/CalculatorEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings,
  Calculator,
  RefreshCw,
  Trash2,
  Plus,
  PenTool,
  Building,
  Droplets,
  Zap,
  Home,
  Package,
  Users,
  Edit3
} from "lucide-react";
import { useCalculatorConfig, Calculator as CalculatorType } from "@/hooks/useCalculatorConfig";
import { useToast } from "@/components/ui/use-toast";

const iconMap = {
  PenTool,
  Building,
  Droplets,
  Zap,
  Home,
  Calculator
};

const CalculatorSettings = () => {
  const { calculators, updateCalculator, removeCalculator, resetToDefaults } = useCalculatorConfig();
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSaveCalculator = (calculator: CalculatorType) => {
    updateCalculator(calculator);
    toast({
      title: "Calculadora atualizada",
      description: "As configurações foram salvas com sucesso.",
    });
  };

  const handleRemoveCalculator = (calculatorId: string) => {
    removeCalculator(calculatorId);
    if (selectedCalculator === calculatorId) {
      setSelectedCalculator(null);
    }
    toast({
      title: "Calculadora removida",
      description: "A calculadora foi removida com sucesso.",
      variant: "destructive"
    });
  };

  const handleResetToDefaults = () => {
    resetToDefaults();
    setSelectedCalculator(null);
    toast({
      title: "Configurações restauradas",
      description: "Todas as calculadoras foram restauradas para os padrões.",
    });
  };

  const selectedCalc = calculators.find(calc => calc.id === selectedCalculator);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Configurações das Calculadoras</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Personalize suas calculadoras adicionando ou removendo itens, materiais e mão de obra
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4" />
                Restaurar Padrões
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Restaurar Configurações Padrão</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação irá remover todas as suas personalizações e restaurar as calculadoras
                  para os valores padrão. Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetToDefaults}>
                  Restaurar Padrões
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="editor">Editor de Calculadora</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calculator) => {
                const Icon = iconMap[calculator.icon as keyof typeof iconMap] || Calculator;
                
                return (
                  <Card key={calculator.id} className="hover:shadow-glow transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{calculator.name}</CardTitle>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCalculator(calculator.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remover Calculadora</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja remover a calculadora "{calculator.name}"?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveCalculator(calculator.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <CardDescription>{calculator.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Materiais</span>
                            </div>
                            <Badge variant="secondary">{calculator.materials.length}</Badge>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Mão de Obra</span>
                            </div>
                            <Badge variant="secondary">{calculator.labor.length}</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Campos de entrada:</p>
                          <div className="flex flex-wrap gap-1">
                            {calculator.inputs.slice(0, 3).map((input, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {input.label}
                              </Badge>
                            ))}
                            {calculator.inputs.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{calculator.inputs.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="editor" className="space-y-6">
            {!selectedCalculator ? (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Selecione uma Calculadora</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Escolha uma calculadora da lista acima para editar seus materiais e mão de obra
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCalculator(calculators[0]?.id || null)}
                  >
                    <Edit3 className="h-4 w-4" />
                    Editar Primeira Calculadora
                  </Button>
                </CardContent>
              </Card>
            ) : selectedCalc ? (
              <CalculatorEditor
                calculator={selectedCalc}
                onSave={handleSaveCalculator}
              />
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CalculatorSettings;