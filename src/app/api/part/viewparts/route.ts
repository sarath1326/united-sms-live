

import { DB } from "@/Helpers/db"

import { NextRequest, NextResponse } from "next/server"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"





export async function GET(req: NextRequest) {

    try {

        DBconnecting()

        const url = req.nextUrl; 
        const params = url.searchParams; // Extracts the query parameters from the URL

        const companyName: any = params.get("company"); // Retrieves the value of the "company" query parameter

        console.log(companyName)



        const data = await sparesschema.find({ company: companyName })

        if (data.length === 0) {

            return NextResponse.json({ empty: true })
        
        } else {

            return NextResponse.json({ flag: true, data: data })


        }






    } catch (error:any) {


        return NextResponse.json({ flag: false , msg:error.message })
    }


}







