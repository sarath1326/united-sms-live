
import { NextRequest, NextResponse } from "next/server"
import { DB } from "@/Helpers/db"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"




export async function POST(req: NextRequest) {

    try {

        const data = await req.json()

        const finduser = await DB.users.findUnique({

            where: { email: data.email }

        })

        if (finduser) {

            const final = await bcrypt.compare(data.password, finduser.password);

            if (final) {

                const token = jwt.sign({ name: finduser.name, id: finduser.id }, "sarath1937");

                const responce = NextResponse.json({ flag: true })

                responce.cookies.set("DSMtoken", token, {

                    maxAge: 3600,
                    httpOnly: true

                })

                return responce;


            } else {

                return NextResponse.json({ notmatch: true })
            }


        } else {


            return NextResponse.json({ emailerr: true })

        }

    } catch (error) {

        return NextResponse.json({ flag: false })

    }



}