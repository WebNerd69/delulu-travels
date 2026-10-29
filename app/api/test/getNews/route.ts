import { NextResponse } from "next/server";
import getNews from "@/app/lib/news/newsFetcher";

export async function POST(req: Request) {
    try {
        const { lat, long } = await req.json();
        const response = await getNews({ lat, long });
        return NextResponse.json({ news: response, error: null, status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ news: null, error: error, status: 500 });
    }
}
