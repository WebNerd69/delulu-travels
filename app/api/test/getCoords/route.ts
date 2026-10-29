import getCoords from "@/app/lib/coordinates/getCoords";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
     try {
          const {location} = await req.json()
          console.log(location)
          const res = await getCoords(location)
          if (res?.success!= true){
               throw Error(res?.error)
          }
          return NextResponse.json({status:200 , coords:res , error:null})
     } catch (error) {
          return NextResponse.json({status:500 , coords:null , error})
          
     }
}