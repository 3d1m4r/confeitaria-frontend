import { z } from "zod";

// Customer schemas for frontend-only (sem dependências do backend)
export const insertCustomerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  taxId: z.string().min(11, "CPF deve ter pelo menos 11 dígitos")
});

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
