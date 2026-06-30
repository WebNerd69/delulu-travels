import { getShortTermMemory } from "@/app/services/redis/ShortMemory";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
     try {
          const {sessionId} = await req.json()
          const {success , response , errors } = await getShortTermMemory(sessionId)
          if (success){
               return NextResponse.json({res : response , status:200})
          }else{
               return NextResponse.json({res :errors , status:500})
          }
     } catch (error) {
          console.log(error)
          return NextResponse.json({res :error , status:500})
     }
}