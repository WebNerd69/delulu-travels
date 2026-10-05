import { z } from "zod";
import { RankedDocument } from "../ranker/url/document.type";

interface document{
     query: string,
     urls: RankedDocument[]
}

const filtered = z.object({
    query: z.string(),
    urls: z.array(z.string()),
});

type FILTERED = z.infer<typeof filtered>;

let filteredUrls: FILTERED[] = [];

const filterUrls = (documents: document[]) => {
    documents.map((doc) => {
        const urls = doc.urls.filter((item) => item.score >= 70).map((item) => item.link);

        filteredUrls.push({
            query: doc.query,
            urls: urls,
        });
    });

    return filteredUrls;
};

export default filterUrls;
