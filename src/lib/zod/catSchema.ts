import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const upsertCatSchema = z.object({
  name: z.string().min(2, "Name minimal 3 karakter").optional(),
  age: z.number().max(7, "Age must be below 7"),
  catBreed: z.string().uuid("Must be uuid"),
  gender: z.enum(["MALE", "FEMALE"]),
  description: z.string().min(5, "Description minimal 5 karakter"),
  price: z.number(),
  quantity: z.number().default(1),
  status: z.enum(["AVAILABLE", "SOLD", "ADOPTED"]).default("AVAILABLE"),
  catPictures: z.array(z.instanceof(File)),
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

export type UpsertCatSchema = z.infer<typeof upsertCatSchema>;
