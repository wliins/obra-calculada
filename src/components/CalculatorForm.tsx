import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, AlertCircle } from "lucide-react";
import { Calculator as CalculatorType, CalculatorInput } from "@/lib/calculators";

interface CalculatorFormProps {
  calculator: CalculatorType;
  onSubmit: (inputs: Record<string, any>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  initialValues?: Record<string, any>;
}

export default function CalculatorForm({
  calculator,
  onSubmit,
  onCancel,
  isLoading = false,
  initialValues = {}
}: CalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    calculator.inputs.forEach(input => {
      if (input.required && (!inputs[input.id] || inputs[input.id] === '')) {
        newErrors[input.id] = `${input.label} é obrigatório`;
        return;
      }
      
      if (inputs[input.id]) {
        const value = inputs[input.id];
        
        if (input.type === 'number') {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) {
            newErrors[input.id] = `${input.label} deve ser um número válido`;
          } else {
            if (input.min !== undefined && numValue < input.min) {
              newErrors[input.id] = `${input.label} deve ser no mínimo ${input.min}`;
            }
            if (input.max !== undefined && numValue > input.max) {
              newErrors[input.id] = `${input.label} deve ser no máximo ${input.max}`;
            }
          }
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(inputs);
    }
  };

  const renderInput = (input: CalculatorInput) => {
    const error = errors[input.id];
    
    return (
      <div key={input.id} className="space-y-2">
        <Label htmlFor={input.id} className={error ? "text-destructive" : ""}>
          {input.label}
          {input.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        
        {input.type === 'select' ? (
          <Select
            value={inputs[input.id] || ""}
            onValueChange={(value) => handleInputChange(input.id, value)}
          >
            <SelectTrigger className={error ? "border-destructive" : ""}>
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
            value={inputs[input.id] || ""}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.label}
            className={error ? "border-destructive" : ""}
            min={input.min}
            max={input.max}
            step={input.step}
          />
        )}
        
        {input.unit && (
          <span className="text-sm text-muted-foreground">{input.unit}</span>
        )}
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <calculator.icon className="h-5 w-5 text-primary" />
          {calculator.name}
        </CardTitle>
        <CardDescription>
          {calculator.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calculator.inputs.map(renderInput)}
          </div>

          {/* Error Alert */}
          {hasErrors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Por favor, corrija os erros no formulário antes de continuar.
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isLoading || hasErrors}
            >
              <Calculator className="h-4 w-4" />
              {isLoading ? "Calculando..." : "Calcular Orçamento"}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
