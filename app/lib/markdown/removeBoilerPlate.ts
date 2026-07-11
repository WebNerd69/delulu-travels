import { visit } from "unist-util-visit";
import { Parent } from "mdast";
import { toString } from "mdast-util-to-string";

const BAD_PATTERNS = [
    "subscribe",
    "follow us",
    "cookie",
    "advertisement",
    "all rights reserved",
    "privacy policy",
    "terms of service",
    "read more",
    "share",
    "newsletter",
    "copyright",
];

const SOCIAL_WORDS = [
    "facebook",
    "instagram",
    "twitter",
    "x",
    "youtube",
    "linkedin",
    "pinterest",
    "threads",
    "reddit",
];

const SEPARATOR_REGEX = /^[-–—_=*|•·\s]{3,}$/;

const URL_REGEX =
    /^(https?:\/\/|www\.)/i;

const removeBoilerplate = (tree: Parent) => {
    visit(tree, "paragraph", (node, index, parent) => {
        if (!parent || index == null) return;

        const text = toString(node).trim().toLowerCase();

        // Empty
        if (!text) {
            parent.children.splice(index, 1);
            return;
        }

        // --------- ***** |||||
        if (SEPARATOR_REGEX.test(text)) {
            parent.children.splice(index, 1);
            return;
        }

        // Standalone URL
        if (URL_REGEX.test(text)) {
            parent.children.splice(index, 1);
            return;
        }

        // Social-only paragraph
        if (
            SOCIAL_WORDS.some(
                (word) =>
                    text === word ||
                    text.startsWith(`${word} |`) ||
                    text.endsWith(`| ${word}`) ||
                    text.includes(` ${word} `)
            )
        ) {
            parent.children.splice(index, 1);
            return;
        }

        // Paragraph containing only link nodes
        if (
            node.children.length > 0 &&
            node.children.every((child) => child.type === "link")
        ) {
            parent.children.splice(index, 1);
            return;
        }

        // Boilerplate phrases
        if (BAD_PATTERNS.some((pattern) => text.includes(pattern))) {
            parent.children.splice(index, 1);
        }
    });
};

export default removeBoilerplate;