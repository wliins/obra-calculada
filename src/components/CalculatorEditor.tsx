import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calculator,
  Trash2,
  Plus,
  Package,
  Users,
  Edit3,
  Settings
} from "lucide-react";
import { Calculator as CalculatorType, CalculatorItem, useCalculatorConfig } from "@/hooks/useCalculatorConfig";

interface CalculatorEditorProps {
  calculator: CalculatorType;
  onSave: (calculator: CalculatorType) => void;
}

const CalculatorEditor = ({ calculator, onSave }: CalculatorEditorProps) => {
  const [editingCalculator, setEditingCalculator] = useState<CalculatorType>(calculator);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isAddingLabor, setIsAddingLabor] = useState(false);
  const [newMaterial, setNewMaterial] = useState<CalculatorItem>({ id: "", name: "", formula: "" });
  const [newLabor, setNewLabor] = useState<CalculatorItem>({ id: "", name: "", formula: "" });

  const {
    addMaterial,
    removeMaterial,
    updateMaterial,
    addLabor,
    removeLabor,
    updateLabor
  } = useCalculatorConfig();

  const handleBasicInfoChange = (field: keyof CalculatorType, value: string) => {
    setEditingCalculator(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editingCalculator);
  };

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.formula) {
      const materialWithId = {
        ...newMaterial,
        id: `material-${Date.now()}`
      };
      addMaterial(calculator.id, materialWithId);
      setNewMaterial({ id: "", name: "", formula: "" });
      setIsAddingMaterial(false);
    }
  };

  const handleAddLabor = () => {
    if (newLabor.name && newLabor.formula) {
      const laborWithId = {
        ...newLabor,
        id: `labor-${Date.now()}`
      };
      addLabor(calculator.id, laborWithId);
      setNewLabor({ id: "", name: "", formula: "" });
      setIsAddingLabor(false);
    }
  };

  const handleRemoveMaterial = (materialId: string) => {
    removeMaterial(calculator.id, materialId);
  };

  const handleRemoveLabor = (laborId: string) => {
    removeLabor(calculator.id, laborId);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              {calculator.name}
            </CardTitle>
            <CardDescription>{calculator.description}</CardDescription>
          </div>
          <Button onClick={handleSave} variant="accent">
            <Settings className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="materials">Materiais</TabsTrigger>
            <TabsTrigger value="labor">Mão de Obra</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nome da Calculadora</Label>
                <Input
                  id="name"
                  value={editingCalculator.name}
                  onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={editingCalculator.description}
                  onChange={(e) => handleBasicInfoChange("description", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label>Campos de Entrada</Label>
              <div className="space-y-2 mt-2">
                {calculator.inputs.map((input, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Badge variant="outline">{input.type}</Badge>
                    <span className="flex-1">{input.label}</span>
                    {input.unit && <Badge variant="secondary">{input.unit}</Badge>}
                    {input.required && <Badge variant="destructive">Obrigatório</Badge>}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="h-5 w-5" />
                Materiais
              </h3>
              <Dialog open={isAddingMaterial} onOpenChange={setIsAddingMaterial}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                    Adicionar Material
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Material</DialogTitle>
                    <DialogDescription>
                      Adicione um novo item de material com sua fórmula de cálculo
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="material-name">Nome do Material</Label>
                      <Input
                        id="material-name"
                        value={newMaterial.name}
                        onChange={(e) => setNewMaterial(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Cimento, Areia, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="material-formula">Fórmula de Cálculo</Label>
                      <Input
                        id="material-formula"
                        value={newMaterial.formula}
                        onChange={(e) => setNewMaterial(prev => ({ ...prev, formula: e.target.value }))}
                        placeholder="Ex: area * 15, pontos * 45"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use variáveis como: area, pontos, pavimentos, potencia
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingMaterial(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddMaterial}>
                      Adicionar Material
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {calculator.materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{material.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{material.formula}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMaterial(material.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="labor" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mão de Obra
              </h3>
              <Dialog open={isAddingLabor} onOpenChange={setIsAddingLabor}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                    Adicionar Mão de Obra
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Mão de Obra</DialogTitle>
                    <DialogDescription>
                      Adicione um novo serviço de mão de obra com sua fórmula de cálculo
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="labor-name">Nome do Serviço</Label>
                      <Input
                        id="labor-name"
                        value={newLabor.name}
                        onChange={(e) => setNewLabor(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Pedreiro, Eletricista, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="labor-formula">Fórmula de Cálculo</Label>
                      <Input
                        id="labor-formula"
                        value={newLabor.formula}
                        onChange={(e) => setNewLabor(prev => ({ ...prev, formula: e.target.value }))}
                        placeholder="Ex: area * 25, pontos * 35"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use variáveis como: area, pontos, pavimentos, potencia
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingLabor(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddLabor}>
                      Adicionar Mão de Obra
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {calculator.labor.map((labor) => (
                <div key={labor.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{labor.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{labor.formula}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLabor(labor.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CalculatorEditor;