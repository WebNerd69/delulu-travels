import {z} from "zod"

export const SQ = z.object({
     destination: z.string(),
     origin: z.string().optional(),
     budget: z.number().optional(),
     travelDate: z.string().optional(),
     duration: z.string().optional(),
     travelMode: z.string().optional(),
})

export const SearchQueriesSchema = z.object({
  queries: z
    .array(z.string())
    .min(3)
    .max(10)
    .describe("Concise web search queries for researching the travel destination."),
});

export type SearchQueries = z.infer<typeof SearchQueriesSchema>;

export type SearchQueryInputtype = z.infer<typeof SQ>