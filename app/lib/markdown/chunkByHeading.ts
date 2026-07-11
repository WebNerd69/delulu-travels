import type {
    Root,
    Heading,
    Paragraph,
    List,
    Blockquote,
    Code,
} from "mdast";
import { toString } from "mdast-util-to-string";
import type { MarkdownSection } from "./types";

const chunkByHeading = (tree: Root): MarkdownSection[] => {
    const sections: MarkdownSection[] = [];

    let current: MarkdownSection | null = null;

    for (const node of tree.children) {
        if (node.type === "heading") {
            // Save previous section
            if (current && current.content.trim()) {
                current.content = current.content.trim();
                sections.push(current);
            }

            current = {
                heading: toString(node),
                level: node.depth,
                content: "",
            };

            continue;
        }

        if (!current) {
            continue;
        }

        switch (node.type) {
            case "paragraph":
            case "blockquote":
            case "list":
            case "code":
                current.content += toString(node) + "\n\n";
                break;

            default:
                break;
        }
    }

    if (current && current.content.trim()) {
        current.content = current.content.trim();
        sections.push(current);
    }

    return sections;
};

export default chunkByHeading;