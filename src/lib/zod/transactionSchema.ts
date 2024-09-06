import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().min(2, "Name minimal 3 karakter"),
  description: z.string().min(5, "Description minimal 5 karakter"),
  fee: z.number().min(5, "Fee minimal 5 karakter").default(0),
  estimationTime: z.string().min(5, "Waktu estimasi minimal 5 karakter"),
});

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>;
