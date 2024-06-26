
"use client"

import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import Marquee from "react-fast-marquee";




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
                console.log("nav error", result.msg)
                setname(" ")

            } else {

                setflag(false)
                setname(" ")
            }


        }).catch(err => {

            message.error("Network error")
        })
    })

    const test = async () => {

        console.log("req sent")

        const result = await axios("/api/users/test")

        console.log("axios result :", result.data)


    }

    const logout = () => {

        axios.post("/api/users/logout").then((respo) => {

            const result = respo.data

            if (result.flag) {

                message.success("your are Logout")
            } else {


                message.error("server error")
            }


        }).catch(err => {

            message.error("Network Error")
        })
    }





    return (

        <div >

            <div className='w-full h-[80px]  flex ' >

                <div className='w-[50%] h-[100%]  pl-5' >

                    <span className='text-blue-600 font-medium text-[25px] ' > United Service  </span>
                    <span onClick={test} className=' text-[25px] text-[#FF204E] ml-5' > SMS </span>



                    <span onClick={() => { router.push("/") }} className='text-[15px] font-bold text-black  ml-10 cursor-pointer' > Home  </span>


                </div>

                <div className='w-[50%] h-[100%] flex justify-end pr-10 gap-5' >


                    <h1 className=' text-[#FF204E]'> {name}   </h1>

                    {

                        flag ?

                            <button onClick={logout} className='w-[80px] h-[35px] hover:bg-blue-400 hover:text-white bg-white border-2 border-black rounded-md text-black' >

                                Logout

                            </button>

                            :

                            <button onClick={() => { router.push("/login") }} className='w-[80px] h-[35px] bg-white hover:bg-blue-400 hover:text-white bg-white border-2 border-black rounded-md text-black' >

                                Login

                            </button>
                    }




                </div>




            </div>

            <Marquee className='text-red-600 text-[14px]' >
                   
                  1) please delete ow paid data or print to excel copy then delete.   2) please delete old iw spare retuned data... thank you...
                </Marquee>


            <div className='w-full h-[1px] bg-black' >

               


            </div>







        </div>
    )
}

export default Navebar
