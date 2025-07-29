import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Básico",
      description: "Ideal para profissionais autônomos",
      price: "R$ 49",
      period: "/mês",
      icon: Zap,
      features: [
        "Até 10 orçamentos/mês",
        "Tipos básicos de obra",
        "Relatórios em PDF",
        "Suporte por email",
        "Base de preços atualizada"
      ],
      buttonText: "Começar Grátis",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Profissional",
      description: "Para pequenas e médias empresas",
      price: "R$ 149",
      period: "/mês",
      icon: Building,
      features: [
        "Orçamentos ilimitados",
        "Todos os tipos de obra",
        "Relatórios personalizados",
        "Análise de margem",
        "Gestão de equipes (5 usuários)",
        "Integração com sistemas",
        "Suporte prioritário"
      ],
      buttonText: "Teste 14 dias grátis",
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      description: "Para grandes empresas e construtoras",
      price: "R$ 399",
      period: "/mês",
      icon: Crown,
      features: [
        "Tudo do Profissional",
        "Usuários ilimitados",
        "Customização completa",
        "API dedicada",
        "Treinamento especializado",
        "Gerente de conta dedicado",
        "SLA garantido"
      ],
      buttonText: "Falar com Vendas",
      buttonVariant: "accent" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Check className="h-4 w-4" />
            Sem Pegadinhas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Invista Menos,
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Ganhe Mais
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Planos transparentes que se pagam sozinhos. Escolha o ideal para seu negócio 
            e comece a economizar tempo e aumentar lucros hoje mesmo.
          </p>
        </div>

        {/* ROI Banner */}
        <div className="bg-gradient-primary rounded-2xl p-6 mb-12 text-center text-primary-foreground max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">R$ 15.000</div>
              <div className="text-sm opacity-90">Economia média mensal</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">300%</div>
              <div className="text-sm opacity-90">ROI em 6 meses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">48h</div>
              <div className="text-sm opacity-90">Para se pagar</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm ${
                plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground shadow-glow">
                  ⭐ Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {plan.description}
                </CardDescription>
                <div className="pt-4">
                  <span className="text-4xl lg:text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-lg">{plan.period}</span>
                  {plan.name === "Profissional" && (
                    <div className="text-sm text-muted-foreground mt-1 line-through">
                      De R$ 299/mês
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full group" 
                  size="lg"
                >
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16 space-y-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <span>14 dias grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-success" />
              <span>Suporte 24/7</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Precisa de algo personalizado ou tem mais de 50 colaboradores? 
            <br className="hidden sm:block" />
            <a href="#contact" className="text-primary hover:underline font-medium">
              Fale conosco para um plano enterprise
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;