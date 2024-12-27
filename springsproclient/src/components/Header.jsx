import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import logo from "../assets/images/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);  // Null means no modal is open
  const Section = useRef(null);
  const [showLogout, setshowLogout] = useState(false);


  // Initialize useNavigate hook

  // Toggle mobile navigation
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Function to open the modal
  const openModal = (modal) => {
    setActiveModal(modal);
  };

  // Function to close the modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // Handle scroll event to toggle "fixed" class
  const SectionScroll = () => {
    if (Section.current) {
      if (window.scrollY > 25) {
        Section.current.classList.remove("absolute");
        Section.current.classList.add("fixed");
        //Section.current.classList.add("top-[-42px]");
      } else {
        Section.current.classList.remove("fixed");
        //Section.current.classList.remove("top-[-42px]");
        Section.current.classList.add("absolute");
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
  const token =  localStorage.getItem("jwt_token");
  if (token) {
    setshowLogout(true);
  }
    
    window.addEventListener("scroll", SectionScroll);
    return () => {
      window.removeEventListener("scroll", SectionScroll);
    };
  }, []);

  // Function to handle link clicks inside modal (navigate and close modal)
  const handleLinkClick = (path) => {
    closeModal();
    setIsMobileNavOpen(); // Close the modal when the link is clicked
    // Navigate to the clicked link's path
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setshowLogout(false); // Update the state to reflect that the user is logged out
    navigate("/login"); // Navigate to the login page
    window.location.reload();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div ref={Section} style={{ transition: "all ease 1s" }} className="w-full  absolute z-[100] bg-white drop-shadow-lg">
        <div className="lg:flex hidden px-4  xl:px-[120px] container bg-white mx-auto flex-col w-full">
          {/* <div className="w-full gap-6 flex justify-end">
            <div className="flex gap-4 inter font-light text-sm">
              <a href="">General Partner</a>
              <a href="">New Partner</a>
            </div>

            <div className="flex items-center gap-4">
              <a className="font-light inter text-gray-600 text-sm" href="">Contact Us</a>
              <a className="font-light inter text-gray-600 text-sm" href="">Log In</a>
            </div>
          </div> */}
          <div className="w-full py-1 items-center bg-white top-0 flex ">
            <div className="flex xl:py-0 py-2 items-center">
              <Link to={"/"}>< img src={logo} className="w-fit md:h-20" alt="" /></Link>
            </div>
            <div className="w-full flex-wrap h-fit  text-sm justify-center  gap-6 flex items-center ">
              <Link to={"/"} className="text-[#393939] text-sm font flex tracking-wide items-center gap-2 inter">Home</Link>
              <a href="#" className="text-[#393939] text-sm font flex tracking-wide items-center gap-2 inter">About</a>

              {/* Modal Triggers */}
              <a
                href="#"
                className="text-[#393939] text-sm flex tracking-wide items-center gap-2 inter"
                onClick={() => openModal('technologies')}
              >
                Technologies
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>

              <a
                href="#"
                className="text-[#393939] text-sm flex tracking-wide items-center gap-2 inter"
                onClick={() => openModal('agency')}
              >
                First Responder Agency
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>

              <a
                href="#"
                className="text-[#393939] text-sm flex tracking-wide items-center gap-2 inter"
                onClick={() => openModal('management')}
              >
                Management
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>
            </div>
            
            <div className="flex w-[200px] justify-end items-center">
              <div>
                <Link to={'/order-form/'}
                  style={{
                    background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                  }}
                  className="transition-all  text-black hover:bg-black hover:text-white inter text-xs px-4 py-3 font-semibold rounded-3xl"
                >
                  ORDER NOW
                </Link>
              </div>
            </div>
           {
            !showLogout ? (
              <div className="flex w-[200px] justify-end items-center">
              <div>
                <Link to={'/login'}
                  style={{
                    background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                  }}
                  className="transition-all  text-black hover:bg-black hover:text-white inter text-xs px-4 py-3 font-semibold rounded-3xl"
                >
                  LOGIN NOW
                </Link>
              </div>
            </div>
            )
            : (
              <>
              <div className="flex w-[180px] justify-end items-center">            
              <div>
                <Link onClick={logout}
                   style={{
                    background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                  }}
                  className="transition-all  text-black hover:bg-black hover:text-white inter text-xs px-4 py-3 font-semibold rounded-3xl"
                >
                  LOGOUT
                </Link>
              </div>
            </div>


            

              </>

            
            )
           }
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className='w-full flex bg-white lg:hidden fixed top-0 z-[1200] drop-shadow-lg'>
        <div className=" flex w-full container mx-auto   items-center justify-between tex py-6 px-4">
          <div className="flex  items-center">
           <Link onClick={() => handleLinkClick("/")}  to={"/"}>
           <img src={logo} className='w-[125px]' alt="" /></Link>
          </div>
          <div>
            <button onClick={toggleMobileNav} className="text-gray-600">
              <i className={`fa-solid ${isMobileNavOpen ? "fa-xmark" : "fa-bars"} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0  z-[100] right-0 w-full lg:hidden h-screen bg-white transform transition-transform duration-300 ease-in-out ${isMobileNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-screen items-center justify-center gap-10 p-6 w-full">
          <button onClick={toggleMobileNav} className="text-gray-600 mb-6">
            <i className="fa-solid fa-xmark  absolute top-10 right-10 text-2xl"></i>
          </button>

          <div className="w-fit">
            <div className="flex flex-col justify-start gap-6 mb-6">
              {/* Upper Section in Mobile */}
              <div className="flex w-fit items-baseline gap-2 justify-center inter font-light text-sm">
                <i className="fa-solid text-tron-blue fa-globe"></i>
                <h4 className="text-gray-600">United States (English)</h4>
                <i className="fa-solid text-tron-blue fa-caret-down"></i>
              </div>
              <div className="flex w-fit justify-center items-center gap-4">
                <a href="" className="font-light inter text-gray-600 text-sm">Contact Us</a>
                <a href="" className="font-light inter text-gray-600 text-sm">Log In</a>
              </div>
            </div>

            {/* Main Navigation Links for Mobile */}
            <div className="flex w-fit justify-center items-start flex-col gap-6 mb-6">
              <Link onClick={() => handleLinkClick("/internet-wan")} to={"/"} className="text-gray-700 font flex tracking-wide items-center gap-2 inter">Home </Link>
              <a href="#" className="text-gray-700 font flex tracking-wide items-center gap-2 inter">About   </a>
              <button onClick={() => openModal('agency')} className="text-gray-700 font flex tracking-wide items-center gap-2 inter">
                First Responder Agency
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </button>
              <a onClick={() => openModal('management')} className="text-gray-700 flex tracking-wide items-center gap-2 inter">
                Wireless Wireline AC Management
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>
              <button onClick={() => openModal('technologies')} className="text-gray-700 flex tracking-wide items-center gap-2 inter">
                Technologies
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </button>
            </div>

            {/* "GET A DEMO" Button at the Bottom */}
            <div className="w-fit justify-center items-center mt-4">
            <Link to={"/order-form/"} onClick={() => handleLinkClick("/order-form/")} 
                  style={{
                    background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                  }}
                  className="transition-all  text-black hover:bg-black hover:text-white inter text-xs px-4 py-3 font-semibold rounded-3xl"
                >
                  ORDER NOW
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: First Responder Agency Solution */}
      {activeModal === 'agency' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
          <div className="bg-white mx-4 relative rounded-xl w-full max-w-[1000px]">
            <button
              onClick={closeModal}
              className="mt-4 font-inter text-xl absolute top-0 right-10 text-black bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
            >
              <i className="fa-solid fa-x"></i>
            </button>
            <div className='h-full md:flex-row flex-col flex w-full'>
              <div className='w-full md:w-[450px]'>
                <div className='justify-end pr-2 pl-6 py-10 md:rounded-r-none rounded-r-xl rounded-l-xl gap-5 bg-tron-blue-200 flex flex-col md:h-[500px] w-full'>
                  <h1 className='font-poppins text-[#393939] text-3xl font-medium'>Agency</h1>
                  <p className='font-poppins text-[#393939] font-light'>Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                  <button className='w-fit font-poppins text-white hover:bg-transparent border border-[#b54718] transition-all hover:text-[#b54718] bg-[#b54718] px-6 py-3 text-lg font-medium rounded-full '>LEARN MORE</button>
                </div>
              </div>
              <div className='w-full  md:py-0 py-4 px-4'>
                <div className=' pt-10 t m l-5 font-poppins ] w w-full'>
                  <h1 className='font-poppins text-gray-400 border-b border-[#9e9e9e]'>Platform</h1>
                  <div className='w-full grid md:grid-cols-2 mt-6 '>
                    {/* First Item: Cellular Services for Business */}
                    <div className='flex gap-2 items-start mt-6'>
                      <div className='flex items-center gap-2'>
                        <i className='fa-solid mt-1 text-[#393939] fa-mobile'></i> {/* Mobile phone icon */}
                      </div>
                      <div>
                      <Link to={"/first-net-mobility"}
                            className='text-[#393939] text-sm font-semibold tracking-wide'
                            onClick={() => handleLinkClick("/cellular-service")}>
                          First Net Mobility
                        </Link>
                        <p className='text-[14px] mt-1 font-light text-[#606060]'>
                          Seamless and robust mobile connectivity solutions designed to ensure your business stays connected anywhere.
                        </p>
                      </div>
                    </div>

                    {/* Second Item: First Net IoT */}
                    <div className='flex gap-2 items-start mt-6'>
                      <div className='flex items-center gap-2'>
                        <i className='fa-solid mt-1 text-[#393939] fa-cogs'></i> {/* Gear icon for IoT */}
                      </div>
                      <div>
                        <Link to={"/first-net-iot"}
                            className='text-[#393939] text-sm font-semibold tracking-wide'
                            onClick={() => handleLinkClick("/cellular-service")}>
                          First Net IoT
                        </Link>
                        <p className='text-[14px] mt-1 font-light text-[#606060]'>
                          IoT-driven solutions enabling smarter operations with connected devices, sensors, and real-time data analytics.
                        </p>
                      </div>
                    </div>


                  </div>
                  {/* <span className='text-gray-400 font-poppins border-b border-[#9e9e9e] w w-full'>Platform</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Wireless/Wireline A/C Management */}
      {activeModal === 'management' && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-[2090]">
          <div className="bg-white relative md:mx-0  mx-4 rounded-xl w-full max-w-[1000px]">
            <button
              onClick={closeModal}
              className="mt-4 font-inter text-xl absolute top-0 right-10 text-black bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
            >
              <i className="fa-solid fa-x"></i>
            </button>
            <div className='h-full flex md:flex-row flex-col w-full'>
              <div className='w-full  md:w-[450px]'>
                <div className='justify-end pr-2 pl-6 py-5 md:py-10 md:rounded-r-none rounded-r-xl rounded-l-xl gap-5 bg-tron-blue-200 flex flex-col md:h-[500px] w-full'>
                  <h1 className='font-poppins text-[#393939] text-3xl font-medium'>Management</h1>
                  <p className='font-poppins text-[#393939] font-light'>Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                  <button className='w-fit font-poppins text-white hover:bg-transparent border border-[#b54718] transition-all hover:text-[#b54718] bg-[#b54718] px-6 py-3 text-lg font-medium rounded-full '>LEARN MORE</button>
                </div>
              </div>
              <div className='w-full  md:py-0 py-4 px-4'>
                <div className=' pt-10 t m l-5 font-poppins ] w w-full'>
                  <h1 className='font-poppins text-gray-400 border-b border-[#9e9e9e]'>Platform</h1>
                  <div className='w-full grid md:grid-cols-2 mt-6 '>
                    {/* First Item: Cellular Services for Business */}

                    <div className='flex gap-2 items-start mt-6'>
                      <div className='flex items-center gap-2'>
                        <i className='fa-solid mt-1 text-[#393939] fa-file-invoice'></i> {/* Invoice icon */}
                      </div>
                      <div>
                      <Link
                            to={"/bills-and-services"}
                            className='text-[#393939] font-semibold text-sm tracking-normal'
                            onClick={() => handleLinkClick("/fibre-internet")}
                          >
                            Bill And Services
                          </Link>
                        <p className='text-[14px] mt-1 font-light text-[#606060]'>
                          Comprehensive analysis of your business’s billing and service usage to optimize costs and improve efficiency.
                        </p>
                      </div>
                    </div>


                  </div>
                  {/* <span className='text-gray-400 font-poppins border-b border-[#9e9e9e] w w-full'>Platform</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modals */}
      {/* Modal: Technologies Solution */}
      {activeModal === 'technologies' && (
        <div className="fixed   overflow-scroll inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[3090]">
          <div className=' m-4  md:m-0 md:h-auto h-screen relative rounded-xl w-[1000px]'>
            <div className='bg-white  my-4 rounded-xl'>
              <button
                onClick={closeModal}
                className="mt-4 font-inter text-xl absolute top-4# right-10 text-black bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
              >
                <i className="fa-solid fa-x"></i>
              </button>
              <div className='h-full flex md:flex-row flex-col w-full'>
                <div className='w-full  md:w-[450px]'>
                  <div className='justify-end pr-2 pl-6 py-10 rounded-t-xl md:rounded-l-xl gap-5 bg-tron-blue-200 flex flex-col md:h-[500px] w-full'>
                    <h1 className='font-poppins text-[#393939] text-3xl font-medium'>Technologies</h1>
                    <p className='font-poppins text-[#393939] font-light'>Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button className='w-fit font-poppins text-white hover:bg-transparent border border-[#b54718] transition-all hover:text-[#b54718] bg-[#b54718] px-6 py-3 text-lg font-medium rounded-full '>LEARN MORE</button>
                  </div>
                </div>
                <div className='w-full px-4'>
                  <div className=' pt-10 t m l-5 font-poppins ] w w-full'>
                    <h1 className='font-poppins text-gray-400 border-b border-[#9e9e9e]'>Platform</h1>
                    <div className='w-full grid grid-cols-2 mt-6 '>
                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-computer'></i> {/* Signal icon */}
                        </div>
                        <div>
                          <Link
                            to={"/cellular-service"}
                            className='text-[#393939] text-sm tracking-normal'
                            onClick={() => handleLinkClick("/cellular-service")}
                          >
                            Cellular Services for Business
                          </Link>
                          <p className='text-[13px] mt-1 font-light text-[#393939]'>
                            Fast, secure, and reliable fibre-optic internet solutions tailored for businesses and enterprises.
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-signal'></i> {/* Signal icon */}
                        </div>
                        <div>
                          <Link
                            to={"/fibre-internet"}
                            className='text-[#393939] text-sm tracking-normal'
                            onClick={() => handleLinkClick("/fibre-internet")}
                          >
                            Fibre Internet for Business & Enterprise
                          </Link>
                          <p className='text-[13px] mt-1 font-light text-[#393939]'>
                            Fast, secure, and reliable fibre-optic internet solutions tailored for businesses and enterprises.
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-cloud'></i> {/* Cloud icon */}
                        </div>
                        <div>
                          <Link
                            to={"/cloud-solution"}
                            className='text-[#393939] text-sm tracking-normal'
                            onClick={() => handleLinkClick("/cloud-solution")}
                          >
                            Cloud Solution
                          </Link>
                          <p className='text-[13px] mt-1 font-light text-[#393939]'>
                            Scalable and secure cloud services for businesses, including data storage, backup, and cloud computing.
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-shield-alt'></i> {/* Shield icon */}
                        </div>
                        <div>
                          <Link
                            to={"/cyber-security"}
                            className='text-[#393939] text-sm tracking-normal'
                            onClick={() => handleLinkClick("/cyber-security")}
                          >
                            Cyber Security AT&T
                          </Link>
                          <p className='text-[13px] mt-1 font-light text-[#393939]'>
                            Advanced security solutions by AT&T to protect your business from cyber threats and ensure data safety.
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-network-wired'></i> {/* Wired network icon */}
                        </div>
                        <div>
                          <Link
                            to={"/internet-wan"}
                            className='text-[#393939] text-sm tracking-normal'
                            onClick={() => handleLinkClick("/internet-wan")}
                          >
                            Internet & WAN Networking
                          </Link>
                          <p className='text-[13px] mt-1 font-light text-[#393939]'>
                            High-performance Internet and WAN solutions to connect your business with global networks seamlessly.
                          </p>
                        </div>
                      </div>

                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-phone'></i> {/* Phone icon */}
                        </div>
                        <div>
                          <Link
                            to={"/business-voice"}
                            className='text-[#393939] text-sm tracking-normal'
                            onClick={() => handleLinkClick("/business-voice")}
                          >
                            Business Voice Solution
                          </Link>
                          <p className='text-[13px] mt-1 font-light text-[#393939]'>
                            Enhance communication with unified voice solutions designed for businesses, including VoIP and PBX services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
