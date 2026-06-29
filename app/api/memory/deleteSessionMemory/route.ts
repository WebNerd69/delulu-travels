import { deleteShortTermMemory } from "@/app/services/redis/ShortMemory"
import { NextResponse } from "next/server"

export async function DELETE(){
     try {
          const {success , response , errors} = await deleteShortTermMemory("test-1")
          if(success){
               return NextResponse.json({msg : response , status:204})
          }else{
               return NextResponse.json({msg : errors , status:500})
          }
     } catch (error) {
          return NextResponse.json({msg : "some shit happened :(" , status:500})
     }
}