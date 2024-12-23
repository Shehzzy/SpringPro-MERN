import React from "react";
import womenimg from "../../assets/images/hero-img.png"; // Make sure the path is correct

const Hero = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-hidden container md:flex-row flex-col px-4 xl:px-[120px] mx-auto w-full flex md:pt-[140px] pt-[120px] md:h-[700px]">
          <div className="flex-col md:h-auto md:px-4 px-4 sticky z-[10] lg:px-4 xl:px-4 !pr-0 w-full md:w-1/2 flex justify-center items-start">
            <h1 className="work-sans text-5xl sm:text-7xl font-medium text-[#3C3C3C]">
              What is <br className="md:block block" /> Fibre Internet? 
            </h1>
            <p className="text-[#3C3C3C] text-lg sm:text-xl mt-6 font-[350] inter">
            Our Fiber team will work with you every step of the way to insure you are choosing the right solutions for your fiber internet needs.
            </p>
            <button className="font-semibold lg:text-sm text-base text-black hover:border-black hover:bg-transparent transition-all w-fit tracking-wider px-8 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue mt-8">
              GET SOLUTION GUIDE
            </button>
          </div>
          <div className="sticky z-[10] flex md:h-auto sm:h-[600px] ] items-start sm:items-center justify-center w-full md:w-1/2">
            {/* Ensure the image is being used correctly with the imported path */}
            <img src={womenimg} alt="Hero" className="w-[800px] py-4  " />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
