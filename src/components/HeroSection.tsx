import { Button } from "@/components/ui/button";
import { Calculator, Clock, TrendingUp, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Construction planning" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                Automatize seus orçamentos
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Orçamentos de Obras
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  Automatizados
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Crie orçamentos precisos em minutos. Nossa plataforma calcula automaticamente 
                materiais, mão de obra e custos baseados em suas medidas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Começar Grátis
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Ver Demonstração
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Cálculo Automático</h3>
                <p className="text-sm text-muted-foreground">Precisão em segundos</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Economia de Tempo</h3>
                <p className="text-sm text-muted-foreground">10x mais rápido</p>
              </div>
              <div className="text-center">
                <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold mb-1">Mais Lucro</h3>
                <p className="text-sm text-muted-foreground">Margens otimizadas</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Novo Orçamento</h3>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo de Obra</label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">Casa Residencial</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Área (m²)</label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">120</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Quartos</label>
                      <div className="mt-1 p-3 bg-muted rounded-lg">3</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Materiais:</span>
                    <span className="font-semibold">R$ 85.420</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Mão de obra:</span>
                    <span className="font-semibold">R$ 42.180</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">R$ 127.600</span>
                  </div>
                </div>

                <Button className="w-full" variant="default">
                  Gerar Relatório Completo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;