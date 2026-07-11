import cleanMarkdown from "@/app/lib/markdown/cleaner";
import { MarkdownSection } from "@/app/lib/markdown/types";
import tavilyClient from "@/app/lib/tavily/tavily";
import { z } from "zod";

interface RESULT {
    id: string;
    title: string | null;
    content: MarkdownSection[];
    link: string;
}

const params = z.array(z.string());

type PARAMS = z.infer<typeof params>;

let res: RESULT[];

const extract = async (p: PARAMS) => {
    try {
        const { results } = await tavilyClient.extract(p);
        res = results.map((item, index) => ({
            id: JSON.stringify(index),
            title: item.title,
            content: cleanMarkdown(item.rawContent),
            link: item.url,
        }));
        return { success: true, res, error: null };
    } catch (error) {
        return { success: false, res: [], error };
    }
};

export default extract;
