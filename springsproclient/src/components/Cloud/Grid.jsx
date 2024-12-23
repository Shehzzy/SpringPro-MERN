import React from "react";
// Make sure the path is correct
import aws from "../../assets/images/aws.png";
import azure from "../../assets/images/azure.jpeg"
import cloud from "../../assets/images/cloud.png"
import ibm from "../../assets/images/ibm.png"

const Hero = () => {
  // Array of grid item data
  const gridItems = [
    { id: 1, title: "AWS", imgSrc: aws, linkText: "GET WIM ON AWS" },
    { id: 2, title: "Microsoft Azure", imgSrc: azure, linkText: "GET WIM ON AZURE" },
    { id: 3, title: "Google Cloud", imgSrc: cloud, linkText: "GET WIM ON GCP" },
    { id: 4, title: "IBM Cloud", imgSrc: ibm, linkText: "GET WIM ON IBM CLOUD" },
  ];

  return (
    <>
      <div className="py-20">
        <div className="container xl:px-[120px] px-4 mx-auto">
        <h1 className="leading-[50px] text-center text-[#3C3C3C] lg:leading-[60px] text-[35px] lg:text-[50px] mt-5 work-sans font-[525]">
          Clouds, Connected
        </h1>
        <p className="work-sans  mt-4 text-center ">Multiple methods, multiple providers, and multiple regions—with one hybrid cloud.
        </p>
          <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gridItems.map((item) => (
              <div
                key={item.id}
                className="w-full hover:shadow-2xl transition-all border rounded-xl py-20 flex flex-col items-center"
              >
                <img className="w-[100px] object-contain h-[100px]" src={item.imgSrc} alt={item.title} />
                <h1 className="text-2xl font-medium text-[#3C3C3C] mt-5">
                  {item.title}
                </h1>
                <a
                  href="#"
                  className="text-[#8f4621] text-lg font-semibold mt-10 flex items-center"
                >
                  <span>{item.linkText}</span>
                  <i className="fa-solid fa-chevron-right ml-2"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
