import { Button } from "@/components/ui/button";
import { Building2, Calculator, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">ObraCalculada</h1>
            <p className="text-xs text-muted-foreground">Orçamentos Inteligentes</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Funcionalidades
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Entrar
          </Button>
          <Button variant="hero">
            Começar Grátis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;