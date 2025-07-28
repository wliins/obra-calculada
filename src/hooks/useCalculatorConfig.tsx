import { useState, useEffect } from "react";

export interface CalculatorInput {
  id: string;
  label: string;
  type: "number" | "select" | "text";
  unit?: string;
  options?: string[];
  required: boolean;
}

export interface CalculatorItem {
  id: string;
  name: string;
  formula: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
  inputs: CalculatorInput[];
  materials: CalculatorItem[];
  labor: CalculatorItem[];
}

const defaultCalculators: Calculator[] = [
  {
    id: "projeto-arquitetonico",
    name: "Projeto Arquitetônico",
    description: "Cálculo para desenvolvimento de projeto arquitetônico",
    icon: "PenTool",
    inputs: [
      { id: "area", label: "Área do projeto", type: "number", unit: "m²", required: true },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true },
      { id: "complexidade", label: "Complexidade", type: "select", options: ["Baixa", "Média", "Alta"], required: true }
    ],
    materials: [
      { id: "levantamento", name: "Levantamento topográfico", formula: "area * 8" },
      { id: "plantas", name: "Plantas arquitetônicas", formula: "area * 15" },
      { id: "cortes", name: "Cortes e fachadas", formula: "pavimentos * 800" },
      { id: "detalhamentos", name: "Detalhamentos", formula: "area * 5" }
    ],
    labor: [
      { id: "arquiteto", name: "Arquiteto", formula: "area * 25" },
      { id: "desenhista", name: "Desenhista técnico", formula: "area * 12" },
      { id: "consultorias", name: "Consultorias especializadas", formula: "area * 8" }
    ]
  },
  {
    id: "projeto-estrutural",
    name: "Projeto Estrutural",
    description: "Dimensionamento de estruturas em concreto, aço ou madeira",
    icon: "Building",
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true },
      { id: "tipo", label: "Tipo de estrutura", type: "select", options: ["Concreto armado", "Estrutura metálica", "Madeira"], required: true }
    ],
    materials: [
      { id: "sondagem", name: "Sondagem do solo", formula: "area * 12" },
      { id: "calculos", name: "Cálculos estruturais", formula: "area * 18" },
      { id: "formas", name: "Plantas de formas", formula: "pavimentos * 600" },
      { id: "armaduras", name: "Detalhamento de armaduras", formula: "area * 10" }
    ],
    labor: [
      { id: "engenheiro", name: "Engenheiro estrutural", formula: "area * 35" },
      { id: "projetista", name: "Projetista", formula: "area * 15" },
      { id: "verificacao", name: "Verificação e revisão", formula: "area * 8" }
    ]
  },
  {
    id: "projeto-hidrossanitario",
    name: "Projeto Hidrossanitário",
    description: "Sistemas de água fria, quente, esgoto e águas pluviais",
    icon: "Droplets",
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "pontos", label: "Pontos hidráulicos", type: "number", required: true },
      { id: "tipo", label: "Tipo de instalação", type: "select", options: ["Residencial", "Comercial", "Industrial"], required: true }
    ],
    materials: [
      { id: "agua-fria", name: "Projeto de água fria", formula: "pontos * 85" },
      { id: "esgoto", name: "Projeto de esgoto", formula: "pontos * 90" },
      { id: "pluviais", name: "Projeto de águas pluviais", formula: "area * 5" },
      { id: "especificacoes", name: "Especificações técnicas", formula: "pontos * 25" }
    ],
    labor: [
      { id: "engenheiro-hidraulico", name: "Engenheiro hidráulico", formula: "pontos * 45" },
      { id: "projetista-hidraulico", name: "Projetista hidráulico", formula: "pontos * 20" },
      { id: "verificacao-tecnica", name: "Verificação técnica", formula: "pontos * 10" }
    ]
  },
  {
    id: "projeto-eletrico",
    name: "Projeto Elétrico e SPDA",
    description: "Instalações elétricas e sistema de proteção contra descargas",
    icon: "Zap",
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "pontos", label: "Pontos elétricos", type: "number", required: true },
      { id: "potencia", label: "Potência instalada", type: "number", unit: "kW", required: true }
    ],
    materials: [
      { id: "projeto-basico", name: "Projeto elétrico básico", formula: "pontos * 45" },
      { id: "quadros", name: "Dimensionamento de quadros", formula: "potencia * 120" },
      { id: "spda", name: "SPDA", formula: "area * 8" },
      { id: "memorial", name: "Memorial descritivo", formula: "pontos * 15" }
    ],
    labor: [
      { id: "eletricista", name: "Engenheiro eletricista", formula: "pontos * 35" },
      { id: "projetista-eletrico", name: "Projetista elétrico", formula: "pontos * 18" },
      { id: "calculos", name: "Verificação e cálculos", formula: "potencia * 80" }
    ]
  },
  {
    id: "construcao-residencial",
    name: "Construção Residencial",
    description: "Construção completa de casas e edifícios residenciais",
    icon: "Home",
    inputs: [
      { id: "area", label: "Área construída", type: "number", unit: "m²", required: true },
      { id: "padrao", label: "Padrão de acabamento", type: "select", options: ["Simples", "Médio", "Alto"], required: true },
      { id: "pavimentos", label: "Número de pavimentos", type: "number", required: true }
    ],
    materials: [
      { id: "fundacao", name: "Fundação", formula: "area * 180" },
      { id: "estrutura", name: "Estrutura", formula: "area * 320" },
      { id: "alvenaria", name: "Alvenaria", formula: "area * 150" },
      { id: "cobertura", name: "Cobertura", formula: "area * 120" },
      { id: "instalacoes", name: "Instalações", formula: "area * 200" },
      { id: "acabamentos", name: "Acabamentos", formula: "area * 280" }
    ],
    labor: [
      { id: "fundacao-labor", name: "Fundação", formula: "area * 85" },
      { id: "estrutura-labor", name: "Estrutura", formula: "area * 140" },
      { id: "alvenaria-labor", name: "Alvenaria", formula: "area * 90" },
      { id: "cobertura-labor", name: "Cobertura", formula: "area * 65" },
      { id: "instalacoes-labor", name: "Instalações", formula: "area * 95" },
      { id: "acabamentos-labor", name: "Acabamentos", formula: "area * 120" }
    ]
  }
];

