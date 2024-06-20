
import { DB } from "@/Helpers/db"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"


export async function GET(req: NextRequest) {


    try {

        const token: any = req.cookies.get("DSMtoken")?.value || null 

        if (token === null) {

            console.log("no token")

            return NextResponse.json({ flag:false })

        } else {

            const usedata = await jwt.verify(token, "sarath1937")

            return NextResponse.json({ flag: true, data: usedata })


        }


    } catch (error:any) {

        console.log(error.message)
        return NextResponse.json({ err: true })

    }


}  