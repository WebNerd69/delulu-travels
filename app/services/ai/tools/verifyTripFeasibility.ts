import { tool } from "langchain";
import { z } from "zod";
import { chatMistralModelMedium } from "../models";
import tavilyClient from "@/lib/tavily";

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

        const { results } = await tavilyClient.search(searchQuery);

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
               ${JSON.stringify(results, null, 2)}

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
