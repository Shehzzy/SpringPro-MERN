import img from "../../assets/images/cta.avif"
const Business = () => {
  

    return (
        <>
         <div className="py-20   bg-blue-400">
            <div className="container mx-auto px-4 xl:px-[120px]">
             <div className="w-full flex flex-col items-center">

                <h1 className="text-5xl text-center text-[#3C3C3C] mt-7 font-poppins font-medium">For small businesses that think big.</h1>
                <p className="text-[#3C3C3C] font-poppins mt-5">Intuitive and flexible cloud-first solutions that simplify the world of IT.</p>
                <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
START FREE TRIAL
    </button>
             </div>
            </div>
         </div>
        </>
    );
};

export default Business;
