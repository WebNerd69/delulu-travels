import isTravelRelated from "@/app/services/ai/utils/promptClassifier";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { msg } = await req.json();
        const res = await isTravelRelated(msg.trim());
        return NextResponse.json(
            {
                msg: res.content,
            },
            { status: 200 },
        );
    } catch (error) {
        console.warn(error);
        return NextResponse.json(
            {
                msg: "An error occoued at our end",
            },
            { status: 500 },
        );
    }
}