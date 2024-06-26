
import  mongoose from "mongoose"




export const userSchema = mongoose.models.users || mongoose.model("users" , new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, unique: true, required:true },
    password:{ type: String, required: true },
    createdat:{type:Date , default:Date.now}


}))


// const users=new mongoose.Schema({

//     name: { type: String, required: true },
//     email: { type: String, unique: true, required:true },
//     password:{ type: String, required: true },
//     createdat:{type:Date , default:Date.now}
// })

// export const userSchema = mongoose.model("users",users)