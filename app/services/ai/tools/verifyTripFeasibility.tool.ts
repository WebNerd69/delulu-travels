import { tool } from "langchain";
import { z } from "zod";
import { chatMistralModelMedium } from "../models/models";
import tavilyClient from "@/app/lib/tavily";
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

const responseSchema = z.object({
    feasible: z.boolean(),
    summary: z.string(),
    minimum_budget_inr_per_person: z.number(),
    recommended_budget_inr_per_person: z.number(),
    confidence: z.enum(["low", "medium", "high"]),
});

const summarizer = chatMistralModelMedium.withStructuredOutput(responseSchema);

const verifyTripFeasibility = tool(
    async ({ origin, destination, budgetPerPerson, travelers, duration }) => {
        
        const searchQuery = `Is a ${duration} trip from ${origin} to ${destination} for ${travelers} people with a budget of ₹${budgetPerPerson} per person feasible? Include flights, accommodation, food, transport and visa costs.`;

        const q = formatQuery(searchQuery);
        const url = `https://google.serper.dev/search?q=${q}&apiKey=${process.env.SERPER_API_KEY}`;
        const { data } = await axios.get<SERPER_RESPONSE>(url);

        response = data?.organic?.map((item) => ({
            title: item.title,
            content: item.snippet,
            link: item.link ?? "",
            date: item.date ?? "",
        }));

        response = data?.peopleAlsoAsk?.map((item) => ({
            title: item.question,
            content: item.snippet,
            link: "",
            date: "",
        }));

        const analysis = await summarizer.invoke(`
               Analyze the following travel search results.

               Trip:
               ${JSON.stringify(
                   {
                       origin,
                       destination,
                       duration,
                       travelers,
                       budgetPerPerson,
                   },
                   null,
                   2,
               )}

               Search Results:
               ${JSON.stringify(response, null, 2)}

               Rules:
               - Ignore ads and irrelevant results.
               - Estimate costs conservatively.
               - Return budgets in INR.
               - Keep the summary under 100 words.
          `);

        return analysis;
    },
    {
        name: "verify_trip_feasibility",
        description:
            "Verify whether a proposed trip is financially feasible using current travel information. Use when the user asks if a budget is sufficient or when the trip budget appears unrealistic.",
        schema: z.object({
            origin: z.string().describe("Departure city"),
            destination: z.string().describe("Destination city"),
            budgetPerPerson: z.number().describe("Budget per traveler in INR"),
            travelers: z.number().describe("Number of travelers"),
            duration: z.string().describe("Trip duration (e.g. 5 days, 2 weeks)"),
        }),
    },
);

export default verifyTripFeasibility;
