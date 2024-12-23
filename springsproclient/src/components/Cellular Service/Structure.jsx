import React from "react";
import "../../App.css"


const Structure = ({heading,details,point1,point2,point3,button,img,classe,padding}) => {
  
  return (
<>
<div className="container mx-auto md:py-12 py-12">
<div className={`w-full  items-center  px-4 xl:px-[120px]  flex gap-y-8 ${classe}`}>
 <div className={`h-full  flex flex-col justify-center  ${padding}  w-full md:w-1/2`}>
 <h1 style={{lineHeight:"50px"}} className=" text-[40px] text-[#3C3C3C] lg:text-[50px]  work-sans font-medium lea">{heading}</h1>
 <p className="mt-3 text-[#3C3C3C]">{details}</p>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5 className="text-[#3C3C3C]">{point1}</h5>
 </div>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5  className="text-[#3C3C3C]">{point2}</h5>
 </div>
 <div className="flex gap-3 mt-5 items-baseline">
  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
  <h5  className="text-[#3C3C3C]">
  {point3}</h5>
 </div>
 <div>
    <button className="text-black hover:bg-transparent transition-all border-2 border-tron-blue hover:border-black bg-tron-blue px-6  mt-5 inter text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
{button}
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className="p-4  rounded-xl max-w-[600px] w-full" src={img} alt="" />
 </div>
</div>
</div>

</>)
}
export default Structure