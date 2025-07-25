import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
          
          <div className="flex justify-center">
            <div className="bg-gradient-primary p-3 rounded-2xl">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-muted-foreground">
              Comece a automatizar seus orçamentos hoje mesmo
            </p>
          </div>
        </div>

        {/* Register Form */}
        <Card className="shadow-glow border-border/50">
          <CardHeader>
            <CardTitle>Cadastro Gratuito</CardTitle>
            <CardDescription>
              14 dias de teste grátis • Sem cartão de crédito
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="João"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  placeholder="Silva"
                  className="bg-background"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input 
                id="company" 
                type="text" 
                placeholder="Sua Construtora Ltda"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Select>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Selecione sua função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineer">Engenheiro Civil</SelectItem>
                  <SelectItem value="architect">Arquiteto</SelectItem>
                  <SelectItem value="contractor">Empreiteiro</SelectItem>
                  <SelectItem value="manager">Gerente de Projetos</SelectItem>
                  <SelectItem value="owner">Proprietário da Empresa</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••"
                className="bg-background"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                Concordo com os{" "}
                <a href="#" className="text-primary hover:underline">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-primary hover:underline">
                  Política de Privacidade
                </a>
              </Label>
            </div>

            <Link to="/dashboard">
              <Button variant="hero" className="w-full" size="lg">
                Criar Conta Grátis
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;