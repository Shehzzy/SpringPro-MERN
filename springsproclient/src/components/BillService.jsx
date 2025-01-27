import React from "react";
import "../App.css";
import bill from "../assets/images/bill-services.svg";

const BillService = () => {
   return (
      <>
         <div className="bg-img container mx-auto py-12 px-4 sm:px-8 md:px-12 xl:px-[120px]">
            <div className="flex flex-col-reverse md:flex-row items-center gap-y-8 md:gap-x-8">
               {/* Text Section */}
               <div className="flex flex-col justify-center w-full md:w-1/2">
                  <h1
                     style={{ lineHeight: "40px" }}
                     className="work-sans font-medium text-[#3C3C3C] leading-tight text-3xl md:text-4xl lg:text-5xl"
                  >
                     Rate Plan Analysis & Optimization
                  </h1>
                  <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-lg">
                     Expand your business globally with the world’s largest cloud networking platform.
                  </p>
                  <div className="flex gap-3 mt-2 items-baseline">
                     <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                     <h5 className="text-sm sm:text-base">
                        Deploy networks quickly via simple configuration while staying aligned to your corporate standards
                     </h5>
                  </div>
                  <div className="flex gap-3 mt-2 items-baseline">
                     <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                     <h5 className="text-sm sm:text-base">
                        Meet the changing demands of your business without compromising reliability or security
                     </h5>
                  </div>
                  <div className="flex gap-3 mt-2 items-baseline">
                     <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                     <h5 className="text-sm sm:text-base">
                        Cut routine network task time from hours to minutes by using our open source APIs
                     </h5>
                  </div>
                  <div>
                  {/* <button 
                  style={{
                  background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                  }} 
                  className="font-bold text-xs text-white transition-all tracking-wider mt-3 px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                  >
                        EXPLORE THE PLATFORM
                     </button> */}
                  </div>
               </div>

               {/* Image Section */}
               <div className="w-full md:w-1/2 flex justify-center items-center">
                  <img
                     className="p-4 rounded-xl sm:max-w-[450px] md:max-w-[450px] lg:max-w-[650px] xl:max-w-[700px]"
                     src={bill}
                     alt="Bill Service"
                  />
               </div>

            </div>
         </div>
      </>
   );
};

export default BillService;
