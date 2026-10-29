import { z } from "zod";

const newsType = z.object({
    index: z.number(),
    date: z.string(),
    imageURL: z.string(),
    title: z.string(),
    summary: z.string(),
    shortSummary: z.string(),
    url: z.string(),
});

type newsType = z.infer<typeof newsType>;

export default newsType;
