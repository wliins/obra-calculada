import { Button } from "@/components/ui/button";
import { Calculator, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
      <div className="absolute inset-0 opacity-5">
        <img 
          src={heroImage} 
          alt="Construction planning" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                Orçamentos de Obras
                <span className="block bg-gradient-hero bg-clip-text text-transparent">
                  Inteligentes
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-muted-foreground mt-2">
                  em minutos, não horas
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Transforme sua forma de orçar com IA e automação. Cálculos precisos, 
                relatórios profissionais e economia de <strong className="text-primary">90% do tempo</strong>.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">90%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Menos tempo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-success">99.8%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Precisão</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent">10K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Profissionais</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Link to="/register" className="flex-1">
                <Button variant="hero" size="lg" className="group w-full text-base font-semibold">
                  Começar Grátis Agora
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo" className="flex-1">
                <Button variant="outline" size="lg" className="w-full text-base">
                  Ver Demo
                </Button>
              </Link>
            </div>

            {/* Mini features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Cálculo Automático</h3>
                  <p className="text-xs text-muted-foreground">Precisão garantida</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Super Rápido</h3>
                  <p className="text-xs text-muted-foreground">Resultados em minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-success/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Mais Lucro</h3>
                  <p className="text-xs text-muted-foreground">Margens otimizadas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced demo card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-10 animate-pulse"></div>
            <div className="bg-card rounded-2xl shadow-glow p-6 sm:p-8 border border-border/50 backdrop-blur-sm relative">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Orçamento Inteligente</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success font-medium">Ao vivo</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tipo de Obra</label>
                    <div className="mt-1 p-3 bg-gradient-subtle rounded-lg border border-border/50">
                      Casa Residencial - Alto Padrão
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Área (m²)</label>
                      <div className="mt-1 p-3 bg-gradient-subtle rounded-lg border border-border/50">
                        120
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Quartos</label>
                      <div className="mt-1 p-3 bg-gradient-subtle rounded-lg border border-border/50">
                        3
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Materiais:</span>
                      <span className="font-semibold">R$ 85.420</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Mão de obra:</span>
                      <span className="font-semibold">R$ 42.180</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Impostos e taxas:</span>
                      <span className="font-semibold">R$ 8.560</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total estimado:</span>
                        <span className="text-primary">R$ 136.160</span>
                      </div>
                      <div className="text-xs text-muted-foreground text-right mt-1">
                        ± 5% de margem de erro
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="/new-budget" className="w-full">
                  <Button className="w-full" variant="default" size="lg">
                    <Calculator className="h-4 w-4 mr-2" />
                    Gerar Orçamento Completo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;