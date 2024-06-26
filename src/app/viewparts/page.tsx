

"use client"

import React from 'react'
import Navebar from '../Navebar'
import { useState } from 'react'
import ReactPaginate from "react-paginate"
import "./styile.css"

import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'
import { message } from 'antd'
import Swal from 'sweetalert2'

export default function Page() {

    const [data, setdata]: any = useState([])
    const [input, setinput] = useState('')
    const [search, setsearch] = useState(false)
    const [searchdata, setsearchdata] = useState([])
    const [serloding, setserloding] = useState(true)
    const [subdata, setsubdata] = useState([])
    const [th, setth] = useState([

        "Part Name",
        "Part Code ",
        " Customer Name",
        "Customer Number",
        "Warranty Status",
        " Company",
        "Receving Date",
        "Part Sent / Payment",
        "Delete"

    ])

    const [view, setview] = useState(true)
    const [loading, setloading] = useState(true)
    const [company, setcompany] = useState([

        "lloyd",
        "carrier",
        "akiva",
        "amstard",
        "onida",
        "formanty",
        "midea",

    ])



    // pagination code start


    const [pageNumber, setPageNumber] = useState(0);

    const userPrePage = 6;
    const pageVisited = pageNumber * userPrePage;

    const pageCount = Math.ceil(data.length / userPrePage);

    const changePage = ({ selected }: any) => {

        setPageNumber(selected);

    }



    const displyaData = data.slice(pageVisited, pageVisited + userPrePage)

        .map((obj: any, index: any) =>

        (


            <tr key={index} >

                <td className="px-6 py-4 whitespace-nowrap">{obj.partname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-600 ">{obj.partcode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{obj.customername}</td>
                <td className="px-6 py-4 whitespace-nowrap">{obj.customernumber}</td>



                <td className="px-6 py-4 whitespace-nowrap">

                    {obj.warrantystatus}


                </td>


                <td className="px-6 py-4 whitespace-nowrap">{obj.company}</td>


                <td className="px-6 py-4 whitespace-nowrap">
                    {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                    </span> */}
                    {obj.recevingdate}
                </td>

                {
                    obj.owstatus ?


                        <td className="px-6 py-4 whitespace-nowrap">
                            {obj.owcharge}

                            {
                                obj.owpaid ?

                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ml-2 bg-green-100 text-green-800">
                                        Paid
                                    </span>

                                    :

                                    <span onClick={() => { owpaid(obj._id) }} className="px-2 inline-flex text-xs  leading-5 font-semibold rounded-full ml-2 cursor-pointer bg-red-100 text-red-800">
                                        Not Paid
                                    </span>

                            }

                        </td>


                        :


                        obj.partsent ?

                            <td className="px-6 py-4 whitespace-nowrap" > <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">

                                returend

                            </span>

                                <h1 className='text-[13px] text-blue-600' >{obj.partsentdate} </h1>



                            </td>

                            :

                            <td className="px-6 py-4 whitespace-nowrap"  >

                                <input onClick={() => { partsent(obj._id) }} type="checkbox" />

                            </td>



                }

                <td>

                    <span onClick={() => { deletefunc(obj._id, index) }} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800-800 cursor-pointer">
                        Delete
                    </span>






                </td>


            </tr>









        ))

    // view list func

    const finddata = (e: any) => {


        setview(false)

        axios("/api/part/viewparts", {
            params: {

                company: e.target.value
            }
        }).then((respo) => {

            const result = respo.data

            if (result.flag) {

                setdata(result.data)
                setsubdata(result.data)
                setloading(false)

            } else if (result.empty) {

                message.warning("No Data found")
                setview(true)

            } else {

                message.error("server error")
                setview(true)
            }

        }).catch(err => {

            setview(true)
            message.error("Network Error")
        })


    }

    // part sent status change func

    const partsent = (index: number) => {


        Swal.fire({
            title: "is this part ready to returen ? ",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"

        }).then((result) => {


            if (result.isConfirmed) {

                axios.post("/api/part/partsent", { index }).then((respo) => {

                    const result = respo.data

                    if (result.flag) {

                        const finddata = data.filter((obj: any) => obj._id === index)

                        finddata[0].partsent = true
                        finddata[0].partsentdate = result.date

                        console.log(finddata[0])


                        setdata([...data])

                    } else {

                        message.error("server error")


                    }


                }).catch(err => {

                    message.error("Network Error")
                })





            }


        });




    }


    // ow paid status change func
    const owpaid = (index: number) => {


        Swal.fire({
            title: "is this amount paid ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"

        }).then((result) => {

            if (result.isConfirmed) {

                axios.post("/api/part/owpaid", { index }).then((respo) => {

                    const result = respo.data

                    if (result.flag) {

                        const finddata = data.filter((obj: any) => obj._id === index)

                        finddata[0].owpaid = true

                        console.log(finddata[0])

                        setdata([...data])


                    } else {

                        message.error("server error")
                    }

                }).catch(err => {

                    message.error("Network Error")
                })




            }
        });








    }

    // search func 

    const searchfunc = () => {

        if (input.length === 0) {

            message.error("worng command")

        } else {

            setsearch(true)

            axios("/api/part/search", {

                params: {

                    data: input
                }

            }).then((respo) => {

                const result = respo.data

                if (result.err) {

                    message.error("server error")
                    setsearch(false)

                } else if (result.flag) {

                    setsearchdata(result.data)
                    setserloding(false)

                } else {

                    message.warning("No Data found")
                    setsearch(false)
                }


            }).catch(err => {

                message.error("Network Error")
                setsearch(false)
            })


        }








        // setTimeout(() => {

        //     setserloding(false)

        // }, 3000);


    }


    // delete func


    const deletefunc = (id: any, index: any) => {

        const finddata = data.filter((obj: any) => obj._id === id)

        if (finddata[0].warrantystatus === "IW") {

            if (finddata[0].partsent) {

                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {

                        axios.delete("/api/part/partdelete", {

                            params: {

                                id: id
                            }
                        }).then((respo) => {

                            const result = respo.data

                            if (result.flag) {

                                data.splice(index, 1)
                                setdata([...data])

                                searchdata.splice(index, 1)
                                setsearchdata([...searchdata])


                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });


                            } else {

                                message.error("server error")
                            }


                        }).catch(err => {

                            message.error("Network error")
                        })

                    }
                });


            } else {

                message.error("can't delete. this part don't have returend")
            }


        } else {


            if (finddata[0].owpaid) {

                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {

                    if(result.isConfirmed){

                        
                    axios.delete("/api/part/partdelete", {

                        params: {

                            id: id
                        }
                    }).then((respo) => {

                        const result = respo.data

                        if (result.flag) {

                            data.splice(index, 1)
                            setdata([...data])

                            searchdata.splice(index, 1)
                            setsearchdata([...searchdata])


                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });


                        } else {

                            message.error("server error")
                        }


                    }).catch(err => {

                        message.error("Network error")
                    })

                         
                    }




                });


            } else {

                message.error("can't delete. this part amount not paid ")
            }
        }


    }


      // data filter func

    const filter = (e: any) => {

        

        if (e.target.value === "ALL") {

         setdata(subdata)
        
        } else {


            const filterdata = subdata.filter((obj: any) => obj.warrantystatus === e.target.value)

            setdata(filterdata)

        }



    }










    return (
        <div>

            <div className="w-full h-screen bg-[#E7F0DC] pt-10 overflow-scroll sm:overflow-hidden " >

                <Navebar />

                <div className='w-full h-[100px] flex justify-center gap-20 pt-10 ' >


                    <div>

                        <input type="text" onChange={(e) => { setinput(e.target.value) }} className='w-[400px] h-[40px] border-2 border-black rounded-lg bg-white' placeholder='search here' />

                        <button onClick={searchfunc} className='w-[80px] h-[40px] border-2 border-black text-black rounded-lg' > search </button>

                        <select className='ml-5 border-2 border-black ' name="" onChange={filter} id="">

                            <option value=""> Filter </option>
                            <option value="OW"> OW </option>
                            <option value="IW"> IW </option>
                            <option value="ALL"> ALL </option>



                        </select>

                    </div>












                </div>

                {

                    search ?

                        // search time result show section

                        <div className='w-full h-[300px] bg-[#E7F0DC] flex justify-center items-center' >

                            {
                                serloding ?

                                    <div className='w-full h-[300px] flex  justify-center items-center' >

                                        <ThreeDots
                                            visible={true}
                                            height="40"
                                            width="40"
                                            color="#124076"
                                            radius="9"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""

                                        />


                                    </div>

                                    :


                                    <table className=" bg-white">

                                        <thead className="bg-gray-50">
                                            <tr>

                                                {
                                                    th.map((obj, index) => (

                                                        <th key={index} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"> {obj} </th>


                                                    ))
                                                }


                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">



                                            {  // seaech result show 

                                                searchdata.map((obj: any, index: any) => (

                                                    <tr key={index}>

                                                        <td className="px-6 py-4 whitespace-nowrap">{obj.partname}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-blue-600 ">{obj.partcode}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{obj.customername}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{obj.customernumber}</td>



                                                        <td className="px-6 py-4 whitespace-nowrap">

                                                            {obj.warrantystatus}


                                                        </td>


                                                        <td className="px-6 py-4 whitespace-nowrap">{obj.company}</td>


                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span> */}
                                                            {obj.recevingdate}
                                                        </td>

                                                        {
                                                            obj.owstatus ?


                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {obj.owcharge}

                                                                    {
                                                                        obj.owpaid ?

                                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ml-2 bg-green-100 text-green-800">
                                                                                Paid
                                                                            </span>

                                                                            :

                                                                            <span onClick={() => { owpaid(obj._id) }} className="px-2 inline-flex text-xs  leading-5 font-semibold rounded-full ml-2 cursor-pointer bg-red-100 text-red-800">
                                                                                Not Paid
                                                                            </span>

                                                                    }

                                                                </td>


                                                                :


                                                                obj.partsent ?

                                                                    <td className="px-6 py-4 whitespace-nowrap" > <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">

                                                                        returend

                                                                    </span>

                                                                        <h1 className='text-[13px] text-blue-600' > {obj.partsentdate} </h1>



                                                                    </td>

                                                                    :

                                                                    <td className="px-6 py-4 whitespace-nowrap"  >

                                                                        <input onClick={() => { partsent(obj._id) }} type="checkbox" />

                                                                    </td>



                                                        }

                                                        <td>

                                                            <span onClick={() => { deletefunc(obj._id, index) }} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800-800 cursor-pointer">
                                                                Delete
                                                            </span>






                                                        </td>


                                                    </tr>



                                                ))
                                            }





                                        </tbody>




                                    </table>









                            }



                        </div>



                        :



                        view ?

                            <div className='w-full h-screen  flex justify-center pt-[200px]' >

                                <select onChange={finddata} name="company" id="" className='border-2 border-blue-500 w-[150px] bg-gray-600 h-[35px] text-white '  >

                                    <option value=""> Select Company </option>
                                    {
                                        company.map((obj,index) => (

                                            <option key={index} value={obj}> {obj} </option>
                                        ))
                                    }



                                </select>

                            </div>



                            :

                            loading ?

                                <div className='w-full h-screen flex justify-center pt-[200px]' >

                                    <ThreeDots
                                        visible={true}
                                        height="40"
                                        width="40"
                                        color="#124076"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""

                                    />



                                </div>

                                :


                                <div className="">

                                    <span className='text-red-500' > Total Parts :{data.length} </span>

                                    <div className='w-full flex justify-center mb-5' >

                                        <table className=" bg-white">

                                            <thead className="bg-gray-50">
                                                <tr>

                                                    {
                                                        th.map((obj,index) => (

                                                            <th key={index} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"> {obj} </th>


                                                        ))
                                                    }


                                                </tr>
                                            </thead>


                                            <tbody className="divide-y divide-gray-200">



                                                {

                                                    displyaData
                                                }






                                            </tbody>

                                        </table>

                                    </div>




                                    <ReactPaginate

                                        previousLabel={"previous"}

                                        nextLabel={"next"}

                                        pageCount={pageCount}

                                        onPageChange={changePage}

                                        containerClassName={"paginationBttns"}
                                        pageLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />


                                </div>


                }










            </div>





        </div>
    )
}
