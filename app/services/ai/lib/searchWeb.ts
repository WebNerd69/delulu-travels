import { z } from "zod";
import axios from "axios";
import formatQuery from "@/app/utils/formatQuery";
import { error } from "console";

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
    position: number;
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

const searchWeb = async (query: string) => {
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
                position: -1,
            })) ?? [];

        response = [...org, ...paa];

        return { status: 200, res: response, error: null };
    } catch (error) {
        return { status: 500, res: response, error };
    }
};

export default searchWeb;
