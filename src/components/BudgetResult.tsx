import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Download, 
  Share2, 
  FileText,
  DollarSign,
  Package,
  Users,
  Calculator,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import { CalculationResult } from "@/lib/calculators";
import { ProjectData } from "@/lib/validations";

interface BudgetResultProps {
  projectData: ProjectData;
  result: CalculationResult;
  calculatorName: string;
  onExport?: () => void;
  onShare?: () => void;
  onGenerateProposal?: () => void;
  className?: string;
}

export default function BudgetResult({
  projectData,
  result,
  calculatorName,
  onExport,
  onShare,
  onGenerateProposal,
  className = ""
}: BudgetResultProps) {
  const [copied, setCopied] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const copyToClipboard = async () => {
    const summary = `
Orçamento - ${projectData.projectName}
Cliente: ${projectData.clientName}
Calculadora: ${calculatorName}
Área: ${projectData.area}m²

RESUMO:
Materiais: ${formatCurrency(result.totalMaterials)}
Mão de obra: ${formatCurrency(result.totalLabor)}
TOTAL: ${formatCurrency(result.total)}
Valor por m²: ${formatCurrency(result.total / parseFloat(projectData.area))}
    `.trim();

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar para área de transferência:', err);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Summary Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Resumo do Orçamento
          </CardTitle>
          <CardDescription>
            {projectData.projectName} • {projectData.area}m² • {calculatorName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Materiais</span>
              </div>
              <p className="text-2xl font-bold">
                {formatCurrency(result.totalMaterials)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Mão de obra</span>
              </div>
              <p className="text-2xl font-bold">
                {formatCurrency(result.totalLabor)}
              </p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold">Total</span>
              </div>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(result.total)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              ~{formatCurrency(result.total / parseFloat(projectData.area))} por m²
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Composição Detalhada</CardTitle>
          <CardDescription>
            Breakdown completo dos custos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Materials */}
          {result.materials.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Composição de Materiais
              </h4>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Item</TableHead>
                      <TableHead className="text-center font-semibold">Qtd</TableHead>
                      <TableHead className="text-center font-semibold">Unidade</TableHead>
                      <TableHead className="text-right font-semibold">Valor Unit.</TableHead>
                      <TableHead className="text-right font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.materials.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">{formatNumber(item.quantity)}</TableCell>
                        <TableCell className="text-center">{item.unit}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.unitPrice)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 bg-muted/30">
                      <TableCell colSpan={4} className="font-bold">Subtotal Materiais</TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {formatCurrency(result.totalMaterials)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Labor */}
          {result.labor.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Composição de Mão de Obra
              </h4>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Profissional</TableHead>
                      <TableHead className="text-center font-semibold">Horas</TableHead>
                      <TableHead className="text-center font-semibold">Unidade</TableHead>
                      <TableHead className="text-right font-semibold">Valor/Hora</TableHead>
                      <TableHead className="text-right font-semibold">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.labor.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">{formatNumber(item.hours)}</TableCell>
                        <TableCell className="text-center">{item.unit}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.hourlyRate)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(item.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 bg-muted/30">
                      <TableCell colSpan={4} className="font-bold">Subtotal Mão de Obra</TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {formatCurrency(result.totalLabor)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copiado!" : "Copiar"}
            </Button>
            
            {onShare && (
              <Button variant="outline" className="w-full" onClick={onShare}>
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
            )}
            
            {onExport && (
              <Button variant="outline" className="w-full" onClick={onExport}>
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            )}
            
            {onGenerateProposal && (
              <Button variant="hero" className="w-full" onClick={onGenerateProposal}>
                <FileText className="h-4 w-4" />
                Gerar Proposta
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
