import React, { useState, useEffect } from "react";
import "../App.css";

import tech from "../assets/images/tech.avif";
// Import the 7 partner images
import partner1 from "../assets/images/partner1.png";
import partner2 from "../assets/images/partner2.png";
import partner3 from "../assets/images/partner3.png";
import partner4 from "../assets/images/partner4.png";
import partner5 from "../assets/images/partner5.png";
import partner6 from "../assets/images/partner6.png";
import partner7 from "../assets/images/partner7.png";

const Technology = () => {
  // State to track the opacity of slide-2
  const [slide2Opacity, setSlide2Opacity] = useState(0);

  useEffect(() => {
    // Set the opacity of slide-2 to 1 after 5 seconds
    const timer = setTimeout(() => {
      setSlide2Opacity(1); // After 5 seconds, set opacity to 1
    }, 5000);

    // Cleanup the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="w-full mt-10 px-4 pb-10 sm:pb-20 bg-blue-300">
        <div className="container mx-auto">
          <div className="w-full flex flex-col items-center">
            <img className="w-full max-w-[500px] pt-2" src={tech} alt="Technology" />
            <h1 className="text-4xl sm:text-5xl mt-8 sm:mt-16 md:text-7xl work-sans text-center font-medium text-black">
              Our Partners
            </h1>

            {/* Slider Container */}
            <div className="image-container  max-w-[600px] h-[150px] w-full mt-8 overflow-hidden relative">

              {/* First Slider (Always visible) */}
              <div className="slide-1 flex absolute w-full left-0 top-0 h-[150px] items-center">
                <img src={partner1} className="w-[150px]" alt="" />
                <img src={partner2} className="w-[150px]" alt="" />
                <img src={partner3} className="w-[150px]" alt="" />
                <img src={partner4} className="w-[150px]" alt="" />
              </div>

              {/* Second Slider (Initially hidden, opacity 0, becomes visible after 5 sec) */}
              <div
                className="slide-2 flex absolute w-full left-0 top-0 h-[150px] items-center"
                style={{ opacity: slide2Opacity }}
              >
                <img src={partner5} className="w-[150px]" alt="" />
                <img src={partner6} className="w-[150px]" alt="" />
                <img src={partner7} className="w-[150px]" alt="" />
                <img src={partner3} className="w-[150px]" alt="" />
              </div>

            </div>

            <button className="bg-white hover:bg-transparent border border-transparent hover:border-black transition-all px-6 mt-10 inter text-sm sm:text-base py-4 sm:py-2.5 rounded-full font-semibold tracking-wide">
              START NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Technology;
