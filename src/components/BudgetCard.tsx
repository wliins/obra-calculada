import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  FileText, 
  MoreHorizontal,
  Eye,
  Edit,
  Download
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface BudgetCardProps {
  budget: {
    id: number;
    projectName: string;
    clientName: string;
    value: string;
    status: string;
    date: string;
    area?: string;
    type?: string;
  };
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "bg-success/10 text-success border-success/20";
      case "em análise":
        return "bg-warning/10 text-warning border-warning/20";
      case "pendente":
        return "bg-muted text-muted-foreground border-border";
      case "rejeitado":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-300 group">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {budget.projectName}
          </CardTitle>
          <CardDescription>{budget.clientName}</CardDescription>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Value */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Valor</span>
          </div>
          <span className="text-xl font-bold text-primary">{budget.value}</span>
        </div>

        {/* Status and Date */}
        <div className="flex items-center justify-between">
          <Badge className={`${getStatusColor(budget.status)} border`}>
            {budget.status}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {budget.date}
          </div>
        </div>

        {/* Additional Info */}
        {budget.area && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Área:</span>
            <span>{budget.area}m²</span>
          </div>
        )}

        {budget.type && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tipo:</span>
            <span>{budget.type}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            Ver Detalhes
          </Button>
          <Button variant="default" size="sm" className="flex-1">
            <FileText className="h-3 w-3 mr-1" />
            Gerar PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;