import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import removeBadHeadings from "./removeBadHeading";
import removeBoilerplate from "./removeBoilerPlate";
import removeEmptyNodes from "./removeEmptyNode";
import mergeParagraphs from "./mergeParagraphs";
import preCleanMarkdown from "./preClean";
import chunkByHeading from "./chunkByHeading";
import filterSections from "./filterSections";

const cleanMarkdown = (markdown: string) => {
    const preCleaned = preCleanMarkdown(markdown);

    const tree = remark().use(remarkParse).parse(preCleaned);

    removeBadHeadings(tree);
    removeBoilerplate(tree);
    removeEmptyNodes(tree);
    mergeParagraphs(tree);
    remark().use(remarkStringify).stringify(tree);

    const sections = chunkByHeading(tree);
    const filteredSections = filterSections(sections);
    return filteredSections;
};

export default cleanMarkdown;
