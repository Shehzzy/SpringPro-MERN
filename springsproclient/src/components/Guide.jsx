import React from "react";
import "../App.css";
import dashboard from "../assets/images/dashboard.svg";
import { Link } from 'react-router-dom';

const Guide = () => {
   return (
      <>
         <div className="container mx-auto">
            <div className="w-full flex gap-y-8 px-4 xl:px-[120px] md:flex-row-reverse flex-col-reverse">
               <div className="h-full flex flex-col justify-center md:pl-16 w-full md:w-1/2">
                  <h1
                     style={{ lineHeight: "40px" }}
                     className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[40px] work-sans font-medium lea"
                  >
                     Meet the Spring Air Network Solution Dashboard
                  </h1>
                  <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-lg">
                     Manage your entire distributed network infrastructure in a single intuitive interface—the Meraki dashboard.
                  </p>
                  <div className="flex gap-3 mt-2 items-baseline">
                     <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                     <h5 className="text-sm sm:text-base">
                        Monitor WAN, access, and IoT technologies in one place with end-to-end visibility
                     </h5>
                  </div>
                  <div className="flex gap-3 mt-2 items-baseline">
                     <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                     <h5 className="text-sm sm:text-base">
                        View the overall health of each network and proactively solve issues before they become critical
                     </h5>
                  </div>
                  <div className="flex gap-3 mt-2 items-baseline">
                     <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                     <h5 className="text-sm sm:text-base">
                        Leverage our advanced AI to take the guesswork out of optimizing networks
                     </h5>
                  </div>
                  <div>
                     <button 
                     style={{
                     background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                     }} 
                     className="font-bold text-xs mt-3 text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                     >
                        <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                     </button>
                  </div>
               </div>
               <div className="md:w-1/2 flex items-center justify-center">
                  <img
                     className="p-0 sm:w-[120%] md:w-[130%] lg:w-[150%] xl:w-[160%] h-auto object-contain"
                     src={dashboard}
                     alt="Dashboard"
                  />


               </div>

            </div>
         </div>
      </>
   );
};

export default Guide;