import React from "react";
import checklist from "../../assets/images/checklist.svg"
import lock from "../../assets/images/lockplanet.svg"
import parliment from "../../assets/images/parliment.svg"

const Grid2 = () => {
  // Data for the cards
  const transformItems = [
    {
      image: checklist,
      title: "Unifying Physical and Network Securitye",
      description:
        "HelloFresh AU revolutionized operations using cloud-based Meraki tools.",
      link: "#",
      linkText: "DOWNLOAD NOW",
    },
    {
      image: lock,
      title: "Making security part of the banking experience",
      description:
        "Clark’s achieved seamless workflows with Meraki network optimization.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: parliment,
      title:
        "Smart branch. Smarter network.",
      description:
        "Boost productivity with secure and reliable.",
      link: "#",
      linkText: "LEARN MORE",
    },


  ];


  return (
    <div className="py-10">
      <div className="container mx-auto px-4 xl:px-[120px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col px-6 bg-gray-100 py-6 rounded-xl overflow-hidden h-[380px] justify-between"
            >
              <div>
                <div className="flex w-full justify-center">
                  <img src={item.image} className="w-[80px]  h-[80px] object-contain object-center" alt={item.title} />
                </div>
                <h1 className="font-poppins mt-6 text-3xl font-semibold text-[#3C3C3C]">
                  {item.title}
                </h1>
              </div>
              <div className="flex justify-center">
                <a
                  href={item.link}
                  className="text-[#8f4621] text-base font-semibold mt-10 flex items-center"
                >
                  <span>{item.linkText}</span>
                  <i className="fa-solid fa-chevron-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid2;
