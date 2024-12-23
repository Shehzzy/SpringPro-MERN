import women from "../assets/images/women.png"
import React from "react";
const Tags = () => {

  return (
    <>
      <div className=" w-full  bg-tron-blue-200 ">
        <div className="container px-4 xl:px-[120px]   md:flex-row flex-col md:h-[500px] mx-auto py-5  w-full gap-6 flex">
          <div className="w-full flex justify-end items-center    md:w-1/2  sm:h-[500px] md:h-auto relative">
            <img src={women} className="w-full  max-w-[540px]" alt="" />
          </div>
          <div className=" w-full  md:py-0 py-5 sm:py-10    px-0 md:w-1/2 flex flex-col justify-center sm:items-start  ">
            <h2 className="leading-0 work-sans text-start leading-[50px] sm:leading-[57px] font-semibold text-[#212121]  text-[54px] sm:text-6xl">About Us </h2>
            <div className="inter font-light  mt-6"><div>Our team is made up of seasoned telecommunication professionals who have extensive experience with all the major carriers. This gives us a distinct advantage when it comes to providing the best solutions for our customers’ varying needs.</div>



              <div className="mt-8 sm:mt-14"> We take care of management, procurement and implementation of systems so our customers can focus on the main aspects of their business..</div></div>

            <div className="flex flex-wrap gap-x-5">
              <button className="font-semibold lg:text-sm text-base text-black hover:border-black hover:bg-transparent transition-all w-fit tracking-wider px-4 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue  mt-8">LEARN ABOUT DXA</button>
              <button className="font-semibold lg:text-sm text-base text-black hover:border-black hover:bg-transparent transition-all w-fit tracking-wider px-6 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue  sm:mt-8 mt-8">CONTACT</button></div>
          </div>
        </div>
      </div>
    </>)
}
export default Tags;