import { z } from "zod";

export const videosQuerySchema = z.object({
  search: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  startDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format for startDate",
    }),
  endDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format for endDate",
    }),
  sortBy: z.enum(["newest", "oldest"]).optional(),
  page: z.coerce.number().min(1).optional(),
  pageSize: z.coerce.number().min(1).max(100).optional(),
});

export type VideosQuery = z.infer<typeof videosQuerySchema>;

export type VideosFilterQuery = z.infer<typeof videosQuerySchema>;

export type NormalizedVideosFilterQuery = {
  search?: string;
  tags: string[];
  startDate?: Date;
  endDate?: Date;
};
