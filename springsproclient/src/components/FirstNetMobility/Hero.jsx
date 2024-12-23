import React from "react";
import womenimg from "../../assets/images/hero-img.png"; // Make sure the path is correct

const Hero = () => {
  return (
    <>
      <div className="relative b overflow-hidden">
      <div className="overflow-hidden  container md:flex-row flex-col gap-x-4 xl:gap-x-16 px-4 xl:px-[120px] mx-auto w-full flex h-full">
        
          <div className="flex-col md:h-auto md:px-4 px-4 sticky z-[10] lg:px-4 xl:px-4 !pr-0 w-full md:w-1/2 flex justify-center items-start">

            <h1 className="work-sans text-[40px] leading-[50px] sm:leading-[60px] mt-10 sm:text-5xl font-medium text-[#3C3C3C]">
            Give your retail customers and associates superior experiences.
            </h1>
            <p className="text-[#3C3C3C] text-base sm:text-base mt-6 font-[350] inter">
            Fast-track innovation, optimize operations, and delight customers with cloud-based technologies that make it easier to intelligently connect, secure, and unify IT experiences at scale.
            </p> <button className="font-semibold lg:text-sm text-base text-black hover:border-black hover:bg-transparent transition-all w-fit tracking-wider px-8 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue mt-8">
              GET THE EBOOK
            </button>
          </div>
          <div className="sticky z-[10] flex md:h-auto sm:h-[700px] ] items-start sm:items-center justify-center w-full md:w-1/2">
            {/* Ensure the image is being used correctly with the imported path */}
            <img src={womenimg} alt="Hero" className="w-[800px] py-4  " />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
