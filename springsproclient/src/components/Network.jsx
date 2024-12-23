import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Network = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check the window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cards = [
    {
      icon: "house",
      color: "#ffff14",
      style: "regular",
      title: "Cellular Service for Business",
      description: "Our mobility account team brings years of combined AT&T Mobility experience to our customers. Every individual on our team is considered a leader in..",
      linkText: "EVOLVE ENABLE WORK",
    },
    {
      icon: "cloud",
      color: "#3d8bff",
      style: "solid",
      title: "Fiber Internet for Business & Enterprise",
      description: "AT&T provides first-class business internet service with no data caps, no equipment fees, and no annual term...",
      linkText: "POWER REMOTE WORK",
    },
    {
      icon: "check",
      color: "#4caf50",
      style: "solid",
      title: "Cloud Solutions",
      description: "Businesses need to migrate to the cloud to stay competitive. We proudly offer AT&T end-to-end cloud-based designed to scale with your business...",
      linkText: "SECURE YOUR SPACES",
    },
    {
      icon: "shield-alt",
      color: "#f44336",
      style: "solid",
      title: "Cyber Securitys",
      description: "Our expertise in threat intelligence and network security will give your business unrivaled secure connectivity..",
      linkText: "OPTIMIZE YOUR SPACES",
    },
    {
      icon: "wifi",
      color: "#3e7bff",
      style: "solid",
      title: "AT&T",
      description: "Our team of experts will help you navigate the AT&T landscape while taking ownership of the pre and post sale processes.",
      linkText: "OPTIMIZE YOUR SPACES",
    },
    {
      icon: "globe",
      color: "#607d8b",
      style: "solid",
      title: "Internet & WAN Networking",
      description: "Discover the right network connectivity type for your SD-WAN solution. We specialize in simplifying...",
      linkText: "MAKE YOUR INTERNET"
    },
    {
      icon: "phone-alt",
      color: "#8bc34a",
      style: "solid",
      title: "Business Voice Solution",
      description: "AT&T Phone for Business is a voice service provided over an Internet Protocol (VOiP) digital connection that...",
      linkText: "GROW YOUR BUSINESS"
    }
  ];

  return (
    <>
      <div className="container pt-20 mx-auto">
        <h1 className="text-5xl px-4 font-medium text-center work-sans">
          Everything works better on a cloud- <br /> managed network.
        </h1>

        {/* For mobile, render Swiper with buttons; for desktop, render grid */}
        <div className="swiper-container px-4 xl:px-[120px] ">
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              1: {
                slidesPerView: 1, // Show 1 slide on small screens (mobile)
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2, // Show 2 slides on small tablets
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3, // Show 3 slides on medium screens
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4, // Show 4 slides on large screens (desktop)
                spaceBetween: 30,
              },
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="flex py-4 my-10 px-6 justify-center rounded-3xl transition-all hover:shadow-xl drop-shadow-xl items-center flex-col">
                  <div>
                    {/* Dynamically setting Font Awesome icon class */}
                    <i
                      className={`fa-${card.style} fa-${card.icon}`}
                      style={{ color: card.color, fontSize: "80px" }}
                    ></i>
                  </div>
                  <h1 className="text-[#3C3C3C] text-2xl font-semibold mt-4 text-center">
                    {card.title}
                  </h1>
                  <p className="inter text-center mt-2 font-light">{card.description}</p>
                  <a
                    href="#"
                    className="text-tron-blue text-base mt-6 font-semibold capitalize text-center"
                  >
                    {card.linkText} <i className="fa-solid -rotate-90 fa-chevron-down"></i>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Navigation Buttons (if needed for mobile) */}
        </div>

        <div>
          {/* Desktop Grid Layout */}
        </div>
      </div>
    </>
  );
};

export default Network;
