import { visit } from "unist-util-visit";
import { Parent } from "mdast";
import { toString } from "mdast-util-to-string";

const removeEmptyNodes = (tree: Parent) =>{
    visit(tree, (node, index, parent) => {
        if (!parent || index == null) return;

        if (
            "children" in node &&
            toString(node).trim().length === 0
        ) {
            parent.children.splice(index, 1);
        }
    });
}

export default removeEmptyNodes