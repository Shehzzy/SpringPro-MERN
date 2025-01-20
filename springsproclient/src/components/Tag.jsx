import React from "react";
import women from "../assets/images/women.png";

const Tags = () => {
  return (
    <>
      <div className="w-full bg-tron-blue-200 py-10">
        <div className="container mx-auto w-full flex flex-col-reverse md:flex-row px-4 sm:px-6 xl:px-[120px] gap-6 md:h-auto">
          {/* Left Content */}
          <div className="w-full flex justify-center md:justify-end items-center md:w-1/2">
            <img src={women} alt="About Us" className="w-full max-w-[400px] md:max-w-[540px] h-auto" />
          </div>

          {/* Right Content */}
          <div className="w-full flex flex-col justify-center items-center md:items-start md:w-1/2 text-center md:text-left">
            <h2 className="work-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#212121] leading-tight">
              About Us
            </h2>
            <p className="inter text-sm sm:text-base mt-6 font-light">
              Our team is made up of seasoned telecommunication professionals who have extensive
              experience with all the major carriers. This gives us a distinct advantage when it comes
              to providing the best solutions for our customers’ varying needs.
            </p>
            <p className="inter text-sm sm:text-base mt-4 font-light">
              We take care of management, procurement, and implementation of systems so our customers
              can focus on the main aspects of their business.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="font-semibold text-sm text-black hover:border-black hover:bg-transparent transition-all tracking-wider px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue">
                LEARN ABOUT DXA
              </button>
              <button className="font-semibold text-sm text-black hover:border-black hover:bg-transparent transition-all tracking-wider px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue">
                CONTACT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
