import { z } from "zod";
import { RankedDocument } from "../ranker/url/document.type";
import lowerBoundValue from "../../utils/lowerBoundValue.js";

interface Document {
    query: string;
    urls: RankedDocument[];
}

const filtered = z.object({
    query: z.string(),
    urls: z.array(z.string()),
});

type FILTERED = z.infer<typeof filtered>;

const filterUrls = (documents: Document[]): FILTERED[] => {
    return documents.map((doc) => {
        const scoreArray = doc.urls.map((item) => item.score);

        const minScore = scoreArray.length ? lowerBoundValue(scoreArray) : Infinity;

        const urls = doc.urls
            .filter((item) => item.score >= minScore)
            .map((item) => item.link);

        return {
            query: doc.query,
            urls,
        };
    });
};

export default filterUrls;
