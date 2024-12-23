import React from 'react';

const Info = () => {
  // Array of data representing each grid item
  const gridItems = [
    { id: 1, count: "190M+", label: "connected devices" },
    { id: 2, count: "4M+", label: "active network" },
    { id: 3, count: "190+", label: "countries globally" },
    { id: 4, count: "12M+", label: "springsairin products" },
    // Add more grid items as needed
  ];

  return (
    <div className="bg-blue-300 py-16">
      <div className="container mx-auto b px-4 xl:px-[120px]">
        {/* Grid layout with dynamically generated items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gridItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 justify-center items-center w-full h-full"
            >
              <h1 className="text-[#3C3C3C] font-semibold text-[68px] work-sans">{item.count}</h1>
              <p className="text-[#3C3C3C] text-lg work-sans">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Info;
