import buildMiniSearch from "./minisearch.config";
import { RankedDocument, SearchDocument } from "./document.type";

const rankContent = (documents: SearchDocument[]): RankedDocument[] => {
    return documents.map((document) => {
        const miniSearch = buildMiniSearch(document);

        const rankedSections = miniSearch
            .search(document.query, {
                boost: {
                    heading: 5,
                    content: 3,
                },

                prefix: true,

                fuzzy: 0.15,

                combineWith: "OR",
            })
            .map((result) => {
                return {
                    heading: result.heading as string,
                    level: result.level as number,
                    content: result.content as string,
                    score: result.score * 0.6 + document.score * 0.4,
                };
            })
            .sort((a, b) => b.score - a.score);

        return {
            id: document.id,
            query: document.query,
            link: document.link,
            score: document.score,
            content: rankedSections,
        };
    });
};

export default rankContent;
