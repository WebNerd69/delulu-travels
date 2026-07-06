import createSearchQueries from "@/app/services/ai/agents/createSearchQueries.agent";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const msg = await req.json();
    try {
        const { res, status, error } = await createSearchQueries({
            destination: msg.destination,
            origin: msg.origin,
            budget: msg.budget,
            travelDate: msg.travelDate,
            travelMode: msg.travelMode,
            duration: msg.duration,
        });
        if (status === 200) {
            return NextResponse.json({ res, status });
        } else if (status === 500) {
            throw error;
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ res: "There is an err at our side...", status: 500 });
    }
}
