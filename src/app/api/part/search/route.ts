
import { NextRequest, NextResponse } from "next/server"
import { DB } from "@/Helpers/db"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"


export async function POST(req: NextRequest) {

      try {

            DBconnecting()

            // const url = req.nextUrl; // Use req.nextUrl to get the URL object directly
            // const params = url.searchParams; // Extracts the query parameters from the URL
    

           
            const data= await req.json()

            const finddata= await sparesschema.find({partcode:data.name})

            // const finddata = await DB.spares.findMany({

            //       where: { partcode: data }
            // })

            
            
            if (finddata.length === 0) {

                  const findresult = await sparesschema.find({customernumber:data.name})

                  // const findresult = await DB.spares.findMany({

                  //       where: {

                  //             customernumber: data
                  //       }
                  // })

                  if(findresult.length===0){

                         return NextResponse.json({flag:false})
                  }else{

                        return NextResponse.json({flag:true,data:findresult})   // sent data. find by customer mobile number 
                  }
            
            } else {
                  
                  
                  return NextResponse.json({flag:true,data:finddata})
            }
      
      
        } catch (error) {

                 return NextResponse.json({err:true})      
     
      }
}
