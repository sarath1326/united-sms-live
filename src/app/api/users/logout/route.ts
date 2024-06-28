
import {NextRequest,NextResponse} from "next/server"


export async function POST (){

    try {

        const responce=NextResponse.json({flag:true})

        responce.cookies.delete("DSMtoken")

        return responce
        
    } catch (error) {

        return NextResponse.json({flag:false})
        
    }

       
}