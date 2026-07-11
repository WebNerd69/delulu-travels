import MiniSearch from "minisearch";
import { SearchDocument } from "./document.type";

function buildMiniSearch(docs: SearchDocument[]) {
    const miniSearch = new MiniSearch<SearchDocument>({
        fields: ["title", "content"],
        storeFields: ["title", "content", "link"],
    });

    miniSearch.addAll(docs);

    return miniSearch;
}

export default buildMiniSearch;
