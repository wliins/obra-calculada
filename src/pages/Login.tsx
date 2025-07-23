import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
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
            <h1 className="text-2xl font-bold">Entrar na sua conta</h1>
            <p className="text-muted-foreground">
              Digite suas credenciais para acessar o dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-glow border-border/50">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Bem-vindo de volta ao ObraCalculada
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="bg-background"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Link to="/dashboard">
              <Button variant="hero" className="w-full" size="lg">
                Entrar
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Cadastre-se grátis
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Access */}
        <Card className="border-accent/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-accent">Acesso Demo</h3>
              <p className="text-sm text-muted-foreground">
                Quer testar antes? Experimente nossa demonstração
              </p>
              <Link to="/demo">
                <Button variant="accent" className="w-full">
                  Acessar Demo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;