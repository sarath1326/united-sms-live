

import { DBconnecting } from "@/DBconfig/Dbconn";
import userSchema from "@/Model/userModel";
import { NextRequest, NextResponse } from "next/server"


DBconnecting();




export async function POST(req: NextRequest) {


    try {

        const data = await req.json()

        console.log(data)

        const finla =new userSchema(data)

          finla.save()
         
           return NextResponse.json({msg:"signup ok"})
       


    } catch (error: any) {

        return NextResponse.json({ err: true })

    }


}













