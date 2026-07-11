import cleanMarkdown from "@/app/lib/markdown/cleaner";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { md } = await req.json();
        const cleaned = cleanMarkdown(md);

        return NextResponse.json({ content: cleaned, error: null, status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ content: "", error, status: 500 });
    }
}
