

import { NextRequest , NextResponse} from "next/server"


export async function GET(req:NextRequest){

     console.log("req test")
  
     return NextResponse.json({msg:"good luck"})
}