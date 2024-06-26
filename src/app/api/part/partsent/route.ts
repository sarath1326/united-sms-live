
import { NextRequest, NextResponse } from "next/server"
import { DB } from "@/Helpers/db"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"




export async function POST(req: NextRequest) {

    try {

        DBconnecting()

        const { index } = await req.json()

      
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm: any = today.getMonth() + 1; // Months start at 0!
        let dd: any = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

        await sparesschema.updateOne({_id:index},{

             $set:{

                partsent: true,
                partsentdate: formattedToday
             }
        })

        // await DB.spares.update({

        //     where: { id:index },
        //     data: {

        //         partsent: true,
        //         partsentdate: formattedToday
        //     }
        // })

        return NextResponse.json({ flag: true , date:formattedToday })

    } catch (error:any) {

        console.log(error.message)

        return NextResponse.json({ flag: false })

    }


}


