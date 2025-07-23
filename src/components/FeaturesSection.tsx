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
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Funcionalidades Poderosas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para criar orçamentos precisos e profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;