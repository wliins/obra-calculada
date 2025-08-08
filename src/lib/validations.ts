import { z } from "zod";

// Schema para dados do projeto
export const projectSchema = z.object({
  projectName: z.string().min(3, "Nome do projeto deve ter pelo menos 3 caracteres"),
  clientName: z.string().min(2, "Nome do cliente deve ter pelo menos 2 caracteres"),
  projectType: z.enum(["house", "apartment", "commercial", "reform", "industrial"], {
    required_error: "Selecione um tipo de projeto"
  }),
  area: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().min(1, "Área deve ser maior que 0").max(10000, "Área máxima é 10.000m²")
  ),
  rooms: z.string().transform((val) => val ? parseInt(val) : 0).pipe(
    z.number().min(0, "Número de quartos não pode ser negativo").max(50, "Máximo 50 quartos")
  ),
  bathrooms: z.string().transform((val) => val ? parseInt(val) : 0).pipe(
    z.number().min(0, "Número de banheiros não pode ser negativo").max(20, "Máximo 20 banheiros")
  ),
  floors: z.string().transform((val) => val ? parseInt(val) : 1).pipe(
    z.number().min(1, "Mínimo 1 pavimento").max(100, "Máximo 100 pavimentos")
  ),
  description: z.string().optional()
});

// Schema para login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

// Schema para registro
export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

// Schema para configurações de calculadora
export const calculatorSettingsSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  materials: z.array(z.object({
    name: z.string().min(1, "Nome do material é obrigatório"),
    formula: z.string().min(1, "Fórmula é obrigatória"),
    unitPrice: z.number().min(0, "Preço unitário deve ser positivo")
  })),
  labor: z.array(z.object({
    name: z.string().min(1, "Nome do profissional é obrigatório"),
    formula: z.string().min(1, "Fórmula é obrigatória"),
    hourlyRate: z.number().min(0, "Valor por hora deve ser positivo")
  }))
});

// Tipos derivados dos schemas
export type ProjectData = z.infer<typeof projectSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type CalculatorSettings = z.infer<typeof calculatorSettingsSchema>;
