

import { DB } from "@/Helpers/db"

import { NextRequest, NextResponse } from "next/server"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"





export async function POST(req: NextRequest) {

    try {

        DBconnecting()

        // const params = req.nextUrl.searchParams 
        // // Extracts the query parameters from the URL

        // const companyName: any = params.get("company"); // Retrieves the value of the "company" query parameter

        const companyName = await req.json()
        console.log(companyName)



        const data = await sparesschema.find({ company: companyName.name})

        if (data.length === 0) {

            return NextResponse.json({ empty: true })
        
        } else {

            return NextResponse.json({ flag: true, data: data })


        }






    } catch (error:any) {


        return NextResponse.json({ flag: false , msg:error.message })
    }


}







