

import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/Helpers/db"


export async function POST(req: NextRequest) {

      try {
            
            const data = await req.json()
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm: any = today.getMonth() + 1; // Months start at 0!
            let dd: any = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;

            data.recevingdate = formattedToday;

            await DB.spares.create({

                  data: data
            })

            return NextResponse.json({ flag: true })


      } catch (error){


            return NextResponse.json({ flag: false })

      }


}