export const useCalculatorConfig = () => {
  const [calculators, setCalculators] = useState<Calculator[]>(() => {
    const saved = localStorage.getItem('calculatorConfigs');
    return saved ? JSON.parse(saved) : defaultCalculators;
  });

  useEffect(() => {
    localStorage.setItem('calculatorConfigs', JSON.stringify(calculators));
  }, [calculators]);

  const updateCalculator = (updatedCalculator: Calculator) => {
    setCalculators(prev => 
      prev.map(calc => 
        calc.id === updatedCalculator.id ? updatedCalculator : calc
      )
    );
  };

  const addCalculator = (calculator: Calculator) => {
    setCalculators(prev => [...prev, calculator]);
  };

  const removeCalculator = (calculatorId: string) => {
    setCalculators(prev => prev.filter(calc => calc.id !== calculatorId));
  };

  const resetToDefaults = () => {
    setCalculators(defaultCalculators);
  };

  const addMaterial = (calculatorId: string, material: CalculatorItem) => {
    setCalculators(prev =>
      prev.map(calc =>
        calc.id === calculatorId
          ? { ...calc, materials: [...calc.materials, material] }
          : calc
      )
    );
  };

  const removeMaterial = (calculatorId: string, materialId: string) => {
    setCalculators(prev =>
      prev.map(calc =>
        calc.id === calculatorId
          ? { ...calc, materials: calc.materials.filter(m => m.id !== materialId) }
          : calc
      )
    );
  };

  const updateMaterial = (calculatorId: string, updatedMaterial: CalculatorItem) => {
    setCalculators(prev =>
      prev.map(calc =>
        calc.id === calculatorId
          ? {
              ...calc,
              materials: calc.materials.map(m =>
                m.id === updatedMaterial.id ? updatedMaterial : m
              )
            }
          : calc
      )
    );
  };

  const addLabor = (calculatorId: string, labor: CalculatorItem) => {
    setCalculators(prev =>
      prev.map(calc =>
        calc.id === calculatorId
          ? { ...calc, labor: [...calc.labor, labor] }
          : calc
      )
    );
  };

  const removeLabor = (calculatorId: string, laborId: string) => {
    setCalculators(prev =>
      prev.map(calc =>
        calc.id === calculatorId
          ? { ...calc, labor: calc.labor.filter(l => l.id !== laborId) }
          : calc
      )
    );
  };

  const updateLabor = (calculatorId: string, updatedLabor: CalculatorItem) => {
    setCalculators(prev =>
      prev.map(calc =>
        calc.id === calculatorId
          ? {
              ...calc,
              labor: calc.labor.map(l =>
                l.id === updatedLabor.id ? updatedLabor : l
              )
            }
          : calc
      )
    );
  };

  return {
    calculators,
    updateCalculator,
    addCalculator,
    removeCalculator,
    resetToDefaults,
    addMaterial,
    removeMaterial,
    updateMaterial,
    addLabor,
    removeLabor,
    updateLabor
  };
};