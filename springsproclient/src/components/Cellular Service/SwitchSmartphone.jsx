import React, { useState } from "react";

const SwitchSmartphone = ({
  onValueChange,
  selectedValue,
  setSelectedValue,
}) => {
  const handleSelection = (value) => {
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div className="max-w-[584px] mx-auto pt-[30px]">
      <div className="max-w-[450px] mx-auto sm:gap-6 gap-4 items-center justify-center h-full">
        {/* Own Your Smartphone Section */}
        <div className="border border-ghost sm:p-4 p-3 rounded-xl h-full">
          <div className="flex gap-3 items-center">
            <div className="flex gap-6 items-center">
              <div className="flex gap-2.5 items-center">
                <input
                  type="radio"
                  id="ownYes"
                  checked={selectedValue === 25}
                  onChange={() => handleSelection(25)}
                  className="size-[17px] cursor-pointer"
                />
              </div>
            </div>
            <label
              htmlFor="ownYes"
              className=" font-inter cursor-pointer font-semibold md:text-lg text-base leading-lh_120 text-cyan-blue [text-shadow:0px_0px_7.2px_#00000030]"
            >
              Bring Your Own Smartphone
            </label>
          </div>
          <div className="flex gap-3 pt-[14px] items-center">
            <div className="flex  gap-6 items-center">
              <div className="flex gap-2.5 items-center">
                <input
                  type="radio"
                  id="needYes"
                  checked={selectedValue === 15}
                  onChange={() => handleSelection(15)}
                  className="size-[17px] cursor-pointer"
                />
              </div>
            </div>
            <label htmlFor="needYes" className="cursor-pointer font-inter font-semibold md:text-lg text-base leading-lh_120 text-cyan-blue [text-shadow:0px_0px_7.2px_#00000030]">
              Need New Phone
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchSmartphone;
