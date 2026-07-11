import { visit } from "unist-util-visit";
import { Parent } from "mdast";
import { toString } from "mdast-util-to-string";

const BAD_HEADINGS = new Set([
    "related articles",
    "related posts",
    "you may also like",
    "comments",
    "share",
    "newsletter",
    "subscribe",
    "advertisement",
    "privacy policy",
    "terms",
    "footer",
    "navigation",
    "menu",
]);

const BAD_HEADING_PATTERNS = [
    /\+?\d[\d\s|-]{7,}/, // phone numbers
    /contact/i,
    /enquiry/i,
    /book now/i,
    /trip duration/i,
    /number of people/i,
    /request callback/i,
    /send enquiry/i,
];

const removeBadHeadings = (tree: Parent) => {
    const removeIndexes: number[] = [];

    visit(tree, "heading", (node, index, parent) => {
        if (!parent || index == null) return;

        const heading = toString(node).trim().toLowerCase();

        if (
            BAD_HEADINGS.has(heading) ||
            BAD_HEADING_PATTERNS.some((pattern) => pattern.test(heading))
        ) {
            removeIndexes.push(index);
        }
    });

    removeIndexes.reverse().forEach((i) => {
        tree.children.splice(i, 1);
    });
};

export default removeBadHeadings;
