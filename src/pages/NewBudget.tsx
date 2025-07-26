import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BudgetForm from "@/components/BudgetForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2, 
  Save, 
  FileText,
  DollarSign,
  Package,
  Users,
  Calculator,
  PenTool,
  Building,
  Zap,
  Droplets,
  Home,
  Search
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
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState<Record<string, any>>({});
  const [calculatorResults, setCalculatorResults] = useState<Record<string, any>>({});

  // Calculadoras individuais
  const calculators = [
    {
      id: "projeto-arquitetonico",
      name: "Projeto Arquitetônico",
      description: "Cálculo para desenvolvimento de projeto arquitetônico",
      icon: PenTool,
      inputs: [
        { id: "area", label: "Área do projeto", type: "number", unit: "m²", required: true },
        { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true },
        { id: "complexidade", label: "Complexidade", type: "select", options: ["Baixa", "Média", "Alta"], required: true }
      ],
      materials: [
        { name: "Levantamento topográfico", formula: "area * 8" },
        { name: "Plantas arquitetônicas", formula: "area * 15" },
        { name: "Cortes e fachadas", formula: "pavimentos * 800" },
        { name: "Detalhamentos", formula: "area * 5" }
      ],
      labor: [
        { name: "Arquiteto", formula: "area * 25" },
        { name: "Desenhista técnico", formula: "area * 12" },
        { name: "Consultorias especializadas", formula: "area * 8" }
      ]
    },
    {
      id: "projeto-estrutural",
      name: "Projeto Estrutural",
      description: "Dimensionamento de estruturas em concreto, aço ou madeira",
      icon: Building,
      inputs: [
        { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
        { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true },
        { id: "tipo", label: "Tipo de estrutura", type: "select", options: ["Concreto armado", "Estrutura metálica", "Madeira"], required: true }
      ],
      materials: [
        { name: "Sondagem do solo", formula: "area * 12" },
        { name: "Cálculos estruturais", formula: "area * 18" },
        { name: "Plantas de formas", formula: "pavimentos * 600" },
        { name: "Detalhamento de armaduras", formula: "area * 10" }
      ],
      labor: [
        { name: "Engenheiro estrutural", formula: "area * 35" },
        { name: "Projetista", formula: "area * 15" },
        { name: "Verificação e revisão", formula: "area * 8" }
      ]
    },
    {
      id: "projeto-hidrossanitario",
      name: "Projeto Hidrossanitário",
      description: "Sistemas de água fria, quente, esgoto e águas pluviais",
      icon: Droplets,
      inputs: [
        { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
        { id: "pontos", label: "Pontos hidráulicos", type: "number", required: true },
        { id: "tipo", label: "Tipo de instalação", type: "select", options: ["Residencial", "Comercial", "Industrial"], required: true }
      ],
      materials: [
        { name: "Projeto de água fria", formula: "pontos * 85" },
        { name: "Projeto de esgoto", formula: "pontos * 90" },
        { name: "Projeto de águas pluviais", formula: "area * 5" },
        { name: "Especificações técnicas", formula: "pontos * 25" }
      ],
      labor: [
        { name: "Engenheiro hidráulico", formula: "pontos * 45" },
        { name: "Projetista hidráulico", formula: "pontos * 20" },
        { name: "Verificação técnica", formula: "pontos * 10" }
      ]
    },
    {
      id: "projeto-eletrico",
      name: "Projeto Elétrico e SPDA",
      description: "Instalações elétricas e sistema de proteção contra descargas",
      icon: Zap,
      inputs: [
        { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
        { id: "pontos", label: "Pontos elétricos", type: "number", required: true },
        { id: "potencia", label: "Potência instalada", type: "number", unit: "kW", required: true }
      ],
      materials: [
        { name: "Projeto elétrico básico", formula: "pontos * 45" },
        { name: "Dimensionamento de quadros", formula: "potencia * 120" },
        { name: "SPDA", formula: "area * 8" },
        { name: "Memorial descritivo", formula: "pontos * 15" }
      ],
      labor: [
        { name: "Engenheiro eletricista", formula: "pontos * 35" },
        { name: "Projetista elétrico", formula: "pontos * 18" },
        { name: "Verificação e cálculos", formula: "potencia * 80" }
      ]
    },
    {
      id: "construcao-residencial",
      name: "Construção Residencial",
      description: "Construção completa de casas e edifícios residenciais",
      icon: Home,
      inputs: [
        { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
        { id: "padrao", label: "Padrão de acabamento", type: "select", options: ["Simples", "Médio", "Alto"], required: true },
        { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true }
      ],
      materials: [
        { name: "Fundação", formula: "area * 180" },
        { name: "Estrutura", formula: "area * 320" },
        { name: "Alvenaria", formula: "area * 150" },
        { name: "Cobertura", formula: "area * 120" },
        { name: "Instalações", formula: "area * 200" },
        { name: "Acabamentos", formula: "area * 280" }
      ],
      labor: [
        { name: "Fundação", formula: "area * 85" },
        { name: "Estrutura", formula: "area * 140" },
        { name: "Alvenaria", formula: "area * 90" },
        { name: "Cobertura", formula: "area * 65" },
        { name: "Instalações", formula: "area * 95" },
        { name: "Acabamentos", formula: "area * 120" }
      ]
    }
  ];

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

  const calculateIndividual = (calculatorId: string, inputs: Record<string, any>) => {
    const calculator = calculators.find(c => c.id === calculatorId);
    if (!calculator) return;

    const materials: Record<string, number> = {};
    const labor: Record<string, number> = {};

    // Aplicar multiplicadores baseados em seleções
    let complexityMultiplier = 1;
    if (inputs.complexidade === "Média" || inputs.padrao === "Médio") complexityMultiplier = 1.3;
    if (inputs.complexidade === "Alta" || inputs.padrao === "Alto") complexityMultiplier = 1.7;
    if (inputs.tipo === "Comercial") complexityMultiplier = 1.2;
    if (inputs.tipo === "Industrial") complexityMultiplier = 1.5;
    if (inputs.tipo === "Estrutura metálica") complexityMultiplier = 1.4;
    if (inputs.tipo === "Madeira") complexityMultiplier = 0.8;

    // Calcular materiais
    calculator.materials.forEach(item => {
      const formula = item.formula.replace(/(\w+)/g, (match) => {
        return inputs[match] || match;
      });
      try {
        materials[item.name] = Math.round(eval(formula) * complexityMultiplier);
      } catch {
        materials[item.name] = 0;
      }
    });

    // Calcular mão de obra
    calculator.labor.forEach(item => {
      const formula = item.formula.replace(/(\w+)/g, (match) => {
        return inputs[match] || match;
      });
      try {
        labor[item.name] = Math.round(eval(formula) * complexityMultiplier);
      } catch {
        labor[item.name] = 0;
      }
    });

    const totalMaterials = Object.values(materials).reduce((a, b) => a + b, 0);
    const totalLabor = Object.values(labor).reduce((a, b) => a + b, 0);
    const total = totalMaterials + totalLabor;

    setCalculatorResults({
      ...calculatorResults,
      [calculatorId]: {
        materials,
        labor,
        totalMaterials,
        totalLabor,
        total,
        inputs
      }
    });
  };

  const handleCalculatorInputChange = (calculatorId: string, field: string, value: any) => {
    const newInputs = {
      ...calculatorInputs,
      [calculatorId]: {
        ...calculatorInputs[calculatorId],
        [field]: value
      }
    };
    setCalculatorInputs(newInputs);
  };

  const handleCalculatorSubmit = (calculatorId: string) => {
    const inputs = calculatorInputs[calculatorId] || {};
    calculateIndividual(calculatorId, inputs);
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

        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="geral">Orçamento Geral</TabsTrigger>
            <TabsTrigger value="individual">Calculadoras Individuais</TabsTrigger>
          </TabsList>

          <TabsContent value="geral" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Seletor de Calculadora */}
              <div className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Selecionar Calculadora</CardTitle>
                    <CardDescription>
                      Escolha o tipo de serviço para calcular
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {calculators.map((calc) => (
                        <Button
                          key={calc.id}
                          variant={selectedCalculator === calc.id ? "default" : "outline"}
                          className="justify-start h-auto p-4"
                          onClick={() => setSelectedCalculator(calc.id)}
                        >
                          <calc.icon className="h-5 w-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">{calc.name}</div>
                            <div className="text-xs text-muted-foreground">{calc.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Form da Calculadora Selecionada */}
                {selectedCalculator && (
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle>
                        {calculators.find(c => c.id === selectedCalculator)?.name}
                      </CardTitle>
                      <CardDescription>
                        Preencha os dados para calcular o orçamento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {calculators.find(c => c.id === selectedCalculator)?.inputs.map((input) => (
                        <div key={input.id} className="space-y-2">
                          <Label htmlFor={input.id}>
                            {input.label} {input.unit && `(${input.unit})`}
                            {input.required && <span className="text-destructive">*</span>}
                          </Label>
                          {input.type === "select" ? (
                            <Select
                              value={calculatorInputs[selectedCalculator]?.[input.id] || ""}
                              onValueChange={(value) => handleCalculatorInputChange(selectedCalculator, input.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Selecione ${input.label.toLowerCase()}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {input.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={input.id}
                              type={input.type}
                              placeholder={`Digite ${input.label.toLowerCase()}`}
                              value={calculatorInputs[selectedCalculator]?.[input.id] || ""}
                              onChange={(e) => handleCalculatorInputChange(selectedCalculator, input.id, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                      <Button 
                        onClick={() => handleCalculatorSubmit(selectedCalculator)}
                        className="w-full"
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Calcular Orçamento
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Resultados */}
              <div className="space-y-6">
                {selectedCalculator && calculatorResults[selectedCalculator] ? (
                  <>
                    {/* Summary */}
                    <Card className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-primary" />
                          Resultado do Cálculo
                        </CardTitle>
                        <CardDescription>
                          {calculators.find(c => c.id === selectedCalculator)?.name}
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
                              }).format(calculatorResults[selectedCalculator].totalMaterials)}
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
                              }).format(calculatorResults[selectedCalculator].totalLabor)}
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
                              }).format(calculatorResults[selectedCalculator].total)}
                            </p>
                          </div>
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
                            Materiais/Serviços
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(calculatorResults[selectedCalculator].materials).map(([item, cost]) => (
                              <div key={item} className="flex justify-between items-center">
                                <span className="text-sm">{item}</span>
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
                            {Object.entries(calculatorResults[selectedCalculator].labor).map(([item, cost]) => (
                              <div key={item} className="flex justify-between items-center">
                                <span className="text-sm">{item}</span>
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
                          <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Selecione uma calculadora</h3>
                          <p className="text-sm text-muted-foreground">
                            Escolha um tipo de serviço e preencha os dados para ver o orçamento
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NewBudget;