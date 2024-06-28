

import mongoose from "mongoose";


export const sparesschema = mongoose.models.Spares || mongoose.model('Spares', new mongoose.Schema({

    partname  :     String,
    partcode   :    String,
    customername  :  String,
    customernumber : String,
    warrantystatus : String,
    company       : String,
    partsent      : {type:Boolean , default:false },  
    
    techname     : String,
   
    partsentdate  :{ type:String , default:"null"},
   
    
    recevingdate  : String,
    
    
    owcharge     :{type:String , default:"null" },
    
    
    owstatus     : {type:Boolean , default:false}, 
   
   
    owpaid      : {type:Boolean , default:false} 

   
}));








// const spares=new mongoose.Schema({


//     partname  :     String,
//     partcode   :    String,
//     customername  :  String,
//     customernumber : String,
//     warrantystatus : String,
//     company       : String,
//     partsent      : {type:Boolean , default:false },       
   
//     partsentdate  :{ type:String , default:"null"},
   
    
//     recevingdate  : String,
    
    
//     owcharge     :{type:String , default:"null" },
    
    
//     owstatus     : {type:Boolean , default:false}, 
   
   
//     owpaid      : {type:Boolean , default:false} 


// })


