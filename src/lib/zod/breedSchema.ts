import { z } from "zod";

export const upsertBreedSchema = z.object({
  name: z.string().min(2, "Name minimal 3 karakter"),
  description: z.string().min(5, "Description minimal 5 karakter"),
  image: z.object({
    file: z.instanceof(File),
    preview: z.string().min(1, "Preview is required"),
  }),
});

export type UpsertBreedSchema = z.infer<typeof upsertBreedSchema>;
