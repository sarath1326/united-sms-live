

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

   name: {

        type: String

    },

    email: {

        type: String,
        unique: true
    },

    password: {

        type: String,
        unique: true


    },

    timestamp:{

         
    }


})

const User = mongoose.model("users", userSchema)

export default User;