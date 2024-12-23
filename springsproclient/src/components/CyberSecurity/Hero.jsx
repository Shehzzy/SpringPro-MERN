

import hero from "../../assets/images/women.png"
const Hero = () => {
  
    return (
<>

<div className=" container   mx-auto ">
<div className="overflow-hidden container md:flex-row  gap-x-4 flex-col px-4 xl:px-[120px] mx-auto w-full flex md:pt-[140px] pt-[120px] md:h-[500px] lg:h-[700px]">

 <div className="h-full flex flex-col  lg:pr-8 xl:pr-16   justify-center  w-full md:w-1/2">
 <h1  className="  leading-[50px] lg:leading-[60px] text-[35px] lg:text-[50px] mt-5 font-poppins font-[425] ">Rapidly protect and optimize at scale.</h1>
 <p className=" text-[#3C3C3C] mt-7 text-base work-sans">Easily deliver the highest security intelligence and a high-quality experience—all while dramatically reducing OpEx.</p>

 <div className="flex mt-6 flex-wrap gap-4 items-center">
    <button
  className="text-black hover:text-black bg-transparent hover:bg-tron-blue transition-all px-6 border-2 border-tron-blue hover:border-black  inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide"
>
  Try VMX Models
</button>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue  inter text-base sm:text-lg py-2.5 rounded-full font-medium tracking-wide">
      START FREE TRIAL
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className=" w-full p-4 sm:p-0  bg-white  " src={hero} alt="" />
 </div>
</div>
</div>
</>

)}
export default Hero;