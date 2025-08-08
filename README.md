# 🏗️ ObraCalculada - Sistema de Orçamentos para Construção Civil

Um sistema moderno e intuitivo para cálculo de orçamentos na construção civil, desenvolvido com React, TypeScript e Tailwind CSS.

## ✨ Características Principais

### 🚀 **Melhorias Implementadas**

- **✅ Validação Robusta**: Sistema de validação com Zod para todos os formulários
- **✅ Arquitetura Modular**: Componentes reutilizáveis e bem organizados
- **✅ Gerenciamento de Estado**: Hook personalizado para orçamentos com persistência local
- **✅ Sistema de Calculadoras Configurável**: Calculadoras flexíveis e extensíveis
- **✅ Tratamento de Erros**: Error Boundary e feedback visual para erros
- **✅ UX/UI Melhorada**: Interface moderna com feedback visual e loading states
- **✅ Performance Otimizada**: Lazy loading e otimizações de renderização
- **✅ TypeScript Completo**: Tipagem forte em todo o projeto
- **✅ Responsivo**: Design adaptável para todos os dispositivos

### 🎯 **Funcionalidades**

- **📊 Calculadoras Especializadas**: Projetos arquitetônicos, estruturais, hidrossanitários, elétricos
- **🏠 Construção Residencial**: Orçamentos para casas e apartamentos
- **🔧 Reformas**: Cálculos para adequações e reformas
- **💾 Persistência Local**: Salvamento automático no navegador
- **📤 Exportação**: Exportar orçamentos em diferentes formatos
- **📱 Responsivo**: Funciona perfeitamente em mobile e desktop
- **🎨 Tema Escuro/Claro**: Suporte a múltiplos temas
- **🔒 Validação**: Validação em tempo real dos formulários

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Validação**: Zod
- **Roteamento**: React Router DOM
- **Estado**: React Query + Hooks personalizados
- **Build**: Vite
- **Linting**: ESLint + TypeScript ESLint

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/obra-calculada.git
cd obra-calculada
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
bun install
```

3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

4. **Acesse o projeto**
```
http://localhost:5173
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── BudgetForm.tsx  # Formulário de dados do projeto
│   ├── CalculatorForm.tsx # Formulário de calculadoras
│   ├── BudgetResult.tsx   # Exibição de resultados
│   └── DashboardLayout.tsx # Layout do dashboard
├── hooks/              # Hooks personalizados
│   ├── useBudget.ts    # Gerenciamento de orçamentos
│   └── use-toast.ts    # Notificações
├── lib/                # Utilitários e configurações
│   ├── validations.ts  # Schemas de validação (Zod)
│   ├── calculators.ts  # Sistema de calculadoras
│   └── utils.ts        # Funções utilitárias
├── pages/              # Páginas da aplicação
├── config/             # Configurações centralizadas
└── assets/             # Recursos estáticos
```

## 🎯 Como Usar

### 1. **Criar um Novo Orçamento**
- Acesse o dashboard
- Clique em "Novo Orçamento"
- Preencha os dados do projeto
- Selecione uma calculadora
- Configure os parâmetros específicos
- Visualize o resultado detalhado

### 2. **Tipos de Calculadoras Disponíveis**

#### 📐 **Projetos**
- **Arquitetônico**: Desenvolvimento de projetos arquitetônicos
- **Estrutural**: Dimensionamento de estruturas
- **Hidrossanitário**: Sistemas de água e esgoto
- **Elétrico**: Instalações elétricas

#### 🏗️ **Construção**
- **Residencial**: Casas e apartamentos
- **Reforma**: Adequações e reformas

### 3. **Gerenciar Orçamentos**
- Visualize histórico completo
- Edite orçamentos existentes
- Exporte em diferentes formatos
- Compartilhe resultados

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local`:

```env
VITE_BASE_URL=http://localhost:3000
VITE_API_URL=http://localhost:3001/api
```

### Personalização de Calculadoras
As calculadoras podem ser configuradas em `src/lib/calculators.ts`:

```typescript
export const defaultCalculators: Calculator[] = [
  {
    id: "minha-calculadora",
    name: "Minha Calculadora",
    description: "Descrição da calculadora",
    category: "Categoria",
    inputs: [
      // Defina os campos de entrada
    ],
    materials: [
      // Defina os materiais
    ],
    labor: [
      // Defina a mão de obra
    ]
  }
];
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint

# Build de desenvolvimento
npm run build:dev
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 **Mobile**: Smartphones e tablets
- 💻 **Desktop**: Computadores e notebooks
- 🖥️ **Tablet**: Tablets em modo paisagem e retrato

## 🎨 Temas

O sistema suporta:
- 🌞 **Tema Claro**: Padrão
- 🌙 **Tema Escuro**: Para ambientes com pouca luz
- 🔄 **Auto**: Segue a preferência do sistema

## 🔒 Validação

Todos os formulários possuem validação robusta:
- ✅ Campos obrigatórios
- ✅ Tipos de dados corretos
- ✅ Limites mínimos e máximos
- ✅ Feedback visual em tempo real
- ✅ Mensagens de erro claras

## 📊 Persistência

Os dados são salvos automaticamente:
- 💾 **LocalStorage**: Orçamentos e configurações
- 🔄 **Sincronização**: Entre abas do navegador
- 📤 **Exportação**: Múltiplos formatos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 **Email**: contato@obracalculada.com
- 🌐 **Website**: https://obracalculada.com
- 📱 **WhatsApp**: +55 (11) 99999-9999

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI incríveis
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Lucide React](https://lucide.dev/) - Ícones bonitos
- [Zod](https://zod.dev/) - Validação de esquemas
- [React Query](https://tanstack.com/query) - Gerenciamento de estado

---

**Desenvolvido com ❤️ para a construção civil brasileira**
