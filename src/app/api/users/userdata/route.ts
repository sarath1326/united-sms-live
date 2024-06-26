
import { DB } from "@/Helpers/db"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'


async function getCookieData() {
    const cookieData = cookies().getAll()
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(cookieData)
      }, 0)
    )
  }



export async function GET(req: NextRequest) {


    try {


        const cookieData:any = await getCookieData()

        console.log("cookis",cookieData)

        if(cookieData.length===0){

              console.log("no token")

              return  NextResponse.json({ flag:false })

        }else{

            const token: any = cookieData[0].value 

            const usedata = await jwt.verify(token, "sarath1937")

            return NextResponse.json({ flag: true, data: usedata })
        
        
        }


    } catch (error:any) {

        console.log(error.message)
        return NextResponse.json({ err: true , msg:error.message })

    }


}  