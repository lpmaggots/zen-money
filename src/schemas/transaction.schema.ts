import { z } from 'zod'

export const transactionSchema = z.object({
  description: z
    .string({ required_error: 'Descrição é obrigatória' })
    .min(1, 'Descrição é obrigatória')
    .max(100, 'Máximo de 100 caracteres'),
  amount: z
    .string({ required_error: 'Informe um valor' })
    .min(1, 'Informe um valor')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: 'O valor deve ser maior que zero',
    }),
  type: z.string({ required_error: 'Selecione o tipo' }).min(1, 'Selecione o tipo'),
  category: z
    .string({ required_error: 'Selecione uma categoria' })
    .min(1, 'Selecione uma categoria'),
  date: z.string({ required_error: 'Data é obrigatória' }).min(1, 'Data é obrigatória'),
})

export type TransactionSchemaValues = z.infer<typeof transactionSchema>
