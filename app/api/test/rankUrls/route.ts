import filterUrls from "@/app/lib/filters/rankedURL.filter";
import rankURLs from "@/app/lib/ranker/url/minisearch.ranker";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { query, docs } = await req.json();
        const res = rankURLs(query, docs);
        const documents = [{query: query , urls: res}]
        const response = filterUrls(documents)
        return NextResponse.json({ res: response, error: null, status: 200 });
    } catch (error) {
        return NextResponse.json({ res: null, error, status: 200 });
    }
}
