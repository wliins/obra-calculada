import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  PenTool, 
  Building, 
  Zap, 
  Droplets, 
  Hammer,
  FileText,
  Calculator,
  TrendingUp
} from "lucide-react";

interface ServiceCalculator {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  inputs: {
    id: string;
    label: string;
    type: 'number' | 'select' | 'text';
    unit?: string;
    options?: string[];
    required: boolean;
  }[];
  materials: {
    name: string;
    unit: string;
    price: number;
    formula: string; // How to calculate quantity based on inputs
  }[];
  labor: {
    name: string;
    unit: string;
    price: number;
    formula: string;
  }[];
}

const serviceCalculators: ServiceCalculator[] = [
  {
    id: "projeto-arquitetonico",
    name: "Projeto Arquitetônico",
    description: "Cálculo para desenvolvimento de projeto arquitetônico",
    icon: PenTool,
    inputs: [
      { id: "area", label: "Área do projeto", type: "number", unit: "m²", required: true },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true },
      { id: "complexidade", label: "Complexidade", type: "select", options: ["Simples", "Média", "Alta"], required: true }
    ],
    materials: [
      { name: "Papel sulfite A1", unit: "folhas", price: 2.50, formula: "area * pavimentos * 0.1" },
      { name: "Plotagem A1", unit: "folhas", price: 15.00, formula: "pavimentos * 5" },
      { name: "Software (licença mensal)", unit: "mês", price: 300.00, formula: "1" }
    ],
    labor: [
      { name: "Arquiteto sênior", unit: "horas", price: 150.00, formula: "area * 0.8 * (complexidade === 'Alta' ? 1.5 : complexidade === 'Média' ? 1.2 : 1)" },
      { name: "Desenhista técnico", unit: "horas", price: 45.00, formula: "area * 1.2" },
      { name: "Estagiário", unit: "horas", price: 20.00, formula: "area * 0.5" }
    ]
  },
  {
    id: "projeto-estrutural",
    name: "Projeto Estrutural",
    description: "Cálculo para projeto estrutural em concreto armado",
    icon: Building,
    inputs: [
      { id: "area", label: "Área total", type: "number", unit: "m²", required: true },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true },
      { id: "tipo", label: "Tipo de estrutura", type: "select", options: ["Concreto armado", "Metálica", "Madeira"], required: true },
      { id: "cargas", label: "Cargas especiais", type: "select", options: ["Residencial", "Comercial", "Industrial"], required: true }
    ],
    materials: [
      { name: "Software estrutural", unit: "mês", price: 500.00, formula: "1" },
      { name: "Plotagem de plantas", unit: "folhas", price: 15.00, formula: "pavimentos * 8" },
      { name: "Memorial de cálculo", unit: "páginas", price: 1.00, formula: "area * 0.2" }
    ],
    labor: [
      { name: "Engenheiro estrutural", unit: "horas", price: 180.00, formula: "area * 1.0 * pavimentos * (tipo === 'Metálica' ? 1.3 : tipo === 'Madeira' ? 1.1 : 1)" },
      { name: "Projetista estrutural", unit: "horas", price: 80.00, formula: "area * 1.5" },
      { name: "Detalhista", unit: "horas", price: 50.00, formula: "area * 0.8" }
    ]
  },
  {
    id: "projeto-hidrossanitario",
    name: "Projeto Hidrossanitário",
    description: "Cálculo para projeto de instalações hidráulicas e sanitárias",
    icon: Droplets,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "banheiros", label: "Número de banheiros", type: "number", required: true },
      { id: "cozinhas", label: "Número de cozinhas", type: "number", required: true },
      { id: "areas_servico", label: "Áreas de serviço", type: "number", required: true }
    ],
    materials: [
      { name: "Software CAD", unit: "mês", price: 200.00, formula: "1" },
      { name: "Plotagem hidráulica", unit: "folhas", price: 15.00, formula: "(banheiros + cozinhas + areas_servico) * 2" },
      { name: "Memoriais técnicos", unit: "páginas", price: 1.50, formula: "area * 0.1" }
    ],
    labor: [
      { name: "Engenheiro hidráulico", unit: "horas", price: 160.00, formula: "area * 0.6 + (banheiros + cozinhas + areas_servico) * 8" },
      { name: "Projetista hidráulico", unit: "horas", price: 65.00, formula: "area * 0.8" },
      { name: "Desenhista", unit: "horas", price: 40.00, formula: "area * 0.4" }
    ]
  },
  {
    id: "projeto-eletrico",
    name: "Projeto Elétrico e SPDA",
    description: "Cálculo para projeto elétrico e proteção contra descargas",
    icon: Zap,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "pontos_tomada", label: "Pontos de tomada", type: "number", required: true },
      { id: "pontos_iluminacao", label: "Pontos de iluminação", type: "number", required: true },
      { id: "spda", label: "Inclui SPDA", type: "select", options: ["Sim", "Não"], required: true }
    ],
    materials: [
      { name: "Software elétrico", unit: "mês", price: 300.00, formula: "1" },
      { name: "Plotagem elétrica", unit: "folhas", price: 15.00, formula: "area * 0.01 + (spda === 'Sim' ? 3 : 0)" },
      { name: "ART - Projeto Elétrico", unit: "unidade", price: 180.00, formula: "1" },
      { name: "ART - SPDA", unit: "unidade", price: 150.00, formula: "spda === 'Sim' ? 1 : 0" }
    ],
    labor: [
      { name: "Engenheiro eletricista", unit: "horas", price: 170.00, formula: "area * 0.5 + (pontos_tomada + pontos_iluminacao) * 0.8 + (spda === 'Sim' ? area * 0.2 : 0)" },
      { name: "Projetista elétrico", unit: "horas", price: 70.00, formula: "area * 0.6" },
      { name: "Técnico SPDA", unit: "horas", price: 55.00, formula: "spda === 'Sim' ? area * 0.3 : 0" }
    ]
  },
  {
    id: "construcao-residencial",
    name: "Construção Residencial",
    description: "Cálculo para construção de casas residenciais",
    icon: Hammer,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "padrao", label: "Padrão da construção", type: "select", options: ["Popular", "Normal", "Alto"], required: true },
      { id: "fundacao", label: "Tipo de fundação", type: "select", options: ["Sapata", "Radier", "Estaca"], required: true }
    ],
    materials: [
      { name: "Concreto", unit: "m³", price: 380.00, formula: "area * 0.35 * (fundacao === 'Estaca' ? 1.3 : fundacao === 'Radier' ? 1.1 : 1)" },
      { name: "Aço CA-50", unit: "kg", price: 7.20, formula: "area * 45 * (padrao === 'Alto' ? 1.2 : padrao === 'Normal' ? 1 : 0.8)" },
      { name: "Tijolo cerâmico", unit: "unidade", price: 0.65, formula: "area * 85" },
      { name: "Telha cerâmica", unit: "m²", price: 18.50, formula: "area * 1.3" },
      { name: "Revestimento cerâmico", unit: "m²", price: 45.00, formula: "area * 0.6 * (padrao === 'Alto' ? 1.5 : padrao === 'Normal' ? 1 : 0.7)" }
    ],
    labor: [
      { name: "Pedreiro", unit: "dias", price: 180.00, formula: "area * 0.8" },
      { name: "Servente", unit: "dias", price: 120.00, formula: "area * 1.2" },
      { name: "Eletricista", unit: "dias", price: 200.00, formula: "area * 0.15" },
      { name: "Encanador", unit: "dias", price: 200.00, formula: "area * 0.12" },
      { name: "Azulejista", unit: "dias", price: 220.00, formula: "area * 0.25" }
    ]
  }
];

const IndividualCalculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string>("");
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (inputId: string, value: any) => {
    setInputs(prev => ({ ...prev, [inputId]: value }));
  };

  const calculateResults = () => {
    const calculator = serviceCalculators.find(c => c.id === selectedCalculator);
    if (!calculator) return;

    // Function to evaluate formulas safely
    const evaluateFormula = (formula: string, context: Record<string, any>) => {
      try {
        // Replace variables in formula with actual values
        let evaluatedFormula = formula;
        Object.entries(context).forEach(([key, value]) => {
          evaluatedFormula = evaluatedFormula.replace(new RegExp(key, 'g'), value?.toString() || '0');
        });
        
        // Evaluate simple expressions
        // This is a simplified evaluator - in production, use a proper expression parser
        return Function(`"use strict"; return (${evaluatedFormula})`)();
      } catch (error) {
        console.error('Error evaluating formula:', error);
        return 0;
      }
    };

    const materialResults = calculator.materials.map(material => {
      const quantity = evaluateFormula(material.formula, inputs);
      const total = quantity * material.price;
      return {
        ...material,
        quantity: Math.ceil(quantity * 100) / 100, // Round to 2 decimals
        total
      };
    });

    const laborResults = calculator.labor.map(labor => {
      const quantity = evaluateFormula(labor.formula, inputs);
      const total = quantity * labor.price;
      return {
        ...labor,
        quantity: Math.ceil(quantity * 100) / 100,
        total
      };
    });

    const totalMaterials = materialResults.reduce((sum, item) => sum + item.total, 0);
    const totalLabor = laborResults.reduce((sum, item) => sum + item.total, 0);
    const grandTotal = totalMaterials + totalLabor;

    setResults({
      materials: materialResults,
      labor: laborResults,
      totals: {
        materials: totalMaterials,
        labor: totalLabor,
        total: grandTotal
      }
    });
  };

  const selectedCalc = serviceCalculators.find(c => c.id === selectedCalculator);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calculadoras Individuais</h1>
          <p className="text-muted-foreground">Calcule orçamentos específicos por tipo de serviço</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Calculator Selection and Inputs */}
          <div className="space-y-6">
            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Selecionar Calculadora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedCalculator} onValueChange={setSelectedCalculator}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCalculators.map((calc) => (
                      <SelectItem key={calc.id} value={calc.id}>
                        <div className="flex items-center gap-2">
                          <calc.icon className="h-4 w-4" />
                          {calc.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Calculator Inputs */}
            {selectedCalc && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <selectedCalc.icon className="h-5 w-5" />
                    {selectedCalc.name}
                  </CardTitle>
                  <CardDescription>{selectedCalc.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCalc.inputs.map((input) => (
                    <div key={input.id} className="space-y-2">
                      <Label htmlFor={input.id}>
                        {input.label} {input.unit && `(${input.unit})`}
                        {input.required && <span className="text-destructive">*</span>}
                      </Label>
                      
                      {input.type === 'number' && (
                        <Input
                          id={input.id}
                          type="number"
                          value={inputs[input.id] || ''}
                          onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value) || 0)}
                          placeholder={`Digite ${input.label.toLowerCase()}`}
                        />
                      )}
                      
                      {input.type === 'select' && (
                        <Select
                          value={inputs[input.id] || ''}
                          onValueChange={(value) => handleInputChange(input.id, value)}
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
                      )}
                    </div>
                  ))}
                  
                  <Button onClick={calculateResults} className="w-full mt-6">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Calcular Orçamento
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Results */}
          <div>
            {results ? (
              <div className="space-y-6">
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Orçamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Materiais:</span>
                        <span className="font-medium">
                          {results.totals.materials.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Mão de Obra:</span>
                        <span className="font-medium">
                          {results.totals.labor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Geral:</span>
                        <span className="text-primary">
                          {results.totals.total.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Materials Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Materiais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.materials.map((material: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {material.quantity} {material.unit} × {material.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                          </div>
                          <div className="font-medium">
                            {material.total.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Labor Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mão de Obra</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.labor.map((labor: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <div>
                            <div className="font-medium">{labor.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {labor.quantity} {labor.unit} × {labor.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                          </div>
                          <div className="font-medium">
                            {labor.total.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Selecione uma calculadora
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha um tipo de serviço e preencha os dados para ver o orçamento detalhado
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IndividualCalculators;