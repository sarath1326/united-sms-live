

"use client"

import React from 'react'
import { useState } from 'react'


function Page() {

    const [th, setth] = useState([

        "Part Name",
        "Part Code ",
        " Customer Name",
        "Customer Number",
        "Tech Name",
        "Warranty Status",
        " Company",
        "Receving Date",
        "Part Sent / Payment",
        "Delete"

    ])


    const [data,setdata]=useState([1,2,3,4,5,6,7,8,9,10])
  
  
    return (
    <div>

        <h1 className='text-center' > Table Demo </h1>

        <div className=' w-full overflow-x-auto ' >

            <table className='w-full'>

                <thead>
                    <tr className='border-2 border-gray-500' >

                        {
                             th.map((obj)=>(

                                  <th className='px-6 py-3 ' > {obj} </th>
                             ))
                        }


                    </tr>


                </thead>

                <tbody>

                    <tr>

                        {
                             data.map((obj)=>(

                              
                                    <td className='px-6 py-1'>
                                        {obj}
                                    </td>
                               

                                  
                             ))
                        }

                        </tr>
                        

                    


                </tbody>


            </table>


        </div>



      
    </div>
  )
}

export default Page
