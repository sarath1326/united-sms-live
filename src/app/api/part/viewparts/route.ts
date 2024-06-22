

import {DB} from "@/Helpers/db"
import {NextRequest,NextResponse} from "next/server"



export async function GET(req:NextRequest){

    try {

        const data= await DB.spares.findMany()

        console.log(data)

        return NextResponse.json({flag:true , data:data})

         
        
    } catch (error) {


         return NextResponse.json({flag:false})
    }

         
}







