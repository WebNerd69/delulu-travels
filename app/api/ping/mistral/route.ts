import { mistralChatSingle } from "@/app/services/ai/chatSingle";
import { pingMistral } from "@/app/services/ai/ping";
import { NextResponse } from "next/server";

export async function GET() {
     const response = await pingMistral()
     return NextResponse.json({
          msg: response
     })
}

export async function POST(req : Request){
     const {msg} = await req.json();
     const res = await mistralChatSingle({msg})
     return NextResponse.json({
          msg: res.content
     })
}    