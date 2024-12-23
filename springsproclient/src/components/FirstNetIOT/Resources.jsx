import React from "react";
import rimg1 from "../../assets/images/rimg1.webp";
import rimg2 from "../../assets/images/rimg2.avif";
import rimg3 from "../../assets/images/rimg3.avif";

const Resources = () => {
  // Data for the resources
  const resources = [
    {
      id: 1,
      image: rimg1,
      title: "Evolve your SMB with smarter IT",
      description:
        "From surveillance to automation, enhance operations with next-level IT solutions and smarter spaces.",
      buttonText: "GET THE EBOOK",
      buttonLink: "#",
    },
    {
      id: 2,
      image: rimg2,
      title: "Revolutionize your workspace",
      description:
        "Transform your work environment with powerful collaboration tools and seamless connectivity.",
      buttonText: "READ THE GUIDE",
      buttonLink: "#",
    },
    {
      id: 3,
      image: rimg3,
      title: "Secure your digital future",
      description:
        "Learn how to protect your business from cyber threats with cutting-edge security solutions.",
      buttonText: "LEARN MORE",
      buttonLink: "#",
    },
  ];

  return (
    <>
      <div className="py-10 pb-24 bg-gray-100">
        <div className="container mx-auto px-4 xl:px-[120px]">
          <p className="work-sans text-4xl font-[600] text-[#3C3C3C] mt-4">
            Resources to stay ahead
          </p>
          <div className="grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="hover:shadow-2xl rounded-xl overflow-hidden"
              >
                <div>
                  <img
                    src={resource.image}
                    className="w-full h-[180px] object-cover"
                    alt={resource.title}
                  />
                </div>
                <div className="bg-white pt-7 pb-5 px-5">
                  <h1 className="text-[#3C3C3C] font-poppins text-2xl font-medium">
                    {resource.title}
                  </h1>
                  <p className="text-sm text-[#3C3C3C] font-poppins mt-4">
                    {resource.description}
                  </p>
                  <a
                    href={resource.buttonLink}
                    className="text-[#8f4621] text-base mt-6 font-semibold flex items-center"
                  >
                    <span>{resource.buttonText}</span>
                    <i className="fa-solid fa-chevron-right ml-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
