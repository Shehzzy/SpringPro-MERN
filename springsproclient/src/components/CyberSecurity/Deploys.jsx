import deploys from "../../assets/images/deploys.svg"
const Deploys = () => {
  
    return (
<>
<div className="bg-blue-100 py-10">
<div className=" container  mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row-reverse flex-col-reverse ">
 <div className="h-full flex flex-col justify-center  w-full md:w-1/2">

 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] mt-5 work-sans font-medium lea">Save on cybersecurity upgrades</h1>
 <p className=" text-[#3C3C3C] mt-7  work-sans">With this promotion, it’s never been simpler to upgrade your cybersecurity and enlist powerful SD-WAN technology.</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
       LEARN MORE
    </button>
 </div>
 </div>
 <div className="md:w-1/2 md:pr-20 flex items-center   justify-center ">
    <img className=" w-full p-4 h-[400px] bg-white rounded-xl " src={deploys} alt="" />
 </div>
</div>
</div>
</div>

</>

)}
export default Deploys;