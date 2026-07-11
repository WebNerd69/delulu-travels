import { RankedDocument, SearchDocument } from "./document.type";
import buildMiniSearch from "./minisearch.config";
import { SearchResult } from "minisearch";

type MiniSearchResult = SearchResult & SearchDocument;

const rankURLs = (query: string, docs: SearchDocument[]): RankedDocument[] => {
    const miniSearch = buildMiniSearch(docs);

    const results = miniSearch.search(query, {
        boost: {
            title: 5,
            content: 3,
        },
        prefix: true,
        fuzzy: 0.2,
    });

    return results
        .map((result) => {
            const doc = result as MiniSearchResult;

            return {
                ...doc,
                score: doc.score + Math.max(0, 11 - doc.position),
            };
        })
        .sort((a, b) => b.score - a.score);
};

export default rankURLs;
