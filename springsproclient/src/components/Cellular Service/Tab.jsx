import { useState } from 'react';
import img from "../../assets/images/2.png";
import img2 from "../../assets/images/deploys.svg";

const Tab = () => {
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
              <h1 style={{ lineHeight: '50px' }} className="text-[40px] text-[#3C3C3C] lg:text-[50px] work-sans font-medium lea">
                Automate and customize to fit your needs.
              </h1>
              <p className="mt-5 text-[#3C3C3C]">
                Do more in less time and gain valuable business insights with our APIs and ecosystem apps.
              </p>

              <div className="w-full mt-8 flex flex-col">
                {/* App Tab */}
                <button
                  className={`flex text-3xl font-poppins border-b items-center justify-between w-full px-6 py-3 ${
                    activeTab === 'apps'
                      ? 'text-[#3C3C3C] bg-tron-blue border-b-2 border-tron-blue'
                      : 'text-gray-400 border-b border-gray-300'
                  }`}
                  onClick={() => handleTabClick('apps')}
                >
                  <span>Apps</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                {/* API Tab */}
                <button
                  className={`flex text-3xl font-poppins border-b items-center justify-between w-full px-6 py-3 ${
                    activeTab === 'apis'
                      ? 'text-[#3C3C3C] bg-tron-blue border-b-2 border-tron-blue'
                      : 'text-gray-400 border-b border-gray-300'
                  }`}
                  onClick={() => handleTabClick('apis')}
                >
                  <span>APIs</span>
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
                    <h1 className='text-[#3C3C3C] mt-6 font-poppins text-[22px]'>Automate network management and get customized business solutions with pre-made apps. <span className='text-tron-blue-100'>Visit the SpringsAirNS Marketplace</span></h1>
                  </div>
                )}

                {activeTab === 'apis' && (
          <div className="api">
          <img src={img2} className='' alt="Apps" />
          <h1 className='text-[#3C3C3C] mt-6 font-poppins text-[22px]'>Build on our open-source APIs to create the automation and network customization to fit your unique needs.<span className='text-tron-blue-100'>Visit the SpringsAirNS Marketplace</span></h1>
        </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
