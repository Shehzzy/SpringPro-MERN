import React, { useState } from "react";
import tab1 from "../../assets/images/tab1.svg";
import tab2 from "../../assets/images/tab2.svg";
import tab3 from "../../assets/images/tab3.svg";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabContent = [
    {
      id: 1,
      title: "CONNECTIVITY — ANYWHERE",
      description: "Connect users at any location to public and private cloud environments or the data center.",
      image: tab1,
    },
    {
      id: 2,
      title: "All the security",
      description: "Choose between powerful on-premises and cloud network security capabilities.",
      image: tab2,
    },
    {
      id: 3,
      title: "PROACTIVE MONITORING.",
      description: "Continuous app performance monitoring across LAN, WAN, ISP, and app servers",
      image: tab3,
    },
  ];

  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 xl:px-[120px]">
        <h1 className="leading-[50px] text-center text-[#3C3C3C] lg:leading-[60px] text-[35px] lg:text-[50px] mt-5 work-sans font-[525]">
        All the people. All the things. All the places.
        </h1>
        <h1 className="text-center font-[350] text-[#3C3C3C] mt-6 font-poppins">
        Deliver secure, best-in-class network experiences for any workload—from <br /> anywhere.
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
                      className={`text-xl work-sans ${
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

      </div>
    </div>
  );
};

export default Tabs;
