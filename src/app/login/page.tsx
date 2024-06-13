

"use client"

export default function Loginpage() {

  return (

    <div>

      <div className="w-full h-screen bg-black pt-[100px] " >

        <h1 className="text-orange-500 text-center text-[25px] " > login  </h1>

        <div className="w-full flex justify-center mt-[70px]  " >

          <div className=""   >
            

           
            <label htmlFor="" className="text-white"> Email id </label><br />
            <input className="w-[300px] rounded-sm h-[35px] mb-5" type="text" placeholder="your email id" /><br />

            <label htmlFor="" className="text-white" > password </label><br />
            <input className="w-[300px] rounded-sm h-[35px]" type="text" placeholder="password" /><br />


            <button className="w-[100px] h-[30px] bg-blue-500 rounded-md text-black mt-5 ml-24 " > Login </button>

          </div>





        </div>


      </div>


    </div>


  )
}