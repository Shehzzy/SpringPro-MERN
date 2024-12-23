import React, { useState } from 'react';
import img from "../../assets/images/2.png"
import img1 from "../../assets/images/3.svg"
import img2 from "../../assets/images/world.png"

const Accordion = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('apps');

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

    return (

        <>
      <div className="py-16  w-full">
        <div className="container mx-auto xl:px-[120px] px-4 ">
          <div className="w-full md:flex-row flex-col gap-y-10 gap-x-4 flex">
            <div className="w-full md:w-1/2 xl:pr-[120px] lg:pr-8 ">
            <p className=" text-[#3C3C3C] text-lg ">
            
            ML-POWERED INSIGHTS</p>
              <h1 style={{ lineHeight: '50px' }} className="text-[40px] mt-5 text-[#3C3C3C] lg:text-[50px] work-sans font-medium lea">
              Get ahead of SaaS application issues
              </h1>
              <p className="mt-5 text-[#3C3C3C]">
            
Identify issues as they happen with continuous monitoring across all internal and external domains.</p>

              <div className="w-full mt-8 flex flex-col">
                {/* App Tab */}
                <button
                  className={`flex text-2xl font-poppins gap-14 border-b items-center justify-between w-full px-3 py-6 ${
                    activeTab === 'apps'
                      ? 'text-[#3C3C3C] bg-tron-blue border-b-2 border-tron-blue'
                      : 'text-gray-400 border-b border-gray-300'
                  }`}
                  onClick={() => handleTabClick('apps')}
                >
                  <span className='text-start'>ThousandEyes inside and out</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                {/* API Tab */}
                <button
                  className={`flex text-2xl font-poppins gap-14 border-b items-center justify-between w-full px-3 py-6 ${
                    activeTab === 'api'
                      ? 'text-[#3C3C3C] bg-tron-blue border-b-2 border-tron-blue'
                      : 'text-gray-400 border-b border-gray-300'
                  }`}
                  onClick={() => handleTabClick('api')}
                >
                  <span className='text-start'>Proactive Monitoring</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
                <button
                  className={`flex text-2xl font-poppins gap-14 border-b items-center justify-between w-full px-3 py-6 ${
                    activeTab === 'analysis'
                      ? 'text-[#3C3C3C] bg-tron-blue border-b-2 border-tron-blue'
                      : 'text-gray-400 border-b border-gray-300'
                  }`}
                  onClick={() => handleTabClick('analysis')}
                >
                  <span className='text-start'>Smart root cause - analysis</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Right side content based on active tab */}
            <div className="w-full md:w-1/2 ">
              <div className="w-full">
                {/* Conditionally render content based on activeTab */}
                {activeTab === 'apps' && (
                  <div className="apps">
                    <img src={img} alt="Apps" />
                    <h1 className='text-[#3C3C3C] mt-6 font-poppins text-[22px] w-[350px]'>Instant, always-on visibility for critical SaaS apps at scale.</h1>
                  </div>
                )}

                {activeTab === 'api' && (
          <div className="api">
          <img src={img2} className='' alt="Apps" />
          <h1 className='text-[#3C3C3C] mt-6 font-poppins text-[22px] w-[350px]'>Identify problems before users are impacted, whether apps are in use or not.</h1>
          </div>
                )}
                             {activeTab === 'analysis' && (
          <div className="api">
          <img src={img1} className='' alt="Apps" />
          <h1 className='text-[#3C3C3C] mt-6 font-poppins text-[22px] w-[350px]'>ML-powered corrective recommendations, including confidence ratings across LAN, WAN, and app servers.</h1>
          </div>
                )}
              </div>
            </div>
          </div>
          <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
       TRY IT NOW
    </button>
        </div>
      </div>
        </>
    );
};

export default Accordion;
