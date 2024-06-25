
"use client"

import Navebar from "./Navebar";
import { useRouter } from "next/navigation";




export default function Home() {


  const router = useRouter()


  return (

    <div>

      <div className="w-full h-screen bg-[#E7F0DC] pt-10" >

        <Navebar />



        <h1 className="text-black text-center text-[25px] mt-10 " > Manage Your Spare Parts </h1>


        <div className="w-full h-[300px] mt-12 flex justify-center gap-5 items-center  ">


          <button onClick={() => { router.push("/viewpart") }} className="w-[120px] h-[35px] bg-white border-2 border-blue-600 rounded-md" > View List  </button>

          <button onClick={() => { router.push("/addparts") }} className="w-[120px] h-[35px] bg-white border-2 border-blue-600 rounded-md" > Part Receive  </button>





        </div>

      </div>








    </div>
  );
}
