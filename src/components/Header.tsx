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
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </Link>
          <Link to="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="hero">
              Começar Grátis
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;