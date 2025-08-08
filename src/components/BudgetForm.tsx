import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Building2, Home, Factory, Wrench, AlertCircle } from "lucide-react";
import { ProjectData, projectSchema } from "@/lib/validations";

interface BudgetFormProps {
  onCalculate: (data: ProjectData) => void;
  isLoading?: boolean;
  initialData?: Partial<ProjectData>;
}

const BudgetForm = ({ onCalculate, isLoading = false, initialData = {} }: BudgetFormProps) => {
  const [formData, setFormData] = useState<ProjectData>({
    projectName: "",
    clientName: "",
    projectType: "",
    area: "",
    rooms: "",
    bathrooms: "",
    floors: "",
    description: "",
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectTypes = [
    { value: "house", label: "Casa Residencial", icon: Home },
    { value: "apartment", label: "Apartamento", icon: Building2 },
    { value: "commercial", label: "Comercial", icon: Factory },
    { value: "reform", label: "Reforma", icon: Wrench },
    { value: "industrial", label: "Industrial", icon: Factory }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validar dados com Zod
      const validatedData = projectSchema.parse(formData);
      setErrors({});
      onCalculate(validatedData);
    } catch (err: any) {
      // Mapear erros do Zod para o formato de exibição
      const newErrors: Record<string, string> = {};
      if (err.errors) {
        err.errors.forEach((error: any) => {
          newErrors[error.path[0]] = error.message;
        });
      }
      setErrors(newErrors);
    }
  };

  const handleInputChange = (field: keyof ProjectData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Dados do Projeto
        </CardTitle>
        <CardDescription>
          Preencha as informações para calcular o orçamento automaticamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName" className={errors.projectName ? "text-destructive" : ""}>
                Nome do Projeto
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
                placeholder="Ex: Casa Vila Madalena"
                className={errors.projectName ? "border-destructive" : ""}
                required
              />
              {errors.projectName && (
                <p className="text-sm text-destructive">{errors.projectName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName" className={errors.clientName ? "text-destructive" : ""}>
                Cliente
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                placeholder="Nome do cliente"
                className={errors.clientName ? "border-destructive" : ""}
                required
              />
              {errors.clientName && (
                <p className="text-sm text-destructive">{errors.clientName}</p>
              )}
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <Label className={errors.projectType ? "text-destructive" : ""}>
              Tipo de Projeto
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Select 
              value={formData.projectType} 
              onValueChange={(value) => handleInputChange("projectType", value)}
            >
              <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione o tipo de projeto" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectType && (
              <p className="text-sm text-destructive">{errors.projectType}</p>
            )}
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area" className={errors.area ? "text-destructive" : ""}>
                Área (m²)
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="120"
                className={errors.area ? "border-destructive" : ""}
                min="1"
                max="10000"
                step="0.01"
                required
              />
              {errors.area && (
                <p className="text-sm text-destructive">{errors.area}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms" className={errors.rooms ? "text-destructive" : ""}>
                Quartos
              </Label>
              <Input
                id="rooms"
                type="number"
                value={formData.rooms}
                onChange={(e) => handleInputChange("rooms", e.target.value)}
                placeholder="3"
                className={errors.rooms ? "border-destructive" : ""}
                min="0"
                max="50"
              />
              {errors.rooms && (
                <p className="text-sm text-destructive">{errors.rooms}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className={errors.bathrooms ? "text-destructive" : ""}>
                Banheiros
              </Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                placeholder="2"
                className={errors.bathrooms ? "border-destructive" : ""}
                min="0"
                max="20"
              />
              {errors.bathrooms && (
                <p className="text-sm text-destructive">{errors.bathrooms}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="floors" className={errors.floors ? "text-destructive" : ""}>
                Pavimentos
              </Label>
              <Input
                id="floors"
                type="number"
                value={formData.floors}
                onChange={(e) => handleInputChange("floors", e.target.value)}
                placeholder="1"
                className={errors.floors ? "border-destructive" : ""}
                min="1"
                max="100"
              />
              {errors.floors && (
                <p className="text-sm text-destructive">{errors.floors}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Observações</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Informações adicionais sobre o projeto..."
              rows={3}
            />
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

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={isLoading || hasErrors}
          >
            <Calculator className="h-4 w-4" />
            {isLoading ? "Processando..." : "Calcular Orçamento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;