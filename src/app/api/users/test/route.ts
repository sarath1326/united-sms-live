
import {DBconnecting} from "@/DBconfig/Dbconn"
import {sparesschema}  from "@/models/spares"

import { NextRequest , NextResponse} from "next/server"


export async function GET(req:NextRequest){

    
    try {

        
        DBconnecting()

        console.log("req test")

        const result= await sparesschema.find()


  
     return NextResponse.json({msg:"good luck",data:result})
        
    } catch (error) {
        
    }

     
}