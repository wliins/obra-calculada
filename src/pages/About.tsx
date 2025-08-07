import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  Target, 
  Award,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      name: "João Silva",
      role: "CEO & Fundador",
      description: "Engenheiro Civil com 15+ anos de experiência em gestão de obras",
      image: "/placeholder.svg"
    },
    {
      name: "Maria Santos",
      role: "CTO",
      description: "Desenvolvedora Full-Stack especialista em soluções para construção civil",
      image: "/placeholder.svg"
    },
    {
      name: "Carlos Lima",
      role: "Head de Produto",
      description: "Especialista em UX/UI com foco em ferramentas para engenharia",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Precisão",
      description: "Orçamentos precisos baseados em dados reais do mercado e metodologias comprovadas"
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Ferramentas que facilitam o trabalho em equipe e a comunicação com clientes"
    },
    {
      icon: Award,
      title: "Excelência",
      description: "Compromisso com a qualidade e melhoria contínua dos nossos produtos"
    },
    {
      icon: Heart,
      title: "Paixão",
      description: "Amor pelo que fazemos e dedicação ao sucesso dos nossos clientes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">ObraCalculada</h1>
              <p className="text-xs text-muted-foreground">Sobre Nós</p>
            </div>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" size="sm" className="sm:size-default">
              <ArrowLeft className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Voltar ao Início</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Revolucionando a Construção Civil
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Nascemos da necessidade de tornar os orçamentos de obras mais precisos, 
              rápidos e acessíveis para profissionais de todos os tamanhos.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Fundada em 2023 por uma equipe de engenheiros e desenvolvedores, 
                a ObraCalculada nasceu da frustração com processos manuais e 
                demorados de orçamentação.
              </p>
              <p>
                Percebemos que muitos profissionais perdiam horas preciosas 
                criando orçamentos, muitas vezes com imprecisões que custavam 
                caro aos projetos.
              </p>
              <p>
                Decidimos criar uma solução que combinasse conhecimento técnico 
                de engenharia com tecnologia moderna, resultando em uma plataforma 
                que automatiza e otimiza todo o processo de orçamentação.
              </p>
            </div>
          </div>
          <Card className="shadow-glow">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-gradient-primary p-4 rounded-2xl w-fit mx-auto mb-4">
                    <Building2 className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Missão</h3>
                </div>
                <p className="text-center text-muted-foreground">
                  Democratizar o acesso a orçamentos precisos e profissionais, 
                  permitindo que engenheiros e construtoras foquem no que fazem 
                  de melhor: construir.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Nossos Valores</h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Os princípios que guiam nosso trabalho todos os dias
              </p>
            </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Nossa Equipe</h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Profissionais apaixonados por inovação e construção civil
              </p>
            </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted/30 rounded-2xl p-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Entre em Contato</h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Tem dúvidas ou sugestões? Adoramos conversar!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">contato@obracalculada.com</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-muted-foreground">(11) 9999-9999</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="bg-success/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-success" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-muted-foreground">São Paulo, SP</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="lg">
                  Começar Grátis
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Ver Demonstração
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;