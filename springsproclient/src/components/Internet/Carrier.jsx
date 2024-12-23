import React from "react";
import at from "../../assets/images/AT.avif"
import verizon from "../../assets/images/verizon.avif"
import firstnet from "../../assets/images/first_net.webp"
import vodafone from "../../assets/images/vodafone.avif"
import tmobile from "../../assets/images/tmobile.avif" // Make sure the path is correct

const Carrier = () => {
    return (
        <>
            <div className="relative py-16 bg-gray-100 overflow-hidden">
                <div className="container mx-auto px-4 xl:px-[120px] w-full ">
                    <div className="w-full flex gap-y-10 md:flex-row flex-col">
                        <div className="  w-full md:w-fit md:min-w-[300px]">
                            <h1 className="leading-[50px] text-start text-[#3C3C3C] lg:leading-[60px] text-[50px] lg:text-[60px]  work-sans font-[525]">
                                Bring Your <br className="md:block hidden" />  own <br className="md:block hidden" />  Carrier
                            </h1>
                            <p className="font-[300] work-sans mt-8 tracking-wide">Certified by major global and regional <br className="md:block hidden" /> providers.</p>
                            <div className="mt-5">
                            <a href="#" className="text-[maroon] font-medium "><span>SEE WHICH MG IS RIGHT FOR YOU  </span><i className="fa-regular fa-chevron-right"></i></a>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="grid  w-full items-center gap-x-10 gap-y-5 md:px-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                                <img src={at} className="w-full" alt="" />
                                <img src={verizon} className="w-full" alt="" />
                                <img src={firstnet} className="w-full" alt="" />
                                <img src={vodafone} className="w-full" alt="" />
                                <img src={tmobile} className="w-full" alt="" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carrier;
