import React, { useState } from "react";
import bg1 from "../../assets/images/cattering.avif";
import bg2 from "../../assets/images/cattering2.avif";
import bg3 from "../../assets/images/cattering3.avif";

const Slider = () => {
  const slides = [
    {
      image: bg1,
      content: "Drove 40% cost savings across 42 financial services sites.",
      details: [
        "Implemented cost-efficient network management tools.",
        "Reduced operational complexity across 42 sites.",
      ],
    },
    {
      image: bg2,
      content: "Achieved 25% increase in network performance.",
      details: [
        "Deployed advanced wireless solutions for seamless connectivity.",
        "Streamlined performance metrics to ensure consistent growth.",
      ],
    },
    {
      image: bg3,
      content: "Reduced network complexity across 15 global sites.",
      details: [
        "Centralized IT operations for scalability and performance.",
        "Minimized downtime by 30% through efficient infrastructure.",
      ],
    },
    {
      image: bg1,
      content: "Enhanced IT performance with cost-effective solutions.",
      details: [
        "Integrated secure SD-WAN to optimize business processes.",
        "Improved reliability across multi-site operations.",
      ],
    },
    {
      image: bg2,
      content: "Simplified network management with innovative tools.",
      details: [
        "Adopted cutting-edge technology for faster deployment.",
        "Ensured compliance with industry standards.",
      ],
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full relative">
      {/* Main Slider Container */}
      <div className="flex h-[900px] items-center justify-start">
        {/* Content Section */}
        <div className="absolute bg-white w-full lg:w-[900px] 2xl:w-[55%] flex flex-col justify-center 2xl:pl-[20%] pl-4 sm:pr-0 pr-4 sm:pl-[50px] lg:pl-[130px] md:rounded-r-full h-[700px]">
          <div className="sm:w-[440px]">
            {/* Main Heading */}
            <div className="text-start">
              <h1 className="text-3xl font-poppins text-[#3C3C3C] font-normal">
                {slides[currentSlide].content}
              </h1>
            </div>

            {/* Dynamic Details */}
            {slides[currentSlide].details.map((detail, index) => (
              <div
                key={index}
                className="flex items-baseline mt-6 gap-2 text-[#3C3C3C]"
              >
                <i className="fa-solid text-[5px] fa-circle"></i>
                <p className="text-lg font-poppins">{detail}</p>
              </div>
            ))}

            {/* Button */}
            <div>
              <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
                READ THE CASE STUDY
              </button>
            </div>

            {/* Navigation Buttons and Next Slide Info */}
            <div className="flex gap-5 mt-14">
              <div className="relative gap-2 flex  w-fit">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="text-3xl h-fit px-4 py-2 hover:bg-gray-700 hover:text-white transition-all border border-gray-700  rounded-full focus:outline-none"
                >
                  <i className="fa-light rotate-180 fa-angle-right"></i>
                </button>
                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="text-3xl h-fit px-4 py-2 hover:bg-gray-700 hover:text-white transition-all border border-gray-700  rounded-full focus:outline-none"
                >
                  <i className="fa-light fa-angle-right"></i>
                </button>
              </div>

              {/* Next Slide Info */}
              <div>
                <h1 className="text-xs">NEXT CASE STUDY</h1>
                <p className="font-[390] font-poppins text-lg">
                  {slides[(currentSlide + 1) % slides.length].content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <img
          src={slides[currentSlide].image}
          alt="slider"
          className="w-full h-full max-h-[800px] lg:max-h-[900px] object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default Slider;
