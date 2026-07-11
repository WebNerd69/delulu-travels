import extract from "@/app/services/ai/lib/web/extractWeb";
import { NextResponse } from "next/server";

export async function POST(req: Response) {
    try {
        const { params } = await req.json();
        const { res, success, error } = await extract(params);
        if (success) {
            return NextResponse.json({ status: 200, res, error: error });
        } else {
            return NextResponse.json({ status: 500, res, error: error });
        }
    } catch (error) {
        return NextResponse.json({ status: 500, res: [], error });
    }
}
