import React from "react";
import laptoptag from "../../assets/images/taglaptop.svg";
import bag from "../../assets/images/bag.svg"
import nutperson from "../../assets/images/nutperson.svg"
import shoppingcart from "../../assets/images/shoppingcart.svg"
import orbittag from "../../assets/images/orbittag.svg"
import house from "../../assets/images/house.svg"

const Grid2 = () => {
  // Data for the cards
  const transformItems = [
    {
      image: laptoptag,
      title: "HelloFresh AU found the perfect cloud-based recipe",
      description:
        "HelloFresh AU revolutionized operations using cloud-based Meraki tools.",
      link: "#",
      linkText: "GET THE CASE STUDY",
    },
    {
      image: bag,
      title: "Clark's scaled operational efficiency with SANS",
      description:
        "Clark’s achieved seamless workflows with Meraki network optimization.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: nutperson,
      title:
        "Empowering global teams with secure solution",
      description:
        "Boost productivity with secure and reliable.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: shoppingcart,
      title:
        "Retailers are enhancing personalized shopping",
      description:
        "Retailers deliver personalized shopping experiences with Meraki Wi-Fi.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: orbittag,
      title: "IoT-driven insights for smarter operations",
      description:
        "Meraki IoT solutions transform data collection and analysis for efficiency.",
      link: "#",
      linkText: "LEARN MORE",
    },
    {
      image: house,
      title:
        "Redefining connected environments with spaces",
      description:
        "Meraki helps create smarter, more connected environments for businesses.",
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
                <h1 className="font-poppins mt-6 text-4xl font-semibold text-[#3C3C3C]">
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
