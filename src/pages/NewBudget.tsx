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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      materials: [
        { name: "Concreto", quantity: Math.round(area * 0.15), unit: "m³", unitPrice: 300, total: area * 45 },
        { name: "Aço", quantity: Math.round(area * 7), unit: "kg", unitPrice: 4, total: area * 28 },
        { name: "Tijolos", quantity: Math.round(area * 25), unit: "unidades", unitPrice: 3.28, total: area * 82 },
        { name: "Revestimento", quantity: Math.round(area * 2.5), unit: "m²", unitPrice: 14, total: area * 35 },
        { name: "Tinta", quantity: Math.round(area * 0.5), unit: "litros", unitPrice: 30, total: area * 15 },
        { name: "Janelas", quantity: rooms, unit: "unidades", unitPrice: 800, total: rooms * 800 },
        { name: "Portas", quantity: rooms + 1, unit: "unidades", unitPrice: 600, total: (rooms + 1) * 600 },
        { name: "Material Hidráulico", quantity: bathrooms, unit: "conjunto", unitPrice: 1200, total: bathrooms * 1200 },
        { name: "Material Elétrico", quantity: Math.round(area * 0.8), unit: "pontos", unitPrice: 31.25, total: area * 25 }
      ],
      labor: [
        { name: "Construção/Estrutura", hours: Math.round(area * 4), unit: "horas", hourlyRate: 45, total: area * 180 },
        { name: "Alvenaria", hours: Math.round(area * 3), unit: "horas", hourlyRate: 40, total: area * 120 },
        { name: "Eletricista", hours: Math.round(area * 1.5), unit: "horas", hourlyRate: 30, total: area * 45 },
        { name: "Encanador", hours: Math.round(bathrooms * 10), unit: "horas", hourlyRate: 40, total: bathrooms * 400 },
        { name: "Pintura", hours: Math.round(area * 1.2), unit: "horas", hourlyRate: 29.17, total: area * 35 }
      ]
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

    const materials: any[] = [];
    const labor: any[] = [];

    // Aplicar multiplicadores baseados em seleções
    let complexityMultiplier = 1;
    if (inputs.complexidade === "Média" || inputs.padrao === "Médio") complexityMultiplier = 1.3;
    if (inputs.complexidade === "Alta" || inputs.padrao === "Alto") complexityMultiplier = 1.7;
    if (inputs.tipo === "Comercial") complexityMultiplier = 1.2;
    if (inputs.tipo === "Industrial") complexityMultiplier = 1.5;
    if (inputs.tipo === "Estrutura metálica") complexityMultiplier = 1.4;
    if (inputs.tipo === "Madeira") complexityMultiplier = 0.8;

    // Calcular materiais com quantidades detalhadas
    calculator.materials.forEach(item => {
      const formula = item.formula.replace(/(\w+)/g, (match) => {
        return inputs[match] || match;
      });
      try {
        const cost = Math.round(eval(formula) * complexityMultiplier);
        const quantity = getQuantityForItem(item.name, inputs, complexityMultiplier);
        materials.push({
          name: item.name,
          quantity: quantity.amount,
          unit: quantity.unit,
          unitPrice: Math.round(cost / quantity.amount),
          total: cost
        });
      } catch {
        materials.push({
          name: item.name,
          quantity: 0,
          unit: "unidades",
          unitPrice: 0,
          total: 0
        });
      }
    });

    // Calcular mão de obra com horas detalhadas
    calculator.labor.forEach(item => {
      const formula = item.formula.replace(/(\w+)/g, (match) => {
        return inputs[match] || match;
      });
      try {
        const cost = Math.round(eval(formula) * complexityMultiplier);
        const hours = getLaborHoursForItem(item.name, inputs, complexityMultiplier);
        labor.push({
          name: item.name,
          hours: hours,
          unit: "horas",
          hourlyRate: Math.round(cost / hours),
          total: cost
        });
      } catch {
        labor.push({
          name: item.name,
          hours: 0,
          unit: "horas",
          hourlyRate: 0,
          total: 0
        });
      }
    });

    const totalMaterials = materials.reduce((sum, item) => sum + item.total, 0);
    const totalLabor = labor.reduce((sum, item) => sum + item.total, 0);
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

  // Função auxiliar para calcular quantidades específicas de materiais
  const getQuantityForItem = (itemName: string, inputs: any, multiplier: number) => {
    const area = inputs.area || 0;
    const pontos = inputs.pontos || 0;
    const pavimentos = inputs.pavimentos || 1;

    const quantities: Record<string, any> = {
      "Levantamento topográfico": { amount: Math.round(area * 0.1 * multiplier), unit: "serviços" },
      "Plantas arquitetônicas": { amount: Math.round(pavimentos * multiplier), unit: "pranchas" },
      "Cortes e fachadas": { amount: Math.round(pavimentos * 2 * multiplier), unit: "pranchas" },
      "Detalhamentos": { amount: Math.round(area * 0.05 * multiplier), unit: "detalhes" },
      "Sondagem do solo": { amount: Math.round(area * 0.02 * multiplier), unit: "furos" },
      "Cálculos estruturais": { amount: Math.round(area * 0.1 * multiplier), unit: "serviços" },
      "Plantas de formas": { amount: Math.round(pavimentos * multiplier), unit: "pranchas" },
      "Detalhamento de armaduras": { amount: Math.round(area * 0.08 * multiplier), unit: "pranchas" },
      "Projeto de água fria": { amount: Math.round(pontos * 0.5 * multiplier), unit: "pontos" },
      "Projeto de esgoto": { amount: Math.round(pontos * 0.6 * multiplier), unit: "pontos" },
      "Projeto de águas pluviais": { amount: Math.round(area * 0.02 * multiplier), unit: "m²" },
      "Especificações técnicas": { amount: Math.round(pontos * 0.3 * multiplier), unit: "itens" },
      "Projeto elétrico básico": { amount: Math.round(pontos * 0.8 * multiplier), unit: "pontos" },
      "Dimensionamento de quadros": { amount: Math.round((inputs.potencia || 0) * 0.1 * multiplier), unit: "quadros" },
      "SPDA": { amount: Math.round(area * 0.01 * multiplier), unit: "m²" },
      "Memorial descritivo": { amount: Math.round(pontos * 0.2 * multiplier), unit: "páginas" },
      "Fundação": { amount: Math.round(area * 0.2 * multiplier), unit: "m³" },
      "Estrutura": { amount: Math.round(area * 0.15 * multiplier), unit: "m³" },
      "Alvenaria": { amount: Math.round(area * 25 * multiplier), unit: "m²" },
      "Cobertura": { amount: Math.round(area * 1.2 * multiplier), unit: "m²" },
      "Instalações": { amount: Math.round(area * 0.5 * multiplier), unit: "conjuntos" },
      "Acabamentos": { amount: Math.round(area * 2 * multiplier), unit: "m²" }
    };

    return quantities[itemName] || { amount: Math.round(1 * multiplier), unit: "unidades" };
  };

  // Função auxiliar para calcular horas de mão de obra
  const getLaborHoursForItem = (itemName: string, inputs: any, multiplier: number) => {
    const area = inputs.area || 0;
    const pontos = inputs.pontos || 0;

    const hours: Record<string, number> = {
      "Arquiteto": Math.round(area * 0.5 * multiplier),
      "Desenhista técnico": Math.round(area * 0.3 * multiplier),
      "Consultorias especializadas": Math.round(area * 0.2 * multiplier),
      "Engenheiro estrutural": Math.round(area * 0.8 * multiplier),
      "Projetista": Math.round(area * 0.4 * multiplier),
      "Verificação e revisão": Math.round(area * 0.2 * multiplier),
      "Engenheiro hidráulico": Math.round(pontos * 1.2 * multiplier),
      "Projetista hidráulico": Math.round(pontos * 0.6 * multiplier),
      "Verificação técnica": Math.round(pontos * 0.3 * multiplier),
      "Engenheiro eletricista": Math.round(pontos * 1 * multiplier),
      "Projetista elétrico": Math.round(pontos * 0.5 * multiplier),
      "Verificação e cálculos": Math.round((inputs.potencia || 0) * 2 * multiplier),
      "Fundação": Math.round(area * 2 * multiplier),
      "Estrutura": Math.round(area * 3.5 * multiplier),
      "Alvenaria": Math.round(area * 2.5 * multiplier),
      "Cobertura": Math.round(area * 1.8 * multiplier),
      "Instalações": Math.round(area * 2.2 * multiplier),
      "Acabamentos": Math.round(area * 3 * multiplier)
    };

    return hours[itemName] || Math.round(8 * multiplier);
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
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Novo Orçamento</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Crie um orçamento preciso e detalhado
            </p>
          </div>
          {calculation && (
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Salvar Rascunho</span>
                <span className="sm:hidden">Salvar</span>
              </Button>
              <Button variant="accent" className="w-full sm:w-auto">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Exportar PDF</span>
                <span className="sm:hidden">PDF</span>
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
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Composição de Materiais
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-semibold">Material</TableHead>
                                  <TableHead className="text-center font-semibold">Qtd</TableHead>
                                  <TableHead className="text-center font-semibold">Unidade</TableHead>
                                  <TableHead className="text-right font-semibold">Valor Unit.</TableHead>
                                  <TableHead className="text-right font-semibold">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {calculation.breakdown.materials.map((item: any, index: number) => (
                                  <TableRow key={index} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-center">{item.quantity.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell className="text-center">{item.unit}</TableCell>
                                    <TableCell className="text-right">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.unitPrice)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.total)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="border-t-2 bg-muted/30">
                                  <TableCell colSpan={4} className="font-bold">Subtotal Materiais</TableCell>
                                  <TableCell className="text-right font-bold text-primary">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    }).format(calculation.materials)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        {/* Labor */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Composição de Mão de Obra
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-semibold">Serviço</TableHead>
                                  <TableHead className="text-center font-semibold">Horas</TableHead>
                                  <TableHead className="text-center font-semibold">Unidade</TableHead>
                                  <TableHead className="text-right font-semibold">Valor/Hora</TableHead>
                                  <TableHead className="text-right font-semibold">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {calculation.breakdown.labor.map((item: any, index: number) => (
                                  <TableRow key={index} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-center">{item.hours.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell className="text-center">{item.unit}</TableCell>
                                    <TableCell className="text-right">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.hourlyRate)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.total)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="border-t-2 bg-muted/30">
                                  <TableCell colSpan={4} className="font-bold">Subtotal Mão de Obra</TableCell>
                                  <TableCell className="text-right font-bold text-primary">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    }).format(calculation.labor)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
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
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Composição de Materiais/Serviços
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-semibold">Item</TableHead>
                                  <TableHead className="text-center font-semibold">Qtd</TableHead>
                                  <TableHead className="text-center font-semibold">Unidade</TableHead>
                                  <TableHead className="text-right font-semibold">Valor Unit.</TableHead>
                                  <TableHead className="text-right font-semibold">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {calculatorResults[selectedCalculator].materials.map((item: any, index: number) => (
                                  <TableRow key={index} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-center">{item.quantity.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell className="text-center">{item.unit}</TableCell>
                                    <TableCell className="text-right">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.unitPrice)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.total)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="border-t-2 bg-muted/30">
                                  <TableCell colSpan={4} className="font-bold">Subtotal Materiais</TableCell>
                                  <TableCell className="text-right font-bold text-primary">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    }).format(calculatorResults[selectedCalculator].totalMaterials)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                        {/* Labor */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Composição de Mão de Obra
                          </h4>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-semibold">Profissional</TableHead>
                                  <TableHead className="text-center font-semibold">Horas</TableHead>
                                  <TableHead className="text-center font-semibold">Unidade</TableHead>
                                  <TableHead className="text-right font-semibold">Valor/Hora</TableHead>
                                  <TableHead className="text-right font-semibold">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {calculatorResults[selectedCalculator].labor.map((item: any, index: number) => (
                                  <TableRow key={index} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-center">{item.hours.toLocaleString('pt-BR')}</TableCell>
                                    <TableCell className="text-center">{item.unit}</TableCell>
                                    <TableCell className="text-right">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.hourlyRate)}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                      {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                      }).format(item.total)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow className="border-t-2 bg-muted/30">
                                  <TableCell colSpan={4} className="font-bold">Subtotal Mão de Obra</TableCell>
                                  <TableCell className="text-right font-bold text-primary">
                                    {new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL'
                                    }).format(calculatorResults[selectedCalculator].totalLabor)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
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