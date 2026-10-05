import { z } from "zod";

const SearchChunk = z.object({
    heading: z.string(),
    level: z.number(),
    content: z.string(),
    score: z.number().default(0),
});

const SearchDocument = z.object({
    id: z.string(),
    link: z.string(),
    query: z.string(),
    score: z.number(),
    content: z.array(SearchChunk),
});

export type SearchChunk = z.infer<typeof SearchChunk>;
export type SearchDocument = z.infer<typeof SearchDocument>;
export type RankedDocument = z.infer<typeof SearchDocument>;
