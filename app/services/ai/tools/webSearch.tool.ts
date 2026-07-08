import { tool } from "langchain";
import { z } from "zod";
import axios from "axios";
import formatQuery from "@/app/utils/formatQuery";

interface OrganicResult {
    position: number;
    title: string;
    snippet: string;
    link: string;
    date?: string;
}
interface PeopleAlsoAsk {
    question: string;
    snippet: string;
    title: string;
    link: string;
}

interface SERPER_RESPONSE {
    organic: OrganicResult[];
    peopleAlsoAsk: PeopleAlsoAsk[];
}

interface Response {
    title: string;
    content: string;
    link: string;
    date: string;
}

let response: Response[];
let org: Response[];
let paa: Response[];

const blockedDomains = [
    "instagram.com",
    "facebook.com",
    "youtube.com",
    "youtu.be",
    "reddit.com",
    "pinterest.com",
    "x.com",
    "twitter.com",
    "threads.net",
    "linkedin.com",
    "tiktok.com",
];

const webSearch = tool(
    async ({ query }) => {
        try {
            const q = formatQuery(query);
            const url = `https://google.serper.dev/search?q=${q}&gl=in&apiKey=${process.env.SERPER_API_KEY}`;
            const { data } = await axios.get<SERPER_RESPONSE>(url);

            org = data?.organic
            .filter(
                (item) => !blockedDomains.some((domain) => item.link.includes(domain)),
            )
            .map((item , index) => ({
                title: item.title,
                content: item.snippet,
                link: item.link ?? "",
                date: item.date ?? "",
                position: index,
            })) ?? [];

            paa =
                data?.peopleAlsoAsk?.map((item) => ({
                    title: item.question,
                    content: item.snippet,
                    link: "",
                    date: "",
                })) ?? [];

            response = [...org, ...paa];

            return response;
        } catch (error) {
            console.log(error);
            return "There was an errror at our side.";
        }
    },
    {
        name: "search_web",
        description:
            "Search the web for current or factual travel information such as weather, road conditions, travel advisories, permits, transportation, healthcare, accommodation costs, festivals, local regulations and other destination-specific information.",
        schema: z.object({
            query: z
                .string()
                .describe(
                    "A concise, specific web search query optimized for a search engine.",
                ),
        }),
    },
);

export default webSearch;
