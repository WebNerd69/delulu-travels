import MiniSearch from "minisearch";
import { SearchDocument, SearchChunk } from "./document.type";

const buildMiniSearch = (document: SearchDocument) => {
    const miniSearch = new MiniSearch<SearchChunk>({
        fields: ["heading", "content"],

        storeFields: [
            "heading",
            "level",
            "content",
        ],
    });

    miniSearch.addAll(
        document.content.map((section, index) => ({
            id: `${index}`,
            heading: section.heading,
            level: section.level,
            content: section.content,
            score:0
        }))
    );

    return miniSearch;
};

export default buildMiniSearch;