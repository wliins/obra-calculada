import DashboardLayout from "@/components/DashboardLayout";
import BudgetCard from "@/components/BudgetCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

const BudgetHistory = () => {
  const budgets = [
    {
      id: 1,
      projectName: "Casa Residencial - Vila Madalena",
      clientName: "João Silva",
      value: "R$ 185.000",
      status: "Em análise",
      date: "2024-01-15",
      area: "120",
      type: "Residencial"
    },
    {
      id: 2,
      projectName: "Reforma Comercial - Centro",
      clientName: "Empresa ABC Ltda",
      value: "R$ 95.000",
      status: "Aprovado",
      date: "2024-01-14",
      area: "80",
      type: "Comercial"
    },
    {
      id: 3,
      projectName: "Galpão Industrial - Guarulhos",
      clientName: "Indústria XYZ",
      value: "R$ 450.000",
      status: "Pendente",
      date: "2024-01-13",
      area: "300",
      type: "Industrial"
    },
    {
      id: 4,
      projectName: "Apartamento - Jardins",
      clientName: "Maria Santos",
      value: "R$ 125.000",
      status: "Aprovado",
      date: "2024-01-12",
      area: "85",
      type: "Residencial"
    },
    {
      id: 5,
      projectName: "Loja - Shopping Center",
      clientName: "Varejista 123",
      value: "R$ 75.000",
      status: "Rejeitado",
      date: "2024-01-10",
      area: "50",
      type: "Comercial"
    },
    {
      id: 6,
      projectName: "Casa de Campo - Interior",
      clientName: "Roberto Lima",
      value: "R$ 220.000",
      status: "Em análise",
      date: "2024-01-08",
      area: "150",
      type: "Residencial"
    }
  ];

  const stats = [
    {
      title: "Total de Orçamentos",
      value: budgets.length.toString(),
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Valor Total Orçado",
      value: "R$ 1.15M",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Taxa de Aprovação",
      value: "60%",
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      title: "Este Mês",
      value: "12",
      icon: Calendar,
      color: "text-warning"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Histórico de Orçamentos</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe todos os seus orçamentos
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Exportar Todos
            </Button>
            <Link to="/new-budget">
              <Button variant="hero">
                <Plus className="h-4 w-4" />
                Novo Orçamento
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Encontre orçamentos específicos rapidamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por projeto ou cliente..." 
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="em-analise">Em Análise</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                Mais Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Budget List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Carregar Mais Orçamentos
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BudgetHistory;