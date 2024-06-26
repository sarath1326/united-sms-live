
import { NextRequest, NextResponse } from "next/server"
import { DB } from "@/Helpers/db"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"


export async function GET(req: NextRequest) {

      try {

            DBconnecting()

            const url = new URL(req.url);
            const params = new URLSearchParams(url.search)

            const data: any = params.get("data")

            const finddata= await sparesschema.find({partcode:data})

            // const finddata = await DB.spares.findMany({

            //       where: { partcode: data }
            // })

            
            
            if (finddata.length === 0) {

                  const findresult = await sparesschema.find({customernumber:data})

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
