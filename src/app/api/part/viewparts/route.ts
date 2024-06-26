

import { DB } from "@/Helpers/db"

import { NextRequest, NextResponse } from "next/server"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"




export async function GET(req: NextRequest) {

    try {

        DBconnecting()

        const url = new URL(req.url);
        const params = new URLSearchParams(url.search)

        const companyName: any = params.get("company")

        console.log(companyName)



        const data = await sparesschema.find({ company: companyName })

        if (data.length === 0) {

            return NextResponse.json({ empty: true })
        
        } else {

            return NextResponse.json({ flag: true, data: data })


        }






    } catch (error) {


        return NextResponse.json({ flag: false })
    }


}







