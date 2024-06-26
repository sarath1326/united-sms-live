
import { DB } from "@/Helpers/db"
import { NextRequest, NextResponse } from "next/server"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"


export async function DELETE(req: NextRequest) {

    try {

        DBconnecting()

        const url = new URL(req.url);
        const params = new URLSearchParams(url.search)

        const id: any = params.get("id")

       
      await sparesschema.deleteOne({_id:id}) 




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