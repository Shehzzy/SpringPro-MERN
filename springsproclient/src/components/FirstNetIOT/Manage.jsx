import React from "react";

const Manage = () => {
  // Data for the grid items
  const gridItems = [
    {
      id: 1,
      icon: "fa-regular fa-shield-check",
      iconColor: "text-green-600",
      title: "Secure and Reliable",
      description:
        "Protect your business with trusted, world-class network security solutions from Cisco. Block 25% more malware threats than the industry average.",
    },
    {
      id: 2,
      icon: "fa-regular fa-server",
      iconColor: "text-blue-600",
      title: "Scalable Solutions",
      description:
        "Easily scale your infrastructure to meet growing demands with flexible and cost-effective solutions tailored to your needs.",
    },
    {
      id: 3,
      icon: "fa-regular fa-cogs",
      iconColor: "text-yellow-600",
      title: "Effortless Management",
      description:
        "Streamline your operations with easy-to-use tools for monitoring, troubleshooting, and optimizing your network.",
    },
  ];

  return (
    <div className="md:mt-[-60px]">
      <div className="container mx-auto px-4 xl:px-[120px] ">
        <div className="grid gap-x-7 sm:grid-cols-2 gap-y-5 md:grid-cols-3">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="w-full pt-8 pb-14 rounded-2xl gap-7 px-7 flex flex-col items-center bg-gray-100"
            >
              <i className={`${item.iconColor} text-5xl ${item.icon}`}></i>
              <h1 className="text-[#3C3C3C] font-semibold text-3xl text-center font-poppins">
                {item.title}
              </h1>
              <p className="font-[350] text-sm text-gray-700 text-center leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manage;
