import { googleChatSingle } from "@/app/services/ai/chatSingle";
import { pingGoogle } from "@/app/services/ai/ping";
import { NextResponse } from "next/server";

export async function GET() {
     const response = await pingGoogle()
     return NextResponse.json({
          msg: response
     })
}

export async function POST(req : Request){
     const {msg} = await req.json();
     const res = await googleChatSingle({msg})
     return NextResponse.json({
          msg: res.content
     })
}