import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Building2, Home, Factory, Wrench } from "lucide-react";

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

interface BudgetFormProps {
  onCalculate: (data: BudgetData) => void;
}

const BudgetForm = ({ onCalculate }: BudgetFormProps) => {
  const [formData, setFormData] = useState<BudgetData>({
    projectName: "",
    clientName: "",
    projectType: "",
    area: "",
    rooms: "",
    bathrooms: "",
    floors: "",
    description: ""
  });

  const projectTypes = [
    { value: "house", label: "Casa Residencial", icon: Home },
    { value: "apartment", label: "Apartamento", icon: Building2 },
    { value: "commercial", label: "Comercial", icon: Factory },
    { value: "reform", label: "Reforma", icon: Wrench },
    { value: "industrial", label: "Industrial", icon: Factory }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleInputChange = (field: keyof BudgetData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              <Label htmlFor="projectName">Nome do Projeto</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
                placeholder="Ex: Casa Vila Madalena"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName">Cliente</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                placeholder="Nome do cliente"
                required
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <Label>Tipo de Projeto</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
              <SelectTrigger>
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
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Área (m²)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="120"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms">Quartos</Label>
              <Input
                id="rooms"
                type="number"
                value={formData.rooms}
                onChange={(e) => handleInputChange("rooms", e.target.value)}
                placeholder="3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Banheiros</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floors">Pavimentos</Label>
              <Input
                id="floors"
                type="number"
                value={formData.floors}
                onChange={(e) => handleInputChange("floors", e.target.value)}
                placeholder="1"
              />
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

          <Button type="submit" variant="hero" size="lg" className="w-full">
            <Calculator className="h-4 w-4" />
            Calcular Orçamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;