

import { DB } from "@/Helpers/db"

import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest) {

    try {

        const url = new URL(req.url);
        const params = new URLSearchParams(url.search)

        const companyName: any = params.get("company")

        console.log(companyName)



        const data = await DB.spares.findMany({

            where: {

                company: companyName
            }
        })

        if (data.length === 0) {

            return NextResponse.json({ empty: true })
        
        } else {

            return NextResponse.json({ flag: true, data: data })


        }






    } catch (error) {


        return NextResponse.json({ flag: false })
    }


}







