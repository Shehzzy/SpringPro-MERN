import deploys from "../../assets/images/deploys.svg"
const Demands = () => {
  
    return (
<>
<div className=" container mt-16 pb-10 mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row-reverse flex-col-reverse ">
 <div className="h-full flex flex-col md:pl-20 justify-center  w-full md:w-1/2">
 <p className="mt-3 text-[#3C3C3C] text-base work-sans">ON-DEMAND WEBINAR</p>
 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] mt-5 work-sans font-medium lea">Envisioning a new customer experience at Visionworks.</h1>
 <p className=" text-[#3C3C3C] mt-7 text-base work-sans">How do you elevate customer and employee experiences? With a cloud-based platform that drives innovation. IT executives at Visionworks share how the Cisco Meraki platform supports 740 retail locations with Wi-Fi, smart cameras, and remote management.</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
WATCH NOW
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className=" w-full p-4 bg-white rounded-xl " src={deploys} alt="" />
 </div>
</div>
</div>

</>

)}
export default Demands;