import React from "react";
import "../App.css"
import dashboard from "../assets/images/dashboard.svg"

const Guide = () => {
  
  return (
<>
<div className=" container mx-auto ">
<div className="w-full flex gap-y-8 px-4 xl:px-[120px]  md:flex-row-reverse flex-col-reverse ">
 <div className="h-full flex flex-col justify-center md:pl-16  w-full md:w-1/2">
 <h1 style={{lineHeight:"40px"}} className=" text-[30px] lg:text-[40px]  work-sans font-medium lea">Meet the Spring Air Network Solution dashboard.</h1>
 <p className="mt-7">Manage your entire distributed network infrastructure in a single intuitive interface—the Meraki dashboard.</p>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5>Monitor WAN, access, and IoT technologies in one place with end-to-end visibility</h5>
 </div>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5>View the overall health of each network and proactively solve issues before they become critical</h5>
 </div>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5>Leverage our advanced AI to take the guesswork out of optimizing networks</h5>
 </div>
 <div>
    <button className="text-black border-2 hover:bg-transparent hover:border-black border-tron-blue  bg-tron-blue px-6  mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
        LEARN MORE
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className="p-4 w-full bg-white rounded-xl " src={dashboard} alt="" />
 </div>
</div>
</div>

</>)
}
export default Guide