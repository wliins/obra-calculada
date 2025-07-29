import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  FileText, 
  Database, 
  Clock, 
  TrendingUp, 
  Shield,
  BarChart3,
  Download,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  const features = [
    {
      icon: Calculator,
      title: "Cálculos Automáticos",
      description: "Algoritmos baseados em SINAPI e TCPO para precisão máxima nos orçamentos.",
      color: "text-primary"
    },
    {
      icon: Database,
      title: "Base de Dados Atualizada",
      description: "Preços de materiais e mão de obra sempre atualizados com o mercado.",
      color: "text-accent"
    },
    {
      icon: FileText,
      title: "Relatórios Profissionais",
      description: "Gere PDFs detalhados com especificações técnicas e composições de custos.",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Reduza o tempo de criação de orçamentos de horas para minutos.",
      color: "text-warning"
    },
    {
      icon: BarChart3,
      title: "Análise de Margem",
      description: "Visualize lucros e otimize preços com análises detalhadas.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Gestão de Equipes",
      description: "Compartilhe projetos e colabore com sua equipe em tempo real.",
      color: "text-accent"
    },
    {
      icon: Download,
      title: "Múltiplos Formatos",
      description: "Exporte para PDF, Excel ou integre com seus sistemas existentes.",
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Seus projetos protegidos com criptografia e backup automático.",
      color: "text-warning"
    },
    {
      icon: TrendingUp,
      title: "Histórico de Preços",
      description: "Acompanhe variações de custos e tome decisões mais assertivas.",
      color: "text-primary"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calculator className="h-4 w-4" />
            Tecnologia Avançada
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Funcionalidades que
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Revolucionam
            </span>
            seu Negócio
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como nossa plataforma inteligente transforma o jeito que você cria orçamentos,
            economizando tempo e aumentando sua precisão e lucro.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/20 hover:-translate-y-2 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color.replace('text-', '')}/10 to-${feature.color.replace('text-', '')}/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="text-primary-foreground">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Pronto para Revolucionar Seus Orçamentos?
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Junte-se a mais de 10.000 profissionais que já transformaram 
                seus negócios com nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link to="/register" className="flex-1">
                  <Button variant="secondary" size="lg" className="w-full font-semibold">
                    Começar Agora - Grátis
                  </Button>
                </Link>
                <Link to="/demo" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    Ver Demonstração
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

export default FeaturesSection;