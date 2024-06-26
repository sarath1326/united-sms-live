
import {NextRequest,NextResponse} from "next/server"
import {DB} from "@/Helpers/db"
import {sparesschema} from "@/models/spares"
import {DBconnecting} from "@/DBconfig/Dbconn"


export async function POST(req:NextRequest){


    const { index } = await req.json()


    console.log(index)


   try {

     DBconnecting()


    await sparesschema.updateOne({_id:index},{

        $set:{owpaid:true}
    
     })

   

//     await DB.spares.update({

//          where:{id:index},
//          data:{owpaid:true}
//     })

     return NextResponse.json({flag:true})
    
   } catch (error:any) {

    console.log(error.message)

    return NextResponse.json({flag:false})
    
   }

    

      
}