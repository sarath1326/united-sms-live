
"use client"

import React from 'react'
import Navebar from '../Navebar'
import { useFormik } from 'formik';
import { validationSchema } from "./Schema"
import axios from 'axios';
import { message } from 'antd';
import { ThreeDots } from 'react-loader-spinner'
import { useState } from 'react';


function Page() {

    const [loding, setloding] = useState(false)
    const [ow, setow] = useState(false)
    const [company, setcompany] = useState([

        "lloyd",
        "carrier",
        "akiva",
        "amstard",
        "onida",
        "formanty",
        "midea",
        "bb",
        "spanio"

    ])

    type inputvalue_type = {

        partname: string
        partcode: string
        customername: string
        customernumber: string
        warrantystatus: string
        company: string
        owcharge: string
        techname: string


    }

    const initalValues: inputvalue_type = {

        partname: "",
        partcode: "",
        customername: "",
        customernumber: "",
        warrantystatus: "",
        company: "",
        owcharge: "",
        techname: ""

    }


    const { errors, values, handleChange, handleSubmit, handleBlur, touched } = useFormik({

        initialValues: initalValues,
        validationSchema: validationSchema,

        onSubmit: (value, { resetForm }) => {

            if (value.owcharge.length === 0) {

                const sentdata = {

                    value,
                    flag: false
                }


                setloding(true)

                console.log(value)

                axios.post("/api/part/addpart", sentdata).then((respo) => {

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


            } else {

                const sentdata = {

                    value,
                    flag: true
                }


                setloding(true)

                axios.post("/api/part/addpart", sentdata).then((respo) => {

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


        }


    })

    const handleCombinedChange = (event: any) => {

        handleChange(event)

        if (event.target.value === "OW") {

            setow(true)
        } else {

            setow(false)
        }

    };







    return (

        <div>

            <div className='w-full min-h-screen bg-[#E7F0DC] pt-10  ' >

                <Navebar />






                <div className=' flex justify-center ' >

                    <div className=' w-full sm:w-[1000px] min-h-[900px] sm:h-[500px]  mt-10 rounded-md p-10' >

                        <form onSubmit={handleSubmit} action="" className='flex gap-10 flex-wrap justify-center' >

                            <div>

                                <label htmlFor="" className='text-black' > Part Name    </label><br />
                                <input type="text" placeholder='part name' className='border-2 border-black w-[300px] h-[40px]  bg-gray-200'
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

                                <label htmlFor="" className='text-black' > Part code    </label><br />
                                <input type="text" placeholder='part code' className='border-2 border-black  w-[300px] h-[40px] bg-gray-200'
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

                                <label htmlFor="" className='text-black' > Customer Name    </label><br />
                                <input type="text" placeholder='customer name' className='border-2 border-black  w-[300px] h-[40px] bg-gray-200'
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

                                <label htmlFor="" className='text-black' > Customer Number   </label><br />
                                <input type="text" placeholder='customer number' className='border-2 border-black  w-[300px] h-[40px] bg-gray-200'
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

                                <label htmlFor="" className='text-black' > Warranty Status   </label><br />

                                <select value={values.warrantystatus} onChange={handleCombinedChange} onBlur={handleBlur}

                                    name="warrantystatus" id="" className='border-2 border-black w-[300px] bg-gray-200 h-[40px] '  >

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

                                <label htmlFor="" className='text-black' > Company  </label><br />
                                <select value={values.company} onChange={handleChange} onBlur={handleBlur}
                                    name="company" id="" className='border-2 border-black w-[300px] bg-gray-200 h-[40px] '  >

                                    <option value="">Select Company </option>
                                    {
                                        company.map((obj, index) => (

                                            <option key={index} value={obj}> {obj} </option>
                                        ))
                                    }



                                </select><br />


                                {
                                    errors.company && touched.company ?

                                        <span className='text-red-600' > {errors.company} </span>

                                        : null
                                }



                            </div>


                            {

                                ow ?
                                    <>

                                        <div>

                                            <label htmlFor="" className='text-black' > Amount  </label><br />

                                            <input type="text" placeholder='Part Amount' className='border-2 border-black  w-[300px] h-[40px] bg-gray-200'
                                                name="owcharge"
                                                value={values.owcharge}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            /><br />






                                        </div>

                                        <div className='w-[300px] h-[40px]' >


                                        </div>


                                    </>


                                    :
                                    null


                            }


                            <div>

                                <label htmlFor="" className='text-black' > Tech Name  </label><br />

                                <input type="text" placeholder='tech name' className='border-2 border-black  w-[300px] h-[40px] bg-gray-200'
                                    name="techname"
                                    value={values.techname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                /><br />


                                {
                                    errors.techname && touched.techname ?

                                        <span className='text-red-600' > {errors.techname} </span>

                                        : null
                                }









                            </div>

                            <div className='w-[300px] h-[40px]' >


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

export default Page
