import deploys from "../../assets/images/deploys.svg"
const Physical = () => {
  
    return (
<>
<div className="py-10">
<div className="bg-blue-700 py-10">
<div className=" container  mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row-reverse flex-col-reverse ">
 <div className="h-full flex flex-col justify-center  w-full md:w-1/2">
<p className="text-white font-poppins">Springs Air Network</p>
 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] text-white mt-5 work-sans font-medium lea">Physical security: best in the cloud.</h1>
 <p className="  mt-7 text-white font-[300] work-sans">Keep people safe, protect assets, and boost manufacturing operations. Smart cameras and environmental sensors from Meraki capture the insight and intelligence your factory needs.</p>

 <div>
    <button className=" k text-blue-500  transition-all bg-white px-6  mt-8 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
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
</div>

</>

)}
export default Physical;