
import { DB } from "@/Helpers/db"
import { NextRequest, NextResponse } from "next/server"


export async function DELETE(req: NextRequest) {

    try {

        const url = new URL(req.url);
        const params = new URLSearchParams(url.search)

        const id: any = params.get("id")

       



     const del= await DB.spares.delete({

            where: {
                id: parseInt(id)
            }


        })

        console.log("delete",del)

        return NextResponse.json({ flag: true })


    } catch (error: any) {

         console.log(error.message)

        return NextResponse.json({ flag: false })

    }
}