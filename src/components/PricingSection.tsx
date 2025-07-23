import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building } from "lucide-react";

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
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Planos para Cada Necessidade
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para seu negócio e comece a economizar tempo hoje mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-glow transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <plan.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-success" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant={plan.buttonVariant} className="w-full" size="lg">
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem 14 dias de teste grátis • Cancele a qualquer momento
          </p>
          <p className="text-sm text-muted-foreground">
            Precisa de algo personalizado? <a href="#contact" className="text-primary hover:underline">Entre em contato</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;