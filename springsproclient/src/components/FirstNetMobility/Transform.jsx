import React from "react";
import vision from "../../assets/images/visionwork.png";
import clark from "../../assets/images/clarks.avif";
import qdoba from "../../assets/images/qdoba.avif";

const Transform = () => {
  // Data for the cards
  const transformItems = [
    {
      image: vision,
      title: "Improving experiences",
      description:
        "Visionworks brought IT into focus with Meraki Wi-Fi and cameras.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: clark,
      title: "Enhancing reliability",
      description:
        "Clark’s improved operational efficiency with Meraki networking solutions.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: qdoba,
      title: "Boosting productivity",
      description:
        "Qdoba modernized their infrastructure with Meraki cloud-managed IT.",
      link: "#",
      linkText: "LEARN MORE",
    },
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4 xl:px-[120px]">
        <h1
          style={{ lineHeight: "50px" }}
          className="text-[40px] text-center lg:text-[50px] mt-5 work-sans font-medium"
        >
          Retailers worldwide are transforming <br /> their business with Meraki
          cloud- <br />
          managed IT.
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {transformItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col px-6 bg-gray-100 py-6 rounded-xl overflow-hidden h-[380px] justify-between"
            >
              <div>
                <div className="flex w-full justify-center">
                  <img src={item.image} className="w-[250px]" alt={item.title} />
                </div>
                <h1 className="font-poppins mt-6 text-4xl font-semibold text-[#3C3C3C]">
                  {item.title}
                </h1>
                <p className="font-poppins text-sm font-[350] mt-6">
                  {item.description}
                </p>
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

export default Transform;
