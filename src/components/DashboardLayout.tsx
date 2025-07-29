import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Home, 
  Plus, 
  History, 
  Settings, 
  LogOut,
  User,
  Bell,
  Calculator,
  DollarSign
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: "Painel", href: "/dashboard", icon: Home },
    { name: "Novo Orçamento", href: "/new-budget", icon: Plus },
    { name: "Histórico", href: "/budget-history", icon: History },
    { name: "Configurar Calculadoras", href: "/calculator-settings", icon: Calculator },
    { name: "Preços e Custos", href: "/price-settings", icon: DollarSign },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <span className="w-full h-0.5 bg-current"></span>
              <span className="w-full h-0.5 bg-current"></span>
              <span className="w-full h-0.5 bg-current"></span>
            </div>
          </Button>

          <Link to="/dashboard" className="flex items-center gap-2 lg:gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Building2 className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-foreground">ObraCalculada</h1>
              <p className="text-xs text-muted-foreground">Painel</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
              <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
              <User className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-10 lg:w-10">
              <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static top-16 left-0 z-40 w-64 bg-card border-r border-border 
          min-h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;