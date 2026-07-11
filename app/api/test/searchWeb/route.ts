import searchWeb from "@/app/services/ai/lib/web/searchWeb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        const {status , res , error} = await searchWeb(query);
        if (status === 500) {
            throw error;
        }
        return NextResponse.json({ status: 200, res, error });
    } catch (error) {
        return NextResponse.json({ status: 500, res: [], error });
    }
}
