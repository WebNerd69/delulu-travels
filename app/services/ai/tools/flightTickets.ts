import { tool } from "langchain";
import axios from "axios";
import { z } from "zod";
import formatPrice from "../../../utils/formatPrice";
import { Airline, AirportLocation, FlightDetail } from "@/app/types/flights.type";

const headers = {
    "x-rapidapi-key": process.env.RAPIDAPI_API_KEY,
    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    "Content-Type": "application/json",
};

const getApCodeURL =
    "https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination";

const searchFlightURL =
    "https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights";

const getFlightTickets = tool(
    async ({ from, to, sort, cabinClass, departureDate }) => {
        try {
            const [departureCityRes, destinationCityRes] = await Promise.all([
                axios.get<AirportLocation[]>(getApCodeURL, {
                    params: { query: from },
                    headers,
                }),
                axios.get<AirportLocation[]>(getApCodeURL, {
                    params: { query: to },
                    headers,
                }),
            ]);

            //   get departure and arival airport id
            const departureApDet = departureCityRes.data.find(
                (item) => item.cityName === from,
            );
            const destinationApDet = destinationCityRes.data.find(
                (item) => item.cityName === to,
            );

            //   get flights data
            const { data } = await axios.get(searchFlightURL, {
                params: {
                    fromId: departureApDet?.id,
                    toId: destinationApDet?.id,
                    departDate: departureDate,
                    sort,
                    cabinClass,
                    currency_code: "INR",
                },
                headers,
            });

            const flightsData: Airline[] = data?.aggregation?.airlines;

            const flights = flightsData.map<FlightDetail>((item) => ({
                name: item.name,
                logoURL: item.logoUrl,
                minPrice: formatPrice(item.minPrice.units, item.minPrice.nanos),
            }));

            return flights;
        } catch (error) {
            console.log(error);
            return "Theres was an error while fetching flight details.";
        }
    },
    {
        name: "search_flight_tickets",

        description: `Search for available flight tickets between two locations.
               Use this tool whenever the user wants to:
               - Find flights between two places.
               - Check available flight options.
               - Search for the cheapest, fastest, or best flights.
               
               Parameters:
               - from: Departure city. (nearest city with a functional airport)
               - to: Destination city.
               - sort: How to rank results ("BEST", "CHEAPEST", "FASTEST").
               - cabinClass: Preferred cabin class ("ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST").
               - departureDate: Date of flight departure.
               
               Only use this tool for flight searches.
                   `.trim(),

        schema: z.object({
            from: z
                .string()
                .describe(
                    "Departure city. If the user's city does not have a commercial airport, use the nearest city with a functional airport.",
                ),

            to: z.string().describe("Destination city where the user wants to fly."),

            sort: z
                .enum(["BEST", "CHEAPEST", "FASTEST"])
                .describe(
                    "How to sort the flight results: BEST for overall recommendation, CHEAPEST for the lowest fare, or FASTEST for the shortest travel time.",
                ),

            cabinClass: z
                .enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"])
                .describe("Preferred cabin class for the flight."),

            departureDate: z
                .string()
                .describe("Departure date in YYYY-MM-DD format (e.g. 2026-07-15)."),
        }),
    },
);

export default getFlightTickets;
