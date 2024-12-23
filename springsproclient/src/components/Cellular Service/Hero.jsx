

import hero from "../../assets/images/women.png"
const Hero = () => {
  
    return (
<>

<div className=" container   mx-auto ">
<div className="overflow-hidden container md:flex-row  gap-x-4 flex-col px-4 xl:px-[120px] mx-auto w-full flex md:pt-[140px] pt-[120px] md:h-[500px] lg:h-[700px]">

 <div className="h-full flex flex-col  lg:pr-8 xl:pr-16   justify-center  w-full md:w-1/2">
 <h1  className="  leading-[50px] lg:leading-[60px] text-[35px] lg:text-[50px] mt-5 font-poppins font-[425] ">A cellular-services network for different business platform.</h1>
 <p className=" text-[#3C3C3C] mt-7 text-base work-sans">Expand your business globally with the world’s largest cloud networking platform..</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
       Learn How
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className=" w-full sm:p-0  bg-white  " src={hero} alt="" />
 </div>
</div>
</div>
</>

)}
export default Hero;