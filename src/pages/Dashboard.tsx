import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Building2,
  Calendar,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Orçamentos este mês",
      value: "23",
      change: "+12%",
      icon: Building2,
      color: "text-primary"
    },
    {
      title: "Valor total orçado",
      value: "R$ 2.8M",
      change: "+18%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Tempo médio por orçamento",
      value: "8 min",
      change: "-25%",
      icon: Clock,
      color: "text-accent"
    },
    {
      title: "Taxa de conversão",
      value: "68%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-warning"
    }
  ];

  const recentBudgets = [
    {
      id: 1,
      project: "Casa Residencial - Vila Madalena",
      client: "João Silva",
      value: "R$ 185.000",
      status: "Em análise",
      date: "2024-01-15"
    },
    {
      id: 2,
      project: "Reforma Comercial - Centro",
      client: "Empresa ABC Ltda",
      value: "R$ 95.000",
      status: "Aprovado",
      date: "2024-01-14"
    },
    {
      id: 3,
      project: "Galpão Industrial - Guarulhos",
      client: "Indústria XYZ",
      value: "R$ 450.000",
      status: "Pendente",
      date: "2024-01-13"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Painel</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Bem-vindo de volta! Aqui está um resumo dos seus projetos.
            </p>
          </div>
          <Link to="/new-budget" className="w-full sm:w-auto">
            <Button variant="hero" size="lg" className="group w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Novo Orçamento</span>
              <span className="sm:hidden">Novo</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.change}</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Budgets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Orçamentos Recentes</CardTitle>
              <CardDescription>
                Últimos orçamentos criados
              </CardDescription>
            </div>
            <Link to="/budget-history">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBudgets.map((budget) => (
                 <div 
                   key={budget.id} 
                   className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors gap-3"
                 >
                   <div className="space-y-1 flex-1 min-w-0">
                     <h4 className="font-medium truncate">{budget.project}</h4>
                     <p className="text-sm text-muted-foreground truncate">{budget.client}</p>
                   </div>
                   <div className="sm:text-right space-y-1 flex-shrink-0">
                     <p className="font-semibold">{budget.value}</p>
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                       <span className={`text-xs px-2 py-1 rounded-full text-center ${
                         budget.status === "Aprovado" 
                           ? "bg-success/10 text-success" 
                           : budget.status === "Em análise"
                           ? "bg-warning/10 text-warning"
                           : "bg-muted text-muted-foreground"
                       }`}>
                         {budget.status}
                       </span>
                       <div className="flex items-center gap-1 justify-center sm:justify-start">
                         <Calendar className="h-3 w-3 text-muted-foreground" />
                         <span className="text-xs text-muted-foreground">{budget.date}</span>
                       </div>
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;