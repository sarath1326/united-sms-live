


import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'




export function middleware(request: NextRequest) {

      const path= request.nextUrl.pathname
    const token = request.cookies.get("DSMtoken")?.value || null

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

