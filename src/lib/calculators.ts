import { PenTool, Building, Droplets, Zap, Home, Wrench } from "lucide-react";

export interface CalculatorInput {
  id: string;
  label: string;
  type: "number" | "select" | "text";
  unit?: string;
  options?: string[];
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculatorItem {
  name: string;
  formula: string;
  unitPrice?: number;
  hourlyRate?: number;
  unit?: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  inputs: CalculatorInput[];
  materials: CalculatorItem[];
  labor: CalculatorItem[];
  enabled: boolean;
}

export interface CalculationResult {
  materials: Array<{
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
  }>;
  labor: Array<{
    name: string;
    hours: number;
    unit: string;
    hourlyRate: number;
    total: number;
  }>;
  totalMaterials: number;
  totalLabor: number;
  total: number;
}

// Calculadoras padrão
export const defaultCalculators: Calculator[] = [
  {
    id: "projeto-arquitetonico",
    name: "Projeto Arquitetônico",
    description: "Cálculo para desenvolvimento de projeto arquitetônico completo",
    icon: PenTool,
    category: "Projetos",
    enabled: true,
    inputs: [
      { id: "area", label: "Área do projeto", type: "number", unit: "m²", required: true, min: 1, max: 10000 },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true, min: 1, max: 100 },
      { id: "complexidade", label: "Complexidade", type: "select", options: ["Baixa", "Média", "Alta"], required: true }
    ],
    materials: [
      { name: "Levantamento topográfico", formula: "area * 8", unitPrice: 1, unit: "m²" },
      { name: "Plantas arquitetônicas", formula: "area * 15", unitPrice: 1, unit: "m²" },
      { name: "Cortes e fachadas", formula: "pavimentos * 800", unitPrice: 1, unit: "un" },
      { name: "Detalhamentos", formula: "area * 5", unitPrice: 1, unit: "m²" }
    ],
    labor: [
      { name: "Arquiteto", formula: "area * 25", hourlyRate: 150, unit: "h" },
      { name: "Desenhista técnico", formula: "area * 12", hourlyRate: 80, unit: "h" },
      { name: "Consultorias especializadas", formula: "area * 8", hourlyRate: 200, unit: "h" }
    ]
  },
  {
    id: "projeto-estrutural",
    name: "Projeto Estrutural",
    description: "Dimensionamento de estruturas em concreto, aço ou madeira",
    icon: Building,
    category: "Projetos",
    enabled: true,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true, min: 1, max: 10000 },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true, min: 1, max: 100 },
      { id: "tipo", label: "Tipo de estrutura", type: "select", options: ["Concreto armado", "Estrutura metálica", "Madeira"], required: true }
    ],
    materials: [
      { name: "Sondagem do solo", formula: "area * 12", unitPrice: 1, unit: "m²" },
      { name: "Cálculos estruturais", formula: "area * 18", unitPrice: 1, unit: "m²" },
      { name: "Plantas de formas", formula: "pavimentos * 600", unitPrice: 1, unit: "un" },
      { name: "Detalhamento de armaduras", formula: "area * 10", unitPrice: 1, unit: "m²" }
    ],
    labor: [
      { name: "Engenheiro estrutural", formula: "area * 35", hourlyRate: 200, unit: "h" },
      { name: "Projetista", formula: "area * 15", hourlyRate: 100, unit: "h" },
      { name: "Verificação e revisão", formula: "area * 8", hourlyRate: 250, unit: "h" }
    ]
  },
  {
    id: "projeto-hidrossanitario",
    name: "Projeto Hidrossanitário",
    description: "Sistemas de água fria, quente, esgoto e águas pluviais",
    icon: Droplets,
    category: "Projetos",
    enabled: true,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true, min: 1, max: 10000 },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true, min: 1, max: 100 },
      { id: "pontos", label: "Pontos de água", type: "number", required: true, min: 1, max: 1000 }
    ],
    materials: [
      { name: "Plantas hidráulicas", formula: "area * 8", unitPrice: 1, unit: "m²" },
      { name: "Memorial descritivo", formula: "area * 3", unitPrice: 1, unit: "m²" },
      { name: "Especificações técnicas", formula: "pontos * 50", unitPrice: 1, unit: "un" }
    ],
    labor: [
      { name: "Engenheiro hidráulico", formula: "area * 20", hourlyRate: 180, unit: "h" },
      { name: "Projetista", formula: "area * 10", hourlyRate: 90, unit: "h" }
    ]
  },
  {
    id: "projeto-eletrico",
    name: "Projeto Elétrico",
    description: "Instalações elétricas e sistemas de automação",
    icon: Zap,
    category: "Projetos",
    enabled: true,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true, min: 1, max: 10000 },
      { id: "pontos", label: "Pontos elétricos", type: "number", required: true, min: 1, max: 1000 },
      { id: "complexidade", label: "Complexidade", type: "select", options: ["Baixa", "Média", "Alta"], required: true }
    ],
    materials: [
      { name: "Plantas elétricas", formula: "area * 10", unitPrice: 1, unit: "m²" },
      { name: "Quadro de distribuição", formula: "pontos * 30", unitPrice: 1, unit: "un" },
      { name: "Especificações técnicas", formula: "area * 4", unitPrice: 1, unit: "m²" }
    ],
    labor: [
      { name: "Engenheiro elétrico", formula: "area * 22", hourlyRate: 170, unit: "h" },
      { name: "Projetista", formula: "area * 12", hourlyRate: 85, unit: "h" }
    ]
  },
  {
    id: "construcao-residencial",
    name: "Construção Residencial",
    description: "Construção de casas e apartamentos",
    icon: Home,
    category: "Construção",
    enabled: true,
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true, min: 1, max: 10000 },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true, min: 1, max: 100 },
      { id: "padrao", label: "Padrão de acabamento", type: "select", options: ["Baixo", "Médio", "Alto", "Luxo"], required: true }
    ],
    materials: [
      { name: "Fundação", formula: "area * 120", unitPrice: 1, unit: "m²" },
      { name: "Alvenaria", formula: "area * 180", unitPrice: 1, unit: "m²" },
      { name: "Acabamento", formula: "area * 250", unitPrice: 1, unit: "m²" },
      { name: "Instalações", formula: "area * 150", unitPrice: 1, unit: "m²" }
    ],
    labor: [
      { name: "Pedreiro", formula: "area * 40", hourlyRate: 45, unit: "h" },
      { name: "Eletricista", formula: "area * 15", hourlyRate: 60, unit: "h" },
      { name: "Encanador", formula: "area * 12", hourlyRate: 55, unit: "h" }
    ]
  },
  {
    id: "reforma",
    name: "Reforma",
    description: "Reformas e adequações de espaços existentes",
    icon: Wrench,
    category: "Construção",
    enabled: true,
    inputs: [
      { id: "area", label: "Área a reformar", type: "number", unit: "m²", required: true, min: 1, max: 10000 },
      { id: "tipo", label: "Tipo de reforma", type: "select", options: ["Pintura", "Acabamento", "Estrutural", "Completa"], required: true },
      { id: "complexidade", label: "Complexidade", type: "select", options: ["Baixa", "Média", "Alta"], required: true }
    ],
    materials: [
      { name: "Demolição", formula: "area * 80", unitPrice: 1, unit: "m²" },
      { name: "Preparação", formula: "area * 60", unitPrice: 1, unit: "m²" },
      { name: "Execução", formula: "area * 200", unitPrice: 1, unit: "m²" },
      { name: "Acabamento", formula: "area * 150", unitPrice: 1, unit: "m²" }
    ],
    labor: [
      { name: "Pedreiro", formula: "area * 35", hourlyRate: 45, unit: "h" },
      { name: "Auxiliar", formula: "area * 25", hourlyRate: 30, unit: "h" },
      { name: "Mestre de obras", formula: "area * 8", hourlyRate: 80, unit: "h" }
    ]
  }
];

