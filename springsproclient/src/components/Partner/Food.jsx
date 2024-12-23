import "../../App.css"
import cbst from "../../assets/images/cbtslogo.avif"

const Food = () => {
  return (
    <>
      <div className="py-16">
        <div className="w-full h-[850px] sm:h-[750px] business">
          <div className="flex h-[850px] sm:h-[750px] w-full items-center">
            <div className="bg-white rounded-xl md:rounded-l-none px-4 md:pr-0  md:pl-16 py-20 w-full mx-4 md:mx-0 shadow-2xl max-w-[900px] md:rounded-r-full  ">
              <div className={`h-full  flex flex-col justify-center   w-full md:w-1/2`}>
              <img src={cbst} className="w-[100px]" alt="" />
                <h1 style={{ lineHeight: "40px" }} className=" text-[35px] text-[#3C3C3C] lg:text-[35px] mt-5  work-sans font-medium lea">Meraki deployment is fastest growing managed service in CBTS history</h1>

                <div className="flex gap-3 mt-5 items-baseline">
                  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                  <h5 className="text-[#3C3C3C]">Since selecting Meraki four years ago, CBTS now boasts over 600 unique NaaS customers and an average site install interval of 30 days</h5>
                </div>
                <div className="flex gap-3 mt-5 items-baseline">
                  <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                  <h5 className="text-[#3C3C3C]">Not only has the Meraki offering driven revenue but it also reduced their quote-to-cash interval, which lowers OpEx at the same time</h5>
                </div>
 
                <div>
                  <button className="text-black hover:bg-transparent transition-all border-2 border-tron-blue hover:border-black bg-tron-blue px-6  mt-5 inter text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
                    READ CASE STUDY
                  </button>
                </div>
              </div> </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Food;
