

import mongoose from "mongoose";

export const  DBconnecting= async()=>{
    
    try {

          mongoose.connect(process.env.MONGO_URL!)
          const connection=mongoose.connection
          connection.on("connected",()=>{

                console.log("mongo DB connected")
          })

          connection.on("error",()=>{

                console.log("mongo DB connecting error")
          })

          
        
    } catch (error){

        console.log("DB connecting somthing worng")
        
    }
      
      
}