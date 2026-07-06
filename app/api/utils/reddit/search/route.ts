import getRedditPosts from "@/app/services/reddit/search.reddit";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
     try {
          const {query} = await req.json()
          const res = await getRedditPosts(query) 
          return NextResponse.json({res , status:200})
     } catch (error) {
          return NextResponse.json({res:error , status:500})
     }
}