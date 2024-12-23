import deploys from "../../assets/images/deploys.svg"
const Deploys = () => {
  
    return (
<>
<div className=" container pt-10  pb-10 mx-auto px-4 xl:px-[120px]">
    <div>
    <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] mt-10 text-center work-sans font-medium lea">Customer engagement reimagined.</h1>
    <p className="font-poppins font-[350] mt-5 text-center text-sm">Deliver secure customer experiences and exceed employee expectations via the Meraki cloud-based platform. <br className="sm:block hidden" /> Drive resiliency and sustainability with cloud-powered data that adapts to your financial services business.</p>
 
    </div>
<div className="w-full mt-20 items-center flex gap-y-8   md:flex-row flex-col-reverse ">
 <div className="h-full flex flex-col md:pr-20 justify-center  w-full md:w-1/2">
 <p className="mt-3 text-[#3C3C3C] text-lg work-sans">EXPERIENCE GUIDE</p>
 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] mt-5 work-sans font-medium lea">Transform rooms, branches, and environments with smart spaces.</h1>
 <p className=" text-[#3C3C3C] mt-7 text- work-sans">Say goodbye to complexity with cloud-first technologies that unite IT, IoT, and physical environments.
    <br />
    <br />

Bank on smart spaces to help inform new insights, inspire collaboration, and drive efficiencies through automation and analytics across your financial institution.

</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
GET THE GUIDE GUIDE
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