import React from "react";
import vision from "../../assets/images/pennmututal.avif";
import clark from "../../assets/images/campususa.avif";
import qdoba from "../../assets/images/bbva.avif";

const Transform = () => {
  // Data for the cards
  const transformItems = [
    {
      image: vision,
      title: "Driving operational excellence",
      description:
        "BBVA transitioned to wireless connectivity to establish a sustainable competitive advantage.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: clark,
      title: "Ensuring excellent member experiences",
      description:
        "Clark’s improved operational efficiency with Meraki networking solutions.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: qdoba,
      title: "Delivering savings via the cloud",
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
Financial institutions worldwide are <br className="sm:block hidden" /> yielding fantastic returns with <br className="sm:block hidden" /> Meraki.
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {transformItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col px-8 bg-gray-100 py-6 rounded-xl overflow-hidden h-[480px] justify-between"
            >
              <div>
                <div className="flex w-full justify-center">
                  <img src={item.image} className="w-[250px] h-[80px]  object-center object-contain" alt={item.title} />
                </div>
                <h1 className="font-poppins text-center mt-6 text-3xl font-semibold text-[#3C3C3C]">
                  {item.title}
                </h1>
                <p className="font-poppins leading-[25px] text-center text-sm font-[350] mt-6">
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
