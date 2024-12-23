import "../../App.css"

import Structure from "../Cellular Service/Structure";
const Food = () => {
  return (
<>
<div className="w-full h-[950px] sm:h-[750px] food-cont">
    <div className="flex h-[950px] sm:h-[750px] w-full items-center">
        <div className="bg-white w-full mx-4 md:mx-0 shadow-2xl max-w-[1100px] md:rounded-r-full  ">
        <Structure button={"READ CASE STUDY"} heading={"Delivering a consistently fresh experience"} point1={"Swift and painless digital transformation: The planning process for transforming the QDOBA network was done in just two weeks, which typically would take two months or more."} point2={"Increased network uptime: A critical advantage for the business, this improvement leads to increased sales and a better experience for guests."} point3={"Reduction in costs: QDOBA has been able to save $300,000 per year in support costs. What used to require a ten-person support team now just takes two people to support the new network, and most issues can now be resolved in a matter of minutes."}/>
        </div>
    </div>
</div>
</>
  );
};

export default Food;
