

"use client"

import React from "react";
import { useState } from "react"
import { useRouter } from "next/navigation"

import axios from "axios"
import { toast } from "react-hot-toast"

function page() {

  const [input, setinput] = useState({

    name: "",
    email: "",
    password: ""
    

  })

  const router=useRouter()


  const onSubmit = async () => {

    try {

      axios.post('/api/users/signup', input).then((respo: any) => {

        console.log(respo.data.msg)
        router.push("/login")

      })

    } catch (error) {

      console.log("server err")

    }
  }






  return (
    <div>

      <div className="w-full h-screen bg-black pt-[100px] " >

        <h1 className="text-orange-500 text-center text-[25px] " > Signup  </h1>

        <div className="w-full flex justify-center mt-[70px]  " >

          <div className=""   >

            <label htmlFor="" className="text-white" > Full Name </label><br />
            <input className="w-[300px] rounded-sm h-[35px] text-black mb-5" type="text" placeholder="your name"
              onChange={(e) => setinput({ ...input, name: e.target.value })}



            /><br />

            <label htmlFor="" className="text-white"> Email id </label><br />
            <input className="w-[300px] rounded-sm h-[35px] mb-5" type="text" placeholder="your email id"
              onChange={(e) => setinput({ ...input, email: e.target.value })}

            /><br />

            <label htmlFor="" className="text-white" > password </label><br />
            <input className="w-[300px] rounded-sm h-[35px]" type="text" placeholder="password"
              onChange={(e) => setinput({ ...input, password: e.target.value })}


            /><br />


            <button onClick={onSubmit} className="w-[100px] h-[30px] bg-blue-500 rounded-md text-black mt-5 ml-24 " > Signup </button>

          </div>





        </div>


      </div>





    </div>
  )
}

export default page
