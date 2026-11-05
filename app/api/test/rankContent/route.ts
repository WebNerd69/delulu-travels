import rankedContentFilter from "@/app/lib/filters/rankedContent.filter";
import rankContent from "@/app/lib/ranker/content/minisearch.ranker";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { document } = await req.json();
        const res = rankContent(document);
        console.log(res)
        const response = rankedContentFilter(res) 
        return NextResponse.json({ status: 200,res1:res, res:response, error: null });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, res: null, error });
    }
}