// Função para calcular orçamento usando uma calculadora específica
export function calculateBudget(calculator: Calculator, inputs: Record<string, any>): CalculationResult {
  const materials = calculator.materials.map(item => {
    const quantity = evaluateFormula(item.formula, inputs);
    const unitPrice = item.unitPrice || 1;
    const total = quantity * unitPrice;
    
    return {
      name: item.name,
      quantity,
      unit: item.unit || "un",
      unitPrice,
      total
    };
  });

  const labor = calculator.labor.map(item => {
    const hours = evaluateFormula(item.formula, inputs);
    const hourlyRate = item.hourlyRate || 100;
    const total = hours * hourlyRate;
    
    return {
      name: item.name,
      hours,
      unit: item.unit || "h",
      hourlyRate,
      total
    };
  });

  const totalMaterials = materials.reduce((sum, item) => sum + item.total, 0);
  const totalLabor = labor.reduce((sum, item) => sum + item.total, 0);
  const total = totalMaterials + totalLabor;

  return {
    materials,
    labor,
    totalMaterials,
    totalLabor,
    total
  };
}

// Função para avaliar fórmulas matemáticas
function evaluateFormula(formula: string, inputs: Record<string, any>): number {
  try {
    // Substitui variáveis pelos valores dos inputs
    let evaluatedFormula = formula;
    for (const [key, value] of Object.entries(inputs)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      evaluatedFormula = evaluatedFormula.replace(regex, String(value));
    }
    
    // Avalia a expressão matemática
    return Function('"use strict"; return (' + evaluatedFormula + ')')();
  } catch (error) {
    console.error('Erro ao avaliar fórmula:', formula, error);
    return 0;
  }
}

// Função para obter calculadoras por categoria
export function getCalculatorsByCategory(calculators: Calculator[] = defaultCalculators) {
  return calculators.reduce((acc, calculator) => {
    if (!acc[calculator.category]) {
      acc[calculator.category] = [];
    }
    acc[calculator.category].push(calculator);
    return acc;
  }, {} as Record<string, Calculator[]>);
}

// Função para validar inputs de uma calculadora
export function validateCalculatorInputs(calculator: Calculator, inputs: Record<string, any>): string[] {
  const errors: string[] = [];
  
  for (const input of calculator.inputs) {
    if (input.required && (!inputs[input.id] || inputs[input.id] === '')) {
      errors.push(`${input.label} é obrigatório`);
      continue;
    }
    
    if (inputs[input.id]) {
      const value = inputs[input.id];
      
      if (input.type === 'number') {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          errors.push(`${input.label} deve ser um número válido`);
        } else {
          if (input.min !== undefined && numValue < input.min) {
            errors.push(`${input.label} deve ser no mínimo ${input.min}`);
          }
          if (input.max !== undefined && numValue > input.max) {
            errors.push(`${input.label} deve ser no máximo ${input.max}`);
          }
        }
      }
    }
  }
  
  return errors;
}
