import React, { useState } from "react";
import tab1 from "../../assets/images/tab1.svg";
import tab2 from "../../assets/images/tab2.svg";
import tab3 from "../../assets/images/tab3.svg";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabContent = [
    {
      id: 1,
      title: "A hybrid cloud in minutes",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, atque!",
      image: tab1,
    },
    {
      id: 2,
      title: "Secure every connection",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
      image: tab2,
    },
    {
      id: 3,
      title: "Private cloud, multi-cloud.",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
      image: tab3,
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 xl:px-[120px]">
        <h1 className="leading-[50px] text-center text-[#3C3C3C] lg:leading-[60px] text-[35px] lg:text-[50px] mt-5 work-sans font-[525]">
          All your networks and clouds—with a single fabric.
        </h1>
        <h1 className="text-center font-[350] text-[#3C3C3C] mt-6 font-poppins">
          Quickly connect business-critical workloads with the <span className="text-blue-500">SANS platform</span> and
          our <br />
          secure <span className="text-blue-500">SD-WAN</span> fabric.
        </h1>
        <div className="flex flex-col lg:flex-row  mt-10">
          <div className="w-full flex items-center justify-center">
            <img
              src={tabContent.find((tab) => tab.id === activeTab).image}
              alt="Tab Image"
              className="w-full"
            />
          </div>
          <div className="w-full lg:pl-4  lg:max-w-[380px]">
            <div className="space-y-10  py-20 relative">
              {/* <div className="border-[0.5px] left-[18px] z-0 border-red absolute w-[1px] top-[16px] h-[200px]"></div> */}
              {tabContent.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex z-[1] border  items-start p-3 ${
                    activeTab === tab.id ? "" : "border-gray-200"
                  } rounded-lg cursor-pointer transition-all`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div
                    className={`w-6 h-6 mt-1 mr-4 flex items-center justify-center rounded-full cursor-pointer border-2 transition-all ${
                      activeTab === tab.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <div className="w-3 mx-1 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h1
                      className={`text-2xl work-sans ${
                        activeTab === tab.id ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {tab.title}
                    </h1>
                    {activeTab === tab.id && (
                      <p className=" font-[350] mt-3 work-sans text-gray-600">{tab.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
        <button
  className="text-black hover:text-black bg-transparent hover:bg-tron-blue transition-all px-6 border-2 border-tron-blue hover:border-black mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide"
>
  Try VMX Models
</button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
