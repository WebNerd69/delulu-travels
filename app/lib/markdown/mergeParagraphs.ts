import { toString } from "mdast-util-to-string";
import type { Parent, Paragraph, RootContent, Text } from "mdast";

function createParagraph(text: string): Paragraph {
    const textNode: Text = {
        type: "text",
        value: text,
    };

    return {
        type: "paragraph",
        children: [textNode],
    };
}

const mergeParagraphs = (tree: Parent) => {
    const merged: RootContent[] = [];
    let buffer = "";

    for (const node of tree.children) {
        if (node.type === "paragraph") {
            // Preserves readable text from links, emphasis, inline code, etc.
            const value = toString(node).trim();

            if (value) {
                buffer += (buffer ? "\n\n" : "") + value;
            }
        } else {
            if (buffer) {
                merged.push(createParagraph(buffer));
                buffer = "";
            }

            merged.push(node);
        }
    }

    if (buffer) {
        merged.push(createParagraph(buffer));
    }

    tree.children = merged;
};

export default mergeParagraphs;