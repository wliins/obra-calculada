import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  RefreshCw, 
  Upload, 
  Download,
  Hammer,
  Package,
  Users,
  AlertTriangle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface MaterialPrice {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
}

interface LaborPrice {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
}

const PriceSettings = () => {
  const { toast } = useToast();
  
  const [materials, setMaterials] = useState<MaterialPrice[]>([
    { id: '1', name: 'Concreto FCK 25', unit: 'm³', price: 350, category: 'Estrutural' },
    { id: '2', name: 'Aço CA-50', unit: 'kg', price: 6.50, category: 'Estrutural' },
    { id: '3', name: 'Tijolo Cerâmico', unit: 'un', price: 0.85, category: 'Alvenaria' },
    { id: '4', name: 'Cimento Portland', unit: 'sc', price: 32.50, category: 'Básicos' },
    { id: '5', name: 'Areia Média', unit: 'm³', price: 45.00, category: 'Básicos' },
    { id: '6', name: 'Brita 1', unit: 'm³', price: 55.00, category: 'Básicos' },
    { id: '7', name: 'Revestimento Cerâmico', unit: 'm²', price: 35.00, category: 'Acabamento' },
    { id: '8', name: 'Tinta Acrílica', unit: 'lt', price: 28.00, category: 'Acabamento' },
  ]);

  const [labor, setLabor] = useState<LaborPrice[]>([
    { id: '1', name: 'Pedreiro', unit: 'dia', price: 180.00, category: 'Construção' },
    { id: '2', name: 'Servente', unit: 'dia', price: 120.00, category: 'Construção' },
    { id: '3', name: 'Eletricista', unit: 'dia', price: 200.00, category: 'Instalações' },
    { id: '4', name: 'Encanador', unit: 'dia', price: 190.00, category: 'Instalações' },
    { id: '5', name: 'Pintor', unit: 'dia', price: 160.00, category: 'Acabamento' },
    { id: '6', name: 'Azulejista', unit: 'dia', price: 220.00, category: 'Acabamento' },
  ]);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedMaterials = localStorage.getItem('materials-prices');
    const savedLabor = localStorage.getItem('labor-prices');
    
    if (savedMaterials) {
      setMaterials(JSON.parse(savedMaterials));
    }
    if (savedLabor) {
      setLabor(JSON.parse(savedLabor));
    }
  }, []);

  const savePrices = () => {
    localStorage.setItem('materials-prices', JSON.stringify(materials));
    localStorage.setItem('labor-prices', JSON.stringify(labor));
    
    toast({
      title: "Preços salvos!",
      description: "Todas as alterações foram salvas com sucesso.",
    });
  };

  const updateMaterialPrice = (id: string, price: number) => {
    setMaterials(prev => prev.map(material => 
      material.id === id ? { ...material, price } : material
    ));
  };

  const updateLaborPrice = (id: string, price: number) => {
    setLabor(prev => prev.map(labor => 
      labor.id === id ? { ...labor, price } : labor
    ));
  };

  const resetToDefaults = () => {
    localStorage.removeItem('materials-prices');
    localStorage.removeItem('labor-prices');
    window.location.reload();
  };

  const categories = {
    materials: [...new Set(materials.map(m => m.category))],
    labor: [...new Set(labor.map(l => l.category))]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Configuração de Preços</h1>
            <p className="text-muted-foreground">
              Gerencie os valores de materiais e mão de obra para seus orçamentos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RefreshCw className="h-4 w-4" />
              Restaurar Padrão
            </Button>
            <Button variant="hero" onClick={savePrices}>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        {/* Alert */}
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">Preços Temporários</h4>
                <p className="text-sm text-muted-foreground">
                  Os preços estão sendo salvos localmente. Para persistir permanentemente, 
                  conecte o Supabase depois de fazer suas alterações.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Import/Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Importar/Exportar Tabelas
            </CardTitle>
            <CardDescription>
              Importe tabelas SINAPI ou exporte suas configurações
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline">
              <Upload className="h-4 w-4" />
              Importar SINAPI
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4" />
              Importar CSV
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Exportar Tabela
            </Button>
          </CardContent>
        </Card>

        {/* Price Tables */}
        <Tabs defaultValue="materials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Materiais
            </TabsTrigger>
            <TabsTrigger value="labor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mão de Obra
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-6">
            {categories.materials.map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hammer className="h-5 w-5" />
                    {category}
                    <Badge variant="secondary">
                      {materials.filter(m => m.category === category).length} itens
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {materials
                      .filter(material => material.category === category)
                      .map(material => (
                        <div key={material.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="space-y-1">
                            <h4 className="font-medium">{material.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Unidade: {material.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Label htmlFor={`material-${material.id}`} className="text-sm">
                              R$
                            </Label>
                            <Input
                              id={`material-${material.id}`}
                              type="number"
                              step="0.01"
                              value={material.price}
                              onChange={(e) => updateMaterialPrice(material.id, parseFloat(e.target.value) || 0)}
                              className="w-24 text-right"
                            />
                            <span className="text-sm text-muted-foreground min-w-[30px]">
                              /{material.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="labor" className="space-y-6">
            {categories.labor.map(category => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {category}
                    <Badge variant="secondary">
                      {labor.filter(l => l.category === category).length} itens
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {labor
                      .filter(laborItem => laborItem.category === category)
                      .map(laborItem => (
                        <div key={laborItem.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="space-y-1">
                            <h4 className="font-medium">{laborItem.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Unidade: {laborItem.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Label htmlFor={`labor-${laborItem.id}`} className="text-sm">
                              R$
                            </Label>
                            <Input
                              id={`labor-${laborItem.id}`}
                              type="number"
                              step="0.01"
                              value={laborItem.price}
                              onChange={(e) => updateLaborPrice(laborItem.id, parseFloat(e.target.value) || 0)}
                              className="w-24 text-right"
                            />
                            <span className="text-sm text-muted-foreground min-w-[30px]">
                              /{laborItem.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PriceSettings;