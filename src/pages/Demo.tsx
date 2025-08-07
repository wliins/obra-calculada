import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  ArrowLeft, 
  Calculator,
  Download,
  Share2,
  Home,
  Factory,
  Wrench,
  Play,
  CheckCircle,
  DollarSign,
  Package,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [demoData, setDemoData] = useState({
    projectType: "",
    area: "",
    rooms: "",
    bathrooms: ""
  });
  const [showResults, setShowResults] = useState(false);

  const steps = [
    {
      title: "Selecione o Tipo",
      description: "Escolha o tipo de projeto"
    },
    {
      title: "Informe as Medidas",
      description: "Digite as dimensões básicas"
    },
    {
      title: "Cálculo Automático",
      description: "Veja a mágica acontecer"
    },
    {
      title: "Resultado Final",
      description: "Orçamento completo gerado"
    }
  ];

  const projectTypes = [
    { value: "house", label: "Casa Residencial", icon: Home, color: "text-primary" },
    { value: "apartment", label: "Apartamento", icon: Building2, color: "text-accent" },
    { value: "commercial", label: "Comercial", icon: Factory, color: "text-success" },
    { value: "reform", label: "Reforma", icon: Wrench, color: "text-warning" }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
    setCurrentStep(3);
  };

  const getCalculatedResults = () => {
    const area = parseFloat(demoData.area) || 100;
    const rooms = parseInt(demoData.rooms) || 3;
    const bathrooms = parseInt(demoData.bathrooms) || 2;

    const materials = area * 850 + rooms * 120 + bathrooms * 250;
    const labor = area * 420 + rooms * 80 + bathrooms * 150;
    const total = materials + labor;

    return { materials, labor, total, area };
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ObraCalculada</h1>
              <p className="text-xs text-muted-foreground">Demonstração Interativa</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="sm:size-default">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero" size="sm" className="sm:size-default">
                <span className="hidden sm:inline">Criar Conta Grátis</span>
                <span className="sm:hidden">Cadastrar</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Demo Header */}
          <div className="text-center space-y-4">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              <Play className="h-3 w-3 mr-1" />
              Demonstração Interativa
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Veja Como Funciona
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Experimente criar um orçamento real em poucos cliques. 
              Este é um exemplo com dados reais do mercado.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-colors ${
                  index <= currentStep 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted text-muted-foreground"
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 ml-1 sm:ml-2 transition-colors ${
                    index < currentStep ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Demo Form */}
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  {steps[currentStep].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 0: Project Type */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <Label>Tipo de Projeto</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {projectTypes.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => {
                            setDemoData({ ...demoData, projectType: type.value });
                            setTimeout(() => handleNextStep(), 500);
                          }}
                          className={`p-4 border rounded-lg text-left transition-all hover:shadow-card ${
                            demoData.projectType === type.value 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <type.icon className={`h-6 w-6 ${type.color}`} />
                            <span className="font-medium">{type.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Measurements */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="area">Área (m²)</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="120"
                          value={demoData.area}
                          onChange={(e) => setDemoData({ ...demoData, area: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rooms">Quartos</Label>
                        <Input
                          id="rooms"
                          type="number"
                          placeholder="3"
                          value={demoData.rooms}
                          onChange={(e) => setDemoData({ ...demoData, rooms: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Banheiros</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="2"
                          value={demoData.bathrooms}
                          onChange={(e) => setDemoData({ ...demoData, bathrooms: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pavimentos</Label>
                        <Input type="number" placeholder="1" />
                      </div>
                    </div>
                    <Button 
                      onClick={handleNextStep}
                      variant="hero" 
                      className="w-full"
                      disabled={!demoData.area}
                    >
                      Continuar
                    </Button>
                  </div>
                )}

                {/* Step 2: Calculating */}
                {currentStep === 2 && (
                  <div className="text-center space-y-6">
                    <div className="bg-gradient-primary p-6 rounded-2xl text-primary-foreground">
                      <Calculator className="h-12 w-12 mx-auto mb-4 animate-pulse" />
                      <h3 className="text-xl font-semibold mb-2">Calculando...</h3>
                      <p>Processando dados e aplicando tabelas SINAPI</p>
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Analisando tipo de projeto
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Calculando materiais necessários
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        Estimando mão de obra
                      </div>
                    </div>
                    <Button 
                      onClick={handleCalculate}
                      variant="accent" 
                      className="w-full"
                    >
                      Ver Resultado
                    </Button>
                  </div>
                )}

                {/* Step 3: Results */}
                {currentStep === 3 && showResults && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="bg-success/10 p-4 rounded-full w-fit mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold text-success">
                        Orçamento Gerado com Sucesso!
                      </h3>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar PDF
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartilhar
                      </Button>
                    </div>

                    <div className="text-center pt-4 border-t">
                      <p className="text-muted-foreground mb-4">
                        Gostou? Crie sua conta gratuita para usar todas as funcionalidades
                      </p>
                      <Link to="/register">
                        <Button variant="hero" size="lg" className="w-full">
                          Criar Conta Grátis
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Preview */}
            <div className="space-y-6">
              {showResults ? (
                (() => {
                  const results = getCalculatedResults();
                  return (
                    <>
                      <Card className="shadow-glow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            Resumo do Orçamento
                          </CardTitle>
                          <CardDescription>
                            Casa Residencial • {results.area}m²
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
                                }).format(results.materials)}
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
                                }).format(results.labor)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold">Total</span>
                              <p className="text-3xl font-bold text-primary">
                                {new Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL'
                                }).format(results.total)}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              ~{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(results.total / results.area)} por m²
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Composição Detalhada</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Concreto</span>
                              <span>R$ 5.400</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tijolo</span>
                              <span>R$ 8.200</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Acabamento</span>
                              <span>R$ 4.200</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                })()
              ) : (
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <Calculator className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Resultado Aparecerá Aqui</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete os passos para ver o orçamento
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;