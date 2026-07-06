import { SearchQueryInputtype, SearchQueriesSchema } from "@/app/types/searchQuery.type";
import { chatMistralModelMedium } from "../models/models";

const specificInstructions = `You are a Travel Search Planner.

Your task is to generate the smallest set of high-value web search queries needed to research a travel destination.

Input:
- Destination (required)
- Budget (optional)
- Duration (optional)
- Travel Mode (optional)
- Origin (optional)


Think silently before answering.

Your objective is to minimize search cost while maximizing useful travel knowledge.

Use the word "latest" for travel advisory , disaster research and transport research.

Always include searches for the destination's essential travel information:
- local transportation
- healthcare and emergency medical facilities
- safety or travel advisories
- connectivity and ATM

Then infer the destination's characteristics and generate additional searches only when they materially improve the travel plan.

Examples:
- Mountains → road conditions, landslides, snowfall, altitude, permits, fuel stations.
- Coastal areas → ferry schedules, tides, cyclones.
- Remote regions → fuel stations, ATMs, mobile coverage.
- Wildlife destinations → permits, park timings, wildlife advisories.
- Seasonal destinations → festivals, crowd levels, seasonal closures.
- Regions with unrest or disasters → road closures, emergency alerts, travel restrictions.

Do not search for information that is static or unlikely to affect planning such as:
- history
- geography
- language
- currency (unless international)
- generic tourist attractions
- domestic visa requirements

Use the origin only if it changes the research (e.g. international visa or route-specific transport).

Every query must:
- include the exact destination name
- search exactly one topic
- be directly usable in Google or Serper
- avoid duplicates
- be concise

Generate 5–8 queries.

Return ONLY:

{
  "queries": [
    "..."
  ]
}`;

const queryBuilderAgent =
    chatMistralModelMedium.withStructuredOutput(SearchQueriesSchema);

const createSearchQueries = async ({
    destination,
    origin,
    budget,
    travelMode,
    duration,
}: SearchQueryInputtype) => {

    let input = `destination: ${destination}`;
    try {
        if (origin) input += `\nOrigin: ${origin}`;
        if (budget) input += `\nBudget: ${budget}`;
        if (travelMode) input += `\nTravel Mode: ${travelMode}`;
        if (duration) input += `\nDuration: ${duration}`;

        const res = await queryBuilderAgent.invoke(specificInstructions + input);
        return { res, status: 200 , error:null };
    } catch (error) {
        return { res: null, status: 500 , error };
    }
};

export default createSearchQueries;
