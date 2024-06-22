
"use client"

import React from 'react'
import Navebar from '../Navebar'
import { useFormik } from 'formik';
import { validationSchema } from "./Schema"
import axios from 'axios';
import { message } from 'antd';
import { ThreeDots } from 'react-loader-spinner'
import { useState } from 'react';


function page() {

    const [loding, setloding] = useState(false)

    type inputvalue_type = {

        partname: string
        partcode: string
        customername: string
        customernumber: string
        warrantystatus: string
        company: string


    }

    const initalValues: inputvalue_type = {

        partname: "",
        partcode: "",
        customername: "",
        customernumber: "",
        warrantystatus: "",
        company: ""

    }


    const { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({

        initialValues: initalValues,
        validationSchema: validationSchema,

        onSubmit: (value, { resetForm }) => {

            setloding(true)

            axios.post("/api/part/addpart", value).then((respo) => {

                const result = respo.data

                if (result.flag) {

                    message.success("Part recevied");
                    resetForm();
                    setloding(false)

                } else {

                    message.error("server error")
                    resetForm();
                    setloding(false)
                }


            }).catch(err => {

                message.error("Network error")
                resetForm();
                setloding(false)
            })
        }


    })




    return (

        <div>

            <div className='w-full h-screen bg-[#16161d] pt-10  ' >

                <Navebar />

                <div className=' flex justify-center ' >

                    <div className=' w-full sm:w-[1000px] h-[900px] sm:h-[500px]  mt-10 rounded-md p-10' >

                        <form onSubmit={handleSubmit} action="" className='flex gap-10 flex-wrap justify-center' >

                            <div>

                                <label htmlFor="" className='text-white' > Part Name    </label><br />
                                <input type="text" placeholder='part name' className='border-2 border-blue-500 w-[300px] h-[40px] text-white bg-gray-600'
                                    name="partname"
                                    value={values.partname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                /><br />

                                {
                                    errors.partname && touched.partname ?

                                        < span className='text-red-600'  > {errors.partname} </span>

                                        : null
                                }

                            </div>



                            <div>

                                <label htmlFor="" className='text-white' > Part code    </label><br />
                                <input type="text" placeholder='part code' className='border-2 border-blue-500 text-white w-[300px] h-[40px] bg-gray-600'
                                    name="partcode"
                                    value={values.partcode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /><br />


                                {
                                    errors.partcode && touched.partcode ?

                                        <span className='text-red-600' > {errors.partcode} </span>

                                        : null
                                }



                            </div>


                            <div>

                                <label htmlFor="" className='text-white' > Customer Name    </label><br />
                                <input type="text" placeholder='customer name' className='border-2 border-blue-500 text-white w-[300px] h-[40px] bg-gray-600'
                                    name="customername"
                                    value={values.customername}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /><br />




                                {
                                    errors.customername && touched.customername ?

                                        <span className='text-red-600' > {errors.customername} </span>

                                        : null
                                }



                            </div>

                            <div>

                                <label htmlFor="" className='text-white' > Customer Number   </label><br />
                                <input type="text" placeholder='customer number' className='border-2 border-blue-500 text-white w-[300px] h-[40px] bg-gray-600'
                                    name="customernumber"
                                    value={values.customernumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /><br />



                                {
                                    errors.customernumber && touched.customernumber ?

                                        <span className='text-red-600'  > {errors.customernumber} </span>

                                        : null
                                }



                            </div>

                            <div>

                                <label htmlFor="" className='text-white' > Warranty Status   </label><br />

                                <select value={values.warrantystatus} onChange={handleChange} onBlur={handleBlur}
                                    name="warrantystatus" id="" className='border-2 border-blue-500 w-[300px] bg-gray-600 h-[40px] text-white'  >

                                    <option value="">enter warranty status </option>

                                    <option value="IW">IW</option>

                                    <option value="OW">OW</option>

                                </select> <br />

                                {
                                    errors.warrantystatus && touched.warrantystatus ?

                                        <span className='text-red-600' > {errors.warrantystatus} </span>

                                        : null
                                }






                            </div>


                            <div>

                                <label htmlFor="" className='text-white' > Company  </label><br />
                                <select value={values.company} onChange={handleChange} onBlur={handleBlur}
                                    name="company" id="" className='border-2 border-blue-500 w-[300px] bg-gray-600 h-[40px] text-white'  >

                                    <option value="">Company </option>

                                    <option value="lloyd"> LLoyd </option>

                                    <option value="carrier"> Carried    </option>

                                </select><br />


                                {
                                    errors.company && touched.company ?

                                        <span className='text-red-600' > {errors.company} </span>

                                        : null
                                }



                            </div>



                            <button type='submit' className='w-[300px] h-[40px] text-white bg-blue-600 rounded-md  '  >

                                {
                                    loding ?

                                        <div className="flex justify-center">

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

                                        "Submit"
                                }




                            </button>











                        </form>





                    </div>



                </div>















            </div>







        </div>
    )
}

export default page
