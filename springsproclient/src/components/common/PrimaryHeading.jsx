import React from "react";

const PrimaryHeading = ({ Children, className }) => {
  return (
    <p
      className={`sm:font-inter font-jost font-bold xl:text-5xl text-4xl sm:!leading-lh_122 !leading-lh_145 text-cyan-blue ${className}`}
    >
      {Children}
    </p>
  );
};

export default PrimaryHeading;
