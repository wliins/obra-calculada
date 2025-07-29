import { Button } from "@/components/ui/button";
import { Building2, Calculator, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="bg-gradient-primary p-1.5 lg:p-2 rounded-lg">
            <Building2 className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-xl font-bold text-foreground">ObraCalculada</h1>
            <p className="text-xs text-muted-foreground">Orçamentos Inteligentes</p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
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
             Demonstração
           </Link>
           <Link to="/sales" className="text-muted-foreground hover:text-foreground transition-colors">
             Vendas
           </Link>
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="hero" size="sm" className="text-sm px-3 lg:px-4">
              <span className="hidden sm:inline">Começar Grátis</span>
              <span className="sm:hidden">Grátis</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;