
"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';







function Navebar() {

    const router = useRouter()
    const [name, setname] = useState(" ")
    const [flag, setflag] = useState(true)

    useEffect(() => {

        axios("/api/users/userdata").then((respo: any) => {

            const result = respo.data

            if (result.flag) {

                setname(result.data.name)

            } else if (result.err) {
                
                message.error(result.msg)
                console.log("nav error")
                setname(" ")

            } else {

                setflag(false)
                setname(" ")
            }


        }).catch(err => {

            message.error("Network error")
        })
    })





    return (

        <div >

            <div className='w-full h-[80px]  flex ' >

                <div className='w-[50%] h-[100%]  pl-5' >

                  
                    <span className=' text-[25px] text-[#FF204E] ml-5' > SMS </span>

                    <span onClick={()=>{router.push("/")}} className='text-[15px] font-bold text-black  ml-10 cursor-pointer' > Home  </span>


                </div>

                <div className='w-[50%] h-[100%] flex justify-end pr-10 gap-5' >


                    <h1 className=' text-[#FF204E]'> {name}   </h1>

                    {

                        flag ?

                            <button onClick={() => { router.push("/login") }} className='w-[80px] h-[35px] hover:bg-blue-400 hover:text-white bg-white border-2 border-black rounded-md text-black' >

                                Logout

                            </button>

                            :

                            <button onClick={() => { router.push("/login") }} className='w-[80px] h-[35px] bg-white hover:bg-blue-400 hover:text-white bg-white border-2 border-black rounded-md text-black' >

                               Login

                            </button>
                    }




                </div>




            </div>

           <div className='w-full h-[1px] bg-black' >

           </div>







        </div>
    )
}

export default Navebar
