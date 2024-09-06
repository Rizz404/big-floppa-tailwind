import { z } from "zod";

export const upsertPaymentMethodSchema = z.object({
  name: z.string().min(2, "Name minimal 3 karakter"),
  description: z.string().min(5, "Description minimal 5 karakter"),
  paymentFee: z.number().min(5, "Fee minimal 5 karakter").default(0),
});

export type UpsertPaymentMethodSchema = z.infer<
  typeof upsertPaymentMethodSchema
>;
