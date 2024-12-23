import React from "react";
import "../App.css"
import bill from "../assets/images/bill-services.svg"

const BillService = () => {
  
  return (
<>
<div className="bg-img  container mx-auto md:py-12 py-12">
<div className="w-full  items-center px-4 xl:px-[120px]  flex gap-y-8 md:flex-row flex-col ">
 <div className="h-full  flex flex-col justify-center  w-full md:w-1/2">
 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px]  work-sans font-medium lea">Rate Plan Analysis and Optimization</h1>
 <p className="mt-3">Expand your business globally with the world’s largest cloud networking platform.</p>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5>Deploy networks quickly via simple configuration while staying aligned to your corporate standards</h5>
 </div>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5>Meet the changing demands of your business without compromising reliability or security</h5>
 </div>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5>Cut routine network task time from hours to minutes by using our open source APIs</h5>
 </div>
 <div>
    <button className="text-black lg:text-sm hover:bg-transparent transition-all border-2 border-tron-blue hover:border-black bg-tron-blue px-6  mt-5 inter sm:text-lg py-3 rounded-full font-medium tracking-wide">
        EXPLORE THE PLATFORM
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className="p-4  rounded-xl max-w-[600px] w-full" src={bill} alt="" />
 </div>
</div>
</div>

</>)
}
export default BillService