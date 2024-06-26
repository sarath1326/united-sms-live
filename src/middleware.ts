


import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'


async function getCookieData() {
  const cookieData = cookies().getAll()
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData)
    },0)
  )
}




export async function middleware(request: NextRequest) {

      const path= request.nextUrl.pathname

      const cookieData:any = await getCookieData()
      
      let token:any

      if(cookieData.length===0){

          token=false
      }else{

         token=true
      }

      if(path==="/viewpart"){

        if(token){

            console.log("is token")
            return NextResponse.redirect(new URL('/viewparts', request.nextUrl))
      
          }else{
  
            console.log("no token")
  
            return NextResponse.redirect(new URL('/login', request.nextUrl))
      }

        
         
    }else{

        if(token){

            console.log("is token")
            return NextResponse.redirect(new URL('/addpart', request.nextUrl))
      
          }else{
  
            console.log("no token")
  
            return NextResponse.redirect(new URL('/login', request.nextUrl))
      }
  


    }

  

   


}





export const config = {
    matcher: [

        '/addparts',
        "/viewpart"


    ],
}

