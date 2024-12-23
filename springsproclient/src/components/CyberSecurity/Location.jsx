import deploys from "../../assets/images/deploys.svg"
const Location = () => {
  
    return (
<>
<div className=" py-10">
<div className=" container  mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row flex-col-reverse ">
 <div className="h-full flex md:pr-16 flex-col justify-center  w-full md:w-1/2">

 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] mt-5 work-sans font-medium lea">Nothing but the best for all your locations</h1>
 <p className=" text-[#3C3C3C] mt-7  work-sans">Choose a best-fit mix of secure Cisco Meraki and Catalyst SD-WAN, and streamline management with a single dashboard..</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
       TRY IT NOW
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className=" w-full p-4  bg-white rounded-xl " src={deploys} alt="" />
 </div>
</div>
</div>
</div>

</>

)}
export default Location;