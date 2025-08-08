export const APP_CONFIG = {
  name: "ObraCalculada",
  version: "1.0.0",
  description: "Sistema de orçamentos para construção civil",
  
  // URLs
  baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  
  // Features
  features: {
    darkMode: true,
    offlineSupport: true,
    exportFormats: ["json", "pdf", "excel"],
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  
  // Validation
  validation: {
    maxProjectArea: 10000, // m²
    maxProjectNameLength: 100,
    maxClientNameLength: 50,
    maxDescriptionLength: 500,
  },
  
  // Storage
  storage: {
    budgetsKey: "budgets",
    settingsKey: "settings",
    themeKey: "theme",
  },
  
  // UI
  ui: {
    defaultPageSize: 10,
    maxPageSize: 100,
    animationDuration: 300,
    toastDuration: 5000,
  },
  
  // Calculations
  calculations: {
    defaultCurrency: "BRL",
    precision: 2,
    taxRate: 0.05, // 5%
    profitMargin: 0.15, // 15%
  },
  
  // Contact
  contact: {
    email: "contato@obracalculada.com",
    phone: "+55 (11) 99999-9999",
    website: "https://obracalculada.com",
    support: "https://suporte.obracalculada.com",
  },
  
  // Social
  social: {
    facebook: "https://facebook.com/obracalculada",
    instagram: "https://instagram.com/obracalculada",
    linkedin: "https://linkedin.com/company/obracalculada",
    youtube: "https://youtube.com/obracalculada",
  }
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  newBudget: "/new-budget",
  budgetHistory: "/budget-history",
  settings: "/settings",
  calculatorSettings: "/calculator-settings",
  priceSettings: "/price-settings",
  about: "/about",
  demo: "/demo",
  sales: "/sales",
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  budgets: {
    list: "/budgets",
    create: "/budgets",
    get: (id: string) => `/budgets/${id}`,
    update: (id: string) => `/budgets/${id}`,
    delete: (id: string) => `/budgets/${id}`,
    export: (id: string) => `/budgets/${id}/export`,
  },
  calculators: {
    list: "/calculators",
    create: "/calculators",
    get: (id: string) => `/calculators/${id}`,
    update: (id: string) => `/calculators/${id}`,
    delete: (id: string) => `/calculators/${id}`,
  },
  settings: {
    get: "/settings",
    update: "/settings",
  },
} as const;

export const ERROR_MESSAGES = {
  network: "Erro de conexão. Verifique sua internet e tente novamente.",
  unauthorized: "Sessão expirada. Faça login novamente.",
  forbidden: "Você não tem permissão para acessar este recurso.",
  notFound: "Recurso não encontrado.",
  serverError: "Erro interno do servidor. Tente novamente mais tarde.",
  validation: "Dados inválidos. Verifique as informações e tente novamente.",
  unknown: "Erro desconhecido. Tente novamente.",
} as const;

export const SUCCESS_MESSAGES = {
  budgetCreated: "Orçamento criado com sucesso!",
  budgetUpdated: "Orçamento atualizado com sucesso!",
  budgetDeleted: "Orçamento excluído com sucesso!",
  budgetExported: "Orçamento exportado com sucesso!",
  settingsSaved: "Configurações salvas com sucesso!",
  profileUpdated: "Perfil atualizado com sucesso!",
} as const;
