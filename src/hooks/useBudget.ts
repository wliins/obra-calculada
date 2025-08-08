import { useState, useCallback } from 'react';
import { ProjectData } from '@/lib/validations';
import { Calculator, CalculationResult, calculateBudget, validateCalculatorInputs } from '@/lib/calculators';

export interface Budget {
  id: string;
  projectData: ProjectData;
  calculatorId: string;
  inputs: Record<string, any>;
  result: CalculationResult;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'completed' | 'archived';
}

export interface UseBudgetReturn {
  budgets: Budget[];
  currentBudget: Budget | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createBudget: (projectData: ProjectData, calculatorId: string, inputs: Record<string, any>) => Promise<Budget>;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  selectBudget: (id: string) => void;
  calculateBudget: (calculator: Calculator, inputs: Record<string, any>) => CalculationResult | null;
  validateInputs: (calculator: Calculator, inputs: Record<string, any>) => string[];
  
  // Utilities
  getBudgetById: (id: string) => Budget | undefined;
  getBudgetsByStatus: (status: Budget['status']) => Budget[];
  exportBudget: (id: string) => void;
}

export function useBudget(): UseBudgetReturn {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Criar novo orçamento
  const createBudget = useCallback(async (
    projectData: ProjectData, 
    calculatorId: string, 
    inputs: Record<string, any>
  ): Promise<Budget> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const now = new Date();
      const newBudget: Budget = {
        id: `budget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        projectData,
        calculatorId,
        inputs,
        result: { materials: [], labor: [], totalMaterials: 0, totalLabor: 0, total: 0 },
        createdAt: now,
        updatedAt: now,
        status: 'draft'
      };
      
      setBudgets(prev => [newBudget, ...prev]);
      setCurrentBudget(newBudget);
      
      // Salvar no localStorage
      const savedBudgets = JSON.parse(localStorage.getItem('budgets') || '[]');
      savedBudgets.unshift(newBudget);
      localStorage.setItem('budgets', JSON.stringify(savedBudgets));
      
      return newBudget;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar orçamento';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Atualizar orçamento
  const updateBudget = useCallback((id: string, updates: Partial<Budget>) => {
    setBudgets(prev => prev.map(budget => 
      budget.id === id 
        ? { ...budget, ...updates, updatedAt: new Date() }
        : budget
    ));
    
    if (currentBudget?.id === id) {
      setCurrentBudget(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
    
    // Atualizar localStorage
    const savedBudgets = JSON.parse(localStorage.getItem('budgets') || '[]');
    const updatedBudgets = savedBudgets.map((budget: Budget) => 
      budget.id === id 
        ? { ...budget, ...updates, updatedAt: new Date() }
        : budget
    );
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  }, [currentBudget]);

  // Deletar orçamento
  const deleteBudget = useCallback((id: string) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
    
    if (currentBudget?.id === id) {
      setCurrentBudget(null);
    }
    
    // Remover do localStorage
    const savedBudgets = JSON.parse(localStorage.getItem('budgets') || '[]');
    const filteredBudgets = savedBudgets.filter((budget: Budget) => budget.id !== id);
    localStorage.setItem('budgets', JSON.stringify(filteredBudgets));
  }, [currentBudget]);

  // Selecionar orçamento
  const selectBudget = useCallback((id: string) => {
    const budget = budgets.find(b => b.id === id);
    setCurrentBudget(budget || null);
  }, [budgets]);

  // Calcular orçamento
  const calculateBudgetFn = useCallback((calculator: Calculator, inputs: Record<string, any>): CalculationResult | null => {
    try {
      const errors = validateCalculatorInputs(calculator, inputs);
      if (errors.length > 0) {
        setError(errors.join(', '));
        return null;
      }
      
      const result = calculateBudget(calculator, inputs);
      setError(null);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao calcular orçamento';
      setError(errorMessage);
      return null;
    }
  }, []);

  // Validar inputs
  const validateInputs = useCallback((calculator: Calculator, inputs: Record<string, any>): string[] => {
    return validateCalculatorInputs(calculator, inputs);
  }, []);

  // Obter orçamento por ID
  const getBudgetById = useCallback((id: string): Budget | undefined => {
    return budgets.find(budget => budget.id === id);
  }, [budgets]);

  // Obter orçamentos por status
  const getBudgetsByStatus = useCallback((status: Budget['status']): Budget[] => {
    return budgets.filter(budget => budget.status === status);
  }, [budgets]);

  // Exportar orçamento
  const exportBudget = useCallback((id: string) => {
    const budget = getBudgetById(id);
    if (!budget) return;
    
    const exportData = {
      ...budget,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orcamento_${budget.projectData.projectName.replace(/\s+/g, '_')}_${budget.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [getBudgetById]);

  // Carregar orçamentos do localStorage na inicialização
  useState(() => {
    try {
      const savedBudgets = JSON.parse(localStorage.getItem('budgets') || '[]');
      if (savedBudgets.length > 0) {
        setBudgets(savedBudgets);
      }
    } catch (err) {
      console.error('Erro ao carregar orçamentos:', err);
    }
  });

  return {
    budgets,
    currentBudget,
    isLoading,
    error,
    createBudget,
    updateBudget,
    deleteBudget,
    selectBudget,
    calculateBudget: calculateBudgetFn,
    validateInputs,
    getBudgetById,
    getBudgetsByStatus,
    exportBudget
  };
}
