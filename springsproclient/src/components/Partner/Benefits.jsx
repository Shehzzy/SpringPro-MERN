import React from "react";

const Benefits = () => {
  const benefits = [
    {
      iconClass: "fa-light fa-lightbulb-on",
      title: "Start Selling Miraki",
      description: "Become an authorized reseller when you join as a partner.",
    },
    {
      iconClass: "fa-light fa-handshake",
      title: "Expand Your Network",
      description: "Collaborate with industry leaders and grow your connections.",
    },
    {
      iconClass: "fa-light fa-rocket",
      title: "Boost Your Growth",
      description: "Gain access to resources and tools to accelerate your success.",
    },
  ];

  return (
    <>
      <div className="py-16">
        <div className="container mx-auto xl:px-[120px] px-4">
          <h1 className="text-6xl font-poppins text-center text-[#3C3C3C] font-semibold">
            The benefits of joining
          </h1>
          <div className="w-full grid mt-16 grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex px-6 flex-col items-center">
                <i className={`text-8xl text-blue-600 ${benefit.iconClass}`}></i>
                <h1 className="text-2xl mt-10 font-semibold text-[#3C3C3C] font-poppins">
                  {benefit.title}
                </h1>
                <p className="text-[#3C3C3C] mt-5 font-poppins text-center">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
