import { SearchDocument } from "../ranker/content/document.type";
import { z } from "zod";

const filtered = z.object({
    query: z.string(),
    link: z.string(),
    content: z.array(
        z.object({
            heading: z.string(),
            content: z.string(),
        }),
    ),
});

type FILTERED = z.infer<typeof filtered>;

let filteredContent: FILTERED[] = [];

const rankedContentFilter = (documents: SearchDocument[]) => {
    documents.map((doc) => {
        if (doc.content.length <= 5) {
            filteredContent.push({
                query: doc.query,
                link: doc.link,
                content: doc.content.map((chunk) => ({
                    heading: chunk.heading,
                    content: chunk.content,
                })),
            });
        } else {
            filteredContent.push({
                query: doc.query,
                link: doc.link,
                content: doc.content
                    .filter((chunk) => chunk.score > 50)
                    .map((chunk) => ({
                        heading: chunk.heading,
                        content: chunk.content,
                    })),
            });
        }
    });
    return filteredContent
};

export default rankedContentFilter;
