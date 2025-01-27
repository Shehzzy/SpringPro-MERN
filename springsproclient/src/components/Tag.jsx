import React from "react";
import women from "../assets/images/women.png";
import { Link } from 'react-router-dom';

const Tags = () => {
  return (
    <>
      <div className="w-full bg-tron-blue-200 py-10 md:py-16" id="about">
        <div className="container mx-auto w-full flex flex-col-reverse md:flex-row px-4 sm:px-6 xl:px-[120px] gap-6 md:h-auto">
          {/* Left Content */}
          <div className="w-full flex justify-center md:justify-end items-center md:w-1/2">
            <img
              src={women}
              alt="About Us"
              className="w-full max-w-[400px] md:max-w-[540px] h-auto"
            />
          </div>

          {/* Right Content */}
          <div className="w-full flex flex-col justify-center items-start md:items-start md:w-1/2 text-left md:text-left">
            <h1 className="work-sans font-medium text-[#3C3C3C] text-center leading-tight text-3xl md:text-4xl lg:text-5xl">
              About Us
            </h1>
            <p className="inter text-sm sm:text-base mt-6 font-light">
              Our team is made up of seasoned telecommunication professionals who have extensive
              experience with all the major carriers. This gives us a distinct advantage when it comes
              to providing the best solutions for our customers’ varying needs.
            </p>
            <p className="inter text-sm sm:text-base mt-2 font-light">
              We take care of management, procurement, and implementation of systems so our customers
              can focus on the main aspects of their business.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6 justify-start">
              <button 
                style={{
                  background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                }} 
                className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                  <Link to={"/cellular-service"} className='text-white no-underline'>LEARN ABOUT DXA</Link>
              </button>
{/* 
              <button 
                style={{
                  background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                }} 
                className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                CONTACT
              </button> */}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
