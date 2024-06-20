

"use client"

import Navebar from "../Navebar"
import { useFormik } from 'formik';
import { validationSchema } from "./Schema"
import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner'
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/navigation";









export default function Loginpage() {

  const [loding, setloding] = useState(false)
  const [show,setshow]=useState(true)
  const router = useRouter()

  type inputType = {

    email: string
    password: string

  }

  const initalValues: inputType = {

    email: "",
    password: ""
  }


  const { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({

    initialValues: initalValues,
    validationSchema: validationSchema,

    onSubmit: (value) => {

      setloding(true)

      axios.post("/api/users/login", value).then((respo: any) => {

        const result = respo.data;

        if (result.flag) {

          router.push("/")
          
         setloding(false)

        } else if (result.notmatch) {

          message.error("this email and password not match")
          setloding(false)

        } else if (result.emailerr) {

          message.error("this is invalide email")
          setloding(false)

        } else {

          message.error("server error")
          setloding(false)
        }
      }).catch(err => {

        message.error("Network error")
        setloding(false)
      })

    }

  })








  return (

    <div>

      <div className="w-full h-screen bg-[#16161d] pt-10  " >

        <Navebar />

        <h1 className="text-white text-center text-[25px] " > Login  </h1>

        <div className="w-full flex justify-center mt-[70px]  " >

          <div className=""   >

            <form action="" onSubmit={handleSubmit} >

              <label htmlFor="" className="text-white"> Email id </label><br />
              <input className="w-[300px] rounded-sm h-[35px] " type="text" placeholder="your email id"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}

              /><br />

              {

                errors.email && touched.email
                  ?

                  <>  <span className="text-red-500" > {errors.email} </span> <br />
                  </>
                  : <br />



              }




              <label htmlFor="" className="text-white" > password </label><br />
            
            <input className="w-[300px] rounded-sm h-[35px]" type={show ? "password" : "text"} placeholder="password"
               
             
               name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}





              /> 
                
                <span className="text-white" onClick={()=>{setshow(!show)}} > show  </span>
              <br />

              {

                errors.password && touched.password
                  ?

                  <>  <span className="text-red-500" > {errors.password} </span> <br />
                  </>
                  : <br />



              }


              <button type="submit" className="w-[100px] h-[30px] bg-blue-500 rounded-md text-black mt-5 ml-28 " >


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
                    "Login"
                }




              </button>

              <h1 onClick={() => { router.push("/signup") }} className="text-blue-800 text-center cursor-pointer mt-3" > create new account </h1>




            </form>


          </div>





        </div>


      </div>


    </div>


  )
}