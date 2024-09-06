import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const upsertBreedSchema = z.object({
  name: z.string().min(2, "Name minimal 3 karakter"),
  description: z.string().min(5, "Description minimal 5 karakter"),
  image: z.instanceof(File),
  // todo: Kasih validasi file belum bisa
  // image: z
  //   .any()
  //   .refine((files) => files?.length <= 0, "Image is required.")
  //   .refine(
  //     (files) => files?.[0]?.size >= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     ".jpg, .jpeg, .png and .webp files are accepted."
  //   ),
});

export type UpsertBreedSchema = z.infer<typeof upsertBreedSchema>;
