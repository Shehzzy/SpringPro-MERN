import React from "react";
import logo from "../assets/images/logo.svg"
const FeedBack = () => {
  return (
    <>
      <div className="w-full bg-tron-blue-200  py-10">
        <div  className=" flex container items-center  px-4 justify-center h-[440px] sm:h-[370px] mx-auto ">
          <div className=" flex-col items-center max-w-[670px] w-full flex justify-start">
            <img src={logo} className="w-[200px] pb-5" alt="" />
            <h1 className="text-3xl  font-medium text-black mt-4 text-center work-sans">Have Any Questions? Feel Free To Call Us For Enquiries!</h1>
            {/* <h4 className="mt-6 text-gray-100 font-medium">-BRIAN FISHER</h4> */}
            <h4 className=" mt-5 text-black text-center inter font-medium">We Offer The Industry-Leading Technology Solutions With our extensive services, we can guarantee that your business needs will be met. In addition, our engineering team is equipped to assist in every real-world situation you can think of.</h4>
            <button className="text-black border hover:border-tron-blue hover:bg-tron-blue border-black px-6  inter mt-10 text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
