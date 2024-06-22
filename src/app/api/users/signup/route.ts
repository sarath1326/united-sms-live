


import { DB } from "@/Helpers/db"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";



export async function POST(req: NextRequest) {  // signup post req

    try {

        const data = await req.json()

        const finduser = await DB.users.findUnique({  // check this user already crete a account

            where: { email: data.email }
        })

        if (!finduser) {

            data.password = await bcrypt.hash(data.password, 10);

            

            await DB.users.create({  // create new user
                
                data:data
           
             })           
               console.log("user careted")
             return NextResponse.json({flag:true})

        } else {

             console.log("user exit")
            return NextResponse.json({ userexit: true })
        }

    } catch (error) {

      console.log("catech err", error)
        return NextResponse.json({ flag: false })

    }




}













