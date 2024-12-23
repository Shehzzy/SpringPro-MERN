import deploys from "../../assets/images/deploys.svg"
const Deploys = () => {
  
    return (
<>
<div className=" container pt-10  pb-10 mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row-reverse flex-col-reverse ">
 <div className="h-full flex flex-col md:pl-20 justify-center  w-full md:w-1/2">
 <p className="mt-3 text-[#3C3C3C] text-lg work-sans">Make your store safer</p>
 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] mt-5 work-sans font-medium lea">Retail’s future is in the cloud</h1>
 <p className=" text-[#3C3C3C] mt-7 text- work-sans">Retail cloud-deployment will grow by 31.5% annually through 2030. Our new guide explains how this will transform customer and employee experiences worldwide.</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
DOWNLOAD GUIDE
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
export default Deploys;