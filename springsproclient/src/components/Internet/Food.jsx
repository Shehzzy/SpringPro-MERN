import "../../App.css"
import school from "../../assets/images/school.png"
import Structure from "../Cellular Service/Structure";
const Food = () => {
  return (
<>
<div className="w-full h-[950px] sm:h-[750px] women_group">
    <div className="flex h-[950px] sm:h-[750px] w-full items-center">
        <div className="bg-white px-4 md:pr-0 md:pl-[100px] py-[110px] w-full mx-4 md:mx-0 shadow-2xl max-w-[850px] md:rounded-l-none rounded-2xl md:rounded-r-full  ">
         <div>
          <img src={school} className="w-[200px]" alt="" />
          <h2 className="text-3xl font-poppins mt-10 !leading-[45px] text-[#3C3C3C]">Enabling adventurous <br /> learning through a cellular- <br />powered remote network.  </h2>
          <p className="font-poppins mt-5 font-[350]">With Meraki MG, Wilderness School was able to ensure <br /> reliable internet coverage at a remote campsite so students <br /> and staff received the same adventurous learning <br /> experience they had come to expect on campus.</p>
          <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
READ CASE STUDY
    </button>
         </div>
      </div>
    </div>
</div>
</>
  );
};

export default Food;
