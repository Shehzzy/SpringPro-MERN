import React from "react";
import hero from "../../assets/images/hero-img.png"; // Make sure the path is correct

const Hero = () => {
  return (
    <>
<div className=" container   mx-auto ">
<div className="overflow-hidden container md:flex-row  gap-x-4 flex-col px-4 xl:px-[120px] mx-auto w-full flex md:pt-[140px] pt-[120px] md:h-[600px] lg:h-[700px]">

 <div className="h-full flex flex-col  lg:pr-8 xl:pr-16   justify-center  w-full md:w-1/2">
 <h1  className="  leading-[50px] text-[#3C3C3C] lg:leading-[60px] text-[35px] lg:text-[50px] mt-5 font-poppins font-[425] ">Efficiently scale cloud experiences everywhere.</h1>
 <p className=" text-[#3C3C3C] mt-7 text-base work-sans">Rapidly deploy secure on-premises and cloud technology services across your entire network.</p>

 <div className="flex flex-wrap gap-4 items-center">
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
       Learn How
    </button>
    <button
  className="text-black hover:text-black bg-transparent hover:bg-tron-blue transition-all px-6 border-2 border-tron-blue hover:border-black mt-5 md:mt-0 lg:mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide"
>
  Try VMX Models
</button>
 </div>
 </div>
 <div className="md:w-1/2 mt-4 md:mt-0 flex items-center   justify-center ">
    <img className=" w-full sm:p-0  bg-white  " src={hero} alt="" />
 </div>
</div>
</div>
    </>
  );
};

export default Hero;
