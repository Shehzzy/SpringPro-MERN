import deploys from "../../assets/images/deploys.svg"
const ProReactive = () => {
  
    return (
<>
<div className="bg-blue-700 py-10">
<div className=" container  mx-auto ">
<div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px]  md:flex-row-reverse flex-col-reverse ">
 <div className="h-full flex flex-col justify-center  w-full md:w-1/2">

 <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] text-white mt-5 work-sans font-medium lea">Proactively deliver exceptional experiences.s</h1>
 <p className="  mt-7 text-white  work-sans">Transform the way you assure great end-user experiences and achieve digital resilience across any network.</p>

 <div>
    <button className=" k text-blue-500  transition-all bg-white px-6  mt-8 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
       LEARN ABOUT DXA
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
export default ProReactive;