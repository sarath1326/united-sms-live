
"use client"

import Navebar from "./Navebar";
import { useRouter } from "next/navigation";


export default function Home() {
  

  const router=useRouter()


  return (
    
    <div>

      <div className="w-full h-screen bg-[#16161d] pt-10" >

       <Navebar />

       <h1 className="text-white text-center text-[25px] mt-10" > Manage Your Defetive Spaer parts </h1>


       <div className="w-full h-[300px] mt-12 flex justify-center gap-5 items-center  "> 


        <button   className="w-[100px] h-[30px] bg-blue-400 rounded-md" > View List  </button>

        <button onClick={()=>{router.push("/addparts")}} className="w-[100px] h-[30px] bg-blue-400 rounded-md" > Add Part  </button>


        


       </div>
     
      
      </div>





      


    </div>
  );
}
