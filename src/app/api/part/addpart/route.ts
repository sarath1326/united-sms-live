

import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/Helpers/db"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"


export async function POST(req: NextRequest) {


      


    
      try {

            DBconnecting()
            
            const data = await req.json()
            
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm: any = today.getMonth() + 1; // Months start at 0!
            let dd: any = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;

            data.value.recevingdate = formattedToday;

          

            if(data.flag){  // ow part adding time ow status is true 

                    data.value.owstatus=true
            }

            console.log(data)

              const final=  new sparesschema(data.value)

              await final.save()


            // await DB.spares.create({

            //       data: data.value
            // })

            return NextResponse.json({ flag: true })


      } catch (error:any){

             console.log(error.message)

            return NextResponse.json({ flag: false })

      }


}