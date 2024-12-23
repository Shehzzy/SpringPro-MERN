import React from "react";
import womenimg from "../../assets/images/hero-img.png"; // Make sure the path is correct

const Grid = () => {
  // Data for grid items
  const gridItems = [
    {
      iconClass: "fa-light text-3xl fa-book-open-cover", // FontAwesome icon class
      label: "Customer Stories",
    },
    {
      iconClass: "fa-light text-3xl fa-chart-line",
      label: "Analytics",
    },
    {
      iconClass: "fa-light text-3xl fa-user-friends",
      label: "Team Collaboration",
    },
    {
      iconClass: "fa-light text-3xl fa-tools",
      label: "Tools & Resources",
    },
    {
      iconClass: "fa-light text-3xl fa-rocket",
      label: "Growth",
    },
    {
      iconClass: "fa-light text-3xl fa-lightbulb",
      label: "Innovations",
    },
  ];

  return (
    <div className="mt-16">
      <div className="w-full bg-gray-100 py-6">
        <div className="container px-4 xl:px-[120px] mx-auto">
          <div className="w-full grid justify-between grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {gridItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center flex-col text-center"
              >
                <i className={item.iconClass}></i>
                <span className="text-xs text-[#3C3C3C] font-poppins mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
