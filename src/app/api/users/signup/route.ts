


import { DB } from "@/Helpers/db"
import {userSchema} from "@/models/users"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt";
import {DBconnecting} from "@/DBconfig/Dbconn"



export async function POST(req: NextRequest) {  // signup post req

   

    try {

        DBconnecting()
        


        const data = await req.json()
        

        const finduser = await userSchema.findOne({  // check this user already crete a account

             email: data.email 
        })

        console.log("user created",finduser)

        if (!finduser) {

            data.password = await bcrypt.hash(data.password, 10);

            const final= new userSchema(data) // create new user
             await final.save()

            
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













