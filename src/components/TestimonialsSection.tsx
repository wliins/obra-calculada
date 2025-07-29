import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "Engenheiro Civil",
      company: "Construtora Alpha",
      content: "Revolucionou minha forma de trabalhar. Agora posso focar no que realmente importa: a qualidade da obra.",
      rating: 5,
      savings: "90% menos tempo",
      avatar: "CM"
    },
    {
      name: "Ana Silva",
      role: "Arquiteta",
      company: "Studio Silva",
      content: "Meus clientes ficam impressionados com a precisão e profissionalismo dos orçamentos. Nunca mais perdi obra por preço.",
      rating: 5,
      savings: "R$ 25k/mês economia",
      avatar: "AS"
    },
    {
      name: "João Santos",
      role: "Construtor",
      company: "Santos Construções",
      content: "Ferramenta que mudou meu negócio. Consigo fazer 10x mais orçamentos com qualidade superior.",
      rating: 5,
      savings: "10x mais orçamentos",
      avatar: "JS"
    },
    {
      name: "Maria Costa",
      role: "Empreiteira",
      company: "Costa Empreendimentos",
      content: "Impressionante como algo tão simples pode trazer resultados tão grandes. ROI em menos de 1 mês!",
      rating: 5,
      savings: "ROI em 3 semanas",
      avatar: "MC"
    },
    {
      name: "Pedro Lima",
      role: "Gestor de Obras",
      company: "Lima & Associados",
      content: "Minha equipe adora a facilidade de uso. Orçamentos que levavam dias agora ficam prontos em minutos.",
      rating: 5,
      savings: "Equipe 5x produtiva",
      avatar: "PL"
    },
    {
      name: "Julia Rodrigues",
      role: "Arquiteta",
      company: "JR Projetos",
      content: "Perfeito para quem quer se destacar no mercado. Meus orçamentos são os mais precisos da região.",
      rating: 5,
      savings: "99.8% precisão",
      avatar: "JR"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            +10.000 Profissionais Satisfeitos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Veja os
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Resultados Reais
            </span>
            de Quem Usa
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais de 10.000 profissionais já transformaram seus negócios. 
            Veja o que eles têm a dizer sobre os resultados.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Avaliação média</div>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-success mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Recomendam</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">Usuários ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-warning mb-2">1M+</div>
            <div className="text-sm text-muted-foreground">Orçamentos criados</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <p className="text-base leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
                    {testimonial.savings}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="text-primary-foreground">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Seja o Próximo Caso de Sucesso
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já transformaram 
                seus negócios e aumentaram seus lucros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button className="flex-1 bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Começar Agora - Grátis
                </button>
                <button className="flex-1 border border-white/20 text-white py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
                  Ver Casos de Sucesso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;