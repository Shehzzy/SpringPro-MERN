import React from "react";
import womenimg from "../../assets/images/hero-img.png"; // Make sure the path is correct

const Products = () => {
  // Data for the products
  const products = [
    {
      id: 1,
      icon: "fa-light fa-router",
      color: "text-blue-500",
      title: "Wireless",
      description:
        "Reliable high performing Wifi 6 access points and intuitive Wireless Health Tools.",
      linkText: "SEE PRODUCTS",
      link: "#",
    },
    {
      id: 2,
      icon: "fa-light fa-network-wired",
      color: "text-green-500",
      title: "Switching",
      description:
        "Cloud-managed switches with Layer 2/3 features for performance and scalability.",
      linkText: "SEE PRODUCTS",
      link: "#",
    },
    {
      id: 3,
      icon: "fa-light fa-cloud",
      color: "text-yellow-500",
      title: "Security & SD-WAN",
      description:
        "Secure your network with advanced threat protection and simplified SD-WAN.",
      linkText: "SEE PRODUCTS",
      link: "#",
    },
    {
      id: 4,
      icon: "fa-light fa-server",
      color: "text-purple-500",
      title: "Smart Cameras",
      description:
        "High-definition security cameras with edge-based storage and advanced analytics.",
      linkText: "SEE PRODUCTS",
      link: "#",
    },
    {
      id: 5,
      icon: "fa-light fa-mobile-alt",
      color: "text-red-500",
      title: "Mobile Device Management",
      description:
        "Easily manage devices, apps, and policies with an intuitive cloud-based dashboard.",
      linkText: "SEE PRODUCTS",
      link: "#",
    },
    {
      id: 6,
      icon: "fa-light fa-bolt",
      color: "text-indigo-500",
      title: "IoT",
      description:
        "Monitor, manage, and secure your IoT devices for smarter business operations.",
      linkText: "SEE PRODUCTS",
      link: "#",
    },
  ];

  return (
    <>
      <div className="py-16">
        <div className="container mx-auto px-4 xl:px-[200px]">
          <h1 className="work-sans text-center text-4xl !leading-[40px] mt-10 sm:text-4xl font-medium text-[#3C3C3C]">
            Simplified experiences powered by Meraki.
          </h1>
          <p className="text-xs text-center text-[#3C3C3C]">
            All of your IT needs in one dashboard.
          </p>
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex hover:shadow-lg rounded-2xl px-4 flex-col items-center"
              >
                <i
                  className={`text-8xl mt-6 ${product.color} ${product.icon}`}
                ></i>
                <h1 className="text-base mt-8 font-medium font-poppins text-[#3C3C3C]">
                  {product.title}
                </h1>
                <p className="text-xs mt-2 text-[#4b4b4b] text-center">
                  {product.description}
                </p>
                <a
                  href={product.link}
                  className="text-[#8f4621] text-xs pb-5 font-semibold mt-10 flex items-center"
                >
                  <span>{product.linkText}</span>
                  <i className="fa-solid fa-chevron-right ml-2"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
