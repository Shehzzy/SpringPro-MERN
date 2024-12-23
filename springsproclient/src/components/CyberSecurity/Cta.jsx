import img from "../../assets/images/cta.avif"
const CTA = () => {
  

    return (
        <>
         <div className="py-20 mt-[100px] bg-blue-400">
            <div className="container mx-auto px-4 xl:px-[120px]">
             <div className="w-full flex flex-col items-center">
                <img src={img} className="w-full max-w-[480px] mt-[-100px]" alt="" />
                <h1 className="text-5xl text-center text-[#3C3C3C] mt-7 font-poppins font-medium">Experience secure SD-WAN in three  <br /> clicks.</h1>
                <p className="text-[#3C3C3C] font-poppins mt-5">Mouse not included.</p>
                <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
START YOUR FREE TRIAL
    </button>
             </div>
            </div>
         </div>
        </>
    );
};

export default CTA;
