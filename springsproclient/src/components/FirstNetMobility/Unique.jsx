import deploys from "../../assets/images/brands.avif"
const Deploys = () => {
  
    return (
<>
<div className="bg-blue-500 py-10">
<div className=" container mt-16 pb-10 mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row flex-col-reverse ">
 <div className="h-full flex flex-col md:pr-16 justify-center  w-full md:w-1/2">

 <h1 style={{lineHeight:"50px"}} className=" text-[40px] text-white lg:text-[50px] mt-5 work-sans font-medium lea">Every business is unique. Get solutions tailored to you.</h1>
 <p className=" text-white  mt-7  text-lg work-sans">Customize your IT experience with apps, APIs, and built-in integrations from our expansive partner ecosystem.</p>

 <div>
    <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
EXPLORE THE MARKETPLACE
    </button>
 </div>
 </div>
 <div className="md:w-1/2  flex items-center   justify-center ">
    <img className=" w-full p-4 bg-white rounded-xl " src={deploys} alt="" />
 </div>
</div>
</div>
</div>

</>

)}
export default Deploys;