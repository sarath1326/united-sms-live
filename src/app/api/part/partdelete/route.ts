
import { DB } from "@/Helpers/db"
import { NextRequest, NextResponse } from "next/server"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"


export async function POST(req: NextRequest) {

    try {

        DBconnecting()

        // const url = req.nextUrl; // Use req.nextUrl to get the URL object directly
        // const params = url.searchParams; // Extracts the query parameters from the URL


        const id= await req.json()

       
      await sparesschema.deleteOne({_id:id.id}) 




    //  const del= await DB.spares.delete({

    //         where: {
    //             id: parseInt(id)
    //         }


    //     })

    //     console.log("delete",del)

        return NextResponse.json({ flag: true })


    } catch (error: any) {

         console.log(error.message)

        return NextResponse.json({ flag: false })

    }
}