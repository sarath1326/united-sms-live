

import mongoose from "mongoose";

export const  DBconnecting= async()=>{
    
    try {

          mongoose.connect("mongodb+srv://sarathpm:sarath1937@cluster0.katyfou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
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