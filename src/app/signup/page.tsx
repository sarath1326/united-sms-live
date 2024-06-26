

"use client"

import React from "react";
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navebar from "../Navebar";
import { ThreeDots } from 'react-loader-spinner'
import { useFormik } from 'formik';
import { validationSchema } from "./Schema"
import axios from "axios"
import {message} from "antd"


function Page() {

 
  const [loding, setloding] = useState(false)

  const router = useRouter()


  type inputvalue_type = {

    name: string
    email: string
    password: string
  }

  const initalValues: inputvalue_type = {

    name: "",
    email: "",
    password: ""

  }



  const { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({

    initialValues: initalValues,
    validationSchema: validationSchema,

    onSubmit: async (value) => {

          setloding(true)
          
         axios.post("/api/users/signup",values).then((repo:any)=>{

                    const result=repo.data;

                    if(result.flag){

                        router.push("/login")
                        setloding(false)
                   
                        }else if(result.userexit){

                          message.error("this email id already used")
                          setloding(false)
                    }else{

                          message.error("server error")
                          setloding(false)
                    }
          }).catch(err=>{

               message.error("Network error")
               setloding(false)
          })

    }


  })





  return (
    <div>

      <div className="w-full h-screen bg-[#E7F0DC] pt-10  " >

        <Navebar />

        <h1 className=" text-black text-center text-[25px] mt-5  " > Signup  </h1>


        <div className="w-full flex justify-center mt-[70px]  " >

          <div className=""   >

            <form action="" onSubmit={handleSubmit} >

              <label htmlFor="" className="text-black" > Full Name </label><br />
              
              <input className="w-[300px] rounded-sm h-[35px] text-black border-2 border-black " type="text" placeholder="your name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}

              /><br/>

              {

                errors.name && touched.name
                  ?

                  <>  <span className="text-red-500" > {errors.name} </span> <br/>
                  </>
                  : <br/>




              }

              <label htmlFor="" className="text-black"> Email id </label><br />
              <input className="w-[300px] rounded-sm h-[35px] border-2 border-black  " type="text" placeholder="your email id"
               name="email"
               value={values.email}
               onChange={handleChange}
               onBlur={handleBlur}

              /><br/>

              {

                errors.email && touched.email
                  ?

                  <>  <span className="text-red-500" > {errors.email} </span> <br />
                  </>
                  : <br/>



              }



              <label htmlFor="" className="text-black" > password </label><br />
              <input className="w-[300px] rounded-sm h-[35px] border-2 border-black " type="text" placeholder="password"
               name="password"
               value={values.password}
               onChange={handleChange}
               onBlur={handleBlur}


              /><br />

              {

                errors.password && touched.password
                  ?

                  <>  <span className="text-red-500" > {errors.password} </span> <br />
                  </>
                  : <br/>



              }


              <button type="submit" className="w-[100px] h-[30px]  bg-blue-500 rounded-md text-black mt-5 ml-24 " >

                {
                  loding ?

                    <div className="ml-9">

                      <ThreeDots
                        visible={true}
                        height="30"
                        width="30"
                        color="#16161d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""

                      />


                    </div>


                    :
                    "Signup"
                }

              </button>

              <h1 onClick={()=>{router.push("/login")}} className="text-blue-800 text-center cursor-pointer mt-3" > i have already account </h1>

              






            </form>







          </div>





        </div>


      </div>





    </div>
  )
}

export default Page
