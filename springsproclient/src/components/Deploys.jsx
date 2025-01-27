import deploys from "../assets/images/deploys.svg";

const Deploys = () => {
   return (
      <>
         <div className="container mt-16 pb-10 mx-auto">
            <div className="w-full items-center flex gap-y-8 px-4 xl:px-[120px] md:flex-row flex-col-reverse">
               <div className="h-full flex flex-col md:pr-16 justify-center w-full md:w-1/2">
                  <p className="mt-3 text-tron-blue text-sm sm:text-base md:text-lg work-sans">
                     We are always here to help you!
                  </p>
                  <h1
                     style={{ lineHeight: "50px" }}
                     className="work-sans font-medium text-[#3C3C3C] leading-tight text-3xl md:text-4xl lg:text-5xl"
                  >
                     Have Any Questions? Feel Free To Call Us For Enquiries!
                  </h1>
                  <p className="text-[#3C3C3C] mt-3 text-sm sm:text-base md:text-lg work-sans">
                     We Offer The Industry-Leading Technology Solutions With our extensive
                     services, we can guarantee that your business needs will be met. In addition,
                     our engineering team is equipped to assist in every real-world situation you
                     can think of.
                  </p>

                  <div>
                     <button 
                     style={{
                     background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                     }} 
                     className="font-bold text-xs text-white transition-all tracking-wider mt-3 px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                     >
                        CALL (855) 525-0855
                     </button>
                  </div>
               </div>
               <div className="md:w-1/2 flex items-center justify-center">
                  <img
                     className="w-full sm:w-[110%] md:w-[120%] lg:w-[130%] p-0 bg-white rounded-xl" src={deploys} alt="" />
               </div>
            </div>
         </div>
      </>
   );
};

export default Deploys;
