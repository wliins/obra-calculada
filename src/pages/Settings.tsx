import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  CreditCard,
  Database,
  Save,
  Upload
} from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Configurações</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-max">
              <TabsTrigger value="profile" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Empresa</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Cobrança</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" defaultValue="João" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" defaultValue="Silva" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="joao@empresa.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Conte um pouco sobre você..." />
                </div>
                <Button variant="default">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Configure os dados da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input id="companyName" defaultValue="Silva Construções Ltda" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ie">Inscrição Estadual</Label>
                    <Input id="ie" defaultValue="123.456.789.123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" defaultValue="Rua das Construções, 123" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" defaultValue="São Paulo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Select defaultValue="sp">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sp">São Paulo</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                        <SelectItem value="mg">Minas Gerais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" defaultValue="01234-567" />
                  </div>
                </div>
                <Button variant="default">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Orçamento</CardTitle>
                <CardDescription>
                  Personalize os cálculos padrão
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="markup">Margem de Lucro (%)</Label>
                    <Input id="markup" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax">Taxa de Impostos (%)</Label>
                    <Input id="tax" type="number" defaultValue="12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select defaultValue="brl">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brl">Real (R$)</SelectItem>
                      <SelectItem value="usd">Dólar (US$)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="default">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como você quer receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba atualizações importantes por email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Novos Orçamentos</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações quando um orçamento for criado
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Status de Aprovação</Label>
                      <p className="text-sm text-muted-foreground">
                        Quando um orçamento for aprovado/rejeitado
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Relatórios Semanais</Label>
                      <p className="text-sm text-muted-foreground">
                        Resumo semanal das atividades
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Atualizações do Sistema</Label>
                      <p className="text-sm text-muted-foreground">
                        Novidades e atualizações da plataforma
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Button variant="default">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>
                  Mantenha sua conta segura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button variant="default">
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Autenticação de Dois Fatores</CardTitle>
                <CardDescription>
                  Adicione uma camada extra de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>2FA Ativado</Label>
                    <p className="text-sm text-muted-foreground">
                      Requer código adicional para fazer login
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button variant="outline">
                  Configurar 2FA
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plano Atual</CardTitle>
                <CardDescription>
                  Gerencie sua assinatura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Plano Profissional</h3>
                    <p className="text-sm text-muted-foreground">
                      R$ 149/mês • Renovação em 15 dias
                    </p>
                  </div>
                  <Button variant="outline">
                    Alterar Plano
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Método de Pagamento</h4>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <span>•••• •••• •••• 1234</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>

                <Button variant="outline">
                  Ver Histórico de Faturas
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;