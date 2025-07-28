import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Users,
  Star,
  ArrowRight,
  Timer,
  DollarSign,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sales = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Orçamentos imprecisos",
      description: "Erros de cálculo custam em média 15% do lucro"
    },
    {
      icon: Timer,
      title: "Tempo desperdiçado",
      description: "Horas perdidas fazendo cálculos manuais"
    },
    {
      icon: Target,
      title: "Concorrência desleal",
      description: "Perdendo obras por não conseguir ser competitivo"
    }
  ];

  const benefits = [
    {
      icon: Calculator,
      title: "Cálculos Automáticos",
      description: "Precisão de 99.8% em todos os orçamentos",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Clock,
      title: "Economia de 90% do Tempo",
      description: "De 8 horas para 30 minutos por orçamento",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: TrendingUp,
      title: "Aumento de 25% no Lucro",
      description: "Margens otimizadas e custos precisos",
      color: "bg-success/10 text-success"
    },
    {
      icon: DollarSign,
      title: "ROI em 30 dias",
      description: "Recupere o investimento no primeiro mês",
      color: "bg-warning/10 text-warning"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "Engenheiro Civil",
      company: "Construtora Alpha",
      content: "Aumentei minha produtividade em 300%. Agora consigo fazer 5x mais orçamentos no mesmo tempo.",
      rating: 5
    },
    {
      name: "Ana Silva",
      role: "Arquiteta",
      company: "Silva & Associados",
      content: "Nunca mais perdi uma obra por orçamento impreciso. A ferramenta paga por si só.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Construtor",
      company: "Santos Construções",
      content: "Meus clientes ficam impressionados com a rapidez e profissionalismo dos orçamentos.",
      rating: 5
    }
  ];

  const urgency = [
    "🔥 Mais de 10.000 profissionais já usam",
    "⚡ Preço promocional válido apenas esta semana",
    "🎯 Últimas 48 vagas com desconto de 50%"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              ⚡ OFERTA LIMITADA - 50% OFF
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Pare de Perder
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Dinheiro e Tempo
              </span>
              com Orçamentos Manuais
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <strong className="text-destructive">78% dos profissionais</strong> perdem contratos por orçamentos 
              imprecisos ou demorados. Você não precisa ser um deles.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {urgency.map((item, index) => (
                <Badge key={index} variant="destructive" className="text-sm px-3 py-1">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="lg" className="group text-lg px-8 py-4">
                  GARANTIR MINHA VAGA AGORA
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Ver Demonstração Gratuita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Você Está Perdendo Dinheiro Todos os Dias
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Enquanto você faz orçamentos manuais, seus concorrentes já estão usando automação
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <Card key={index} className="border-destructive/20">
                  <CardHeader className="text-center">
                    <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <problem.icon className="h-8 w-8 text-destructive" />
                    </div>
                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-destructive mb-2">
                  RESULTADO: Perda média de R$ 50.000/ano
                </h3>
                <p className="text-muted-foreground">
                  Entre obras perdidas, retrabalho e tempo desperdiçado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                A Solução Que Vai Revolucionar Seu Negócio
              </h2>
              <p className="text-xl text-muted-foreground">
                ObraCalculada: A única ferramenta que você precisa para orçamentos profissionais
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${benefit.color}`}>
                      <benefit.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Veja o Que Nossos Clientes Estão Falando
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-lg italic">"{testimonial.content}"</p>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Invista Menos do Que Você Gasta em Combustível
            </h2>
            
            <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground mb-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-xl opacity-90 line-through">De R$ 197/mês</p>
                  <p className="text-5xl font-bold">R$ 97/mês</p>
                  <p className="text-lg opacity-90">Por apenas R$ 3,23/dia</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">R$ 50.000</p>
                    <p className="opacity-90">Economia anual média</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">90%</p>
                    <p className="opacity-90">Menos tempo gasto</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">30 dias</p>
                    <p className="opacity-90">Garantia total</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="hero" size="lg" className="group text-xl px-12 py-6">
                    QUERO ECONOMIZAR 90% DO MEU TEMPO
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Garantia de 30 dias ou seu dinheiro de volta</span>
              </div>
              
              <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span>Acesso imediato após o pagamento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sales;