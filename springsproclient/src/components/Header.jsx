import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);  // Null means no modal is open
  const Section = useRef(null);
  const [showLogout, setshowLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(''); // State to store the username


  const getUsernameFromToken = () => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.role === "admin") { setUsername("Admin"); }
        if (decoded?.role === "user") { setUsername(decoded.username); }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };



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
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setshowLogout(true);
      getUsernameFromToken(); // Fetch and set the username
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
              <Link to={"/"} className="text-[#393939] text-sm font flex tracking-wide items-center gap-2 inter no-underline">Home</Link>
              <a href="#about" className="text-[#393939] text-sm font flex tracking-wide items-center gap-2 inter no-underline">About</a>

              {/* Modal Triggers */}
              <a
                href="#"
                className="text-[#393939] text-sm flex tracking-wide items-center gap-2 inter no-underline"
                onClick={() => openModal('technologies')}
              >
                Technologies
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>

              <a
                href="#"
                className="text-[#393939] text-sm flex tracking-wide items-center gap-2 inter no-underline"
                onClick={() => openModal('agency')}
              >
                First Responder Agency
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>

              <a
                href="#"
                className="text-[#393939] text-sm flex tracking-wide items-center gap-2 inter no-underline"
                onClick={() => openModal('management')}
              >
                Management
                <i className="fa-solid text-xs fa-chevron-down"></i>
              </a>
            </div>

            {/* // Buttons for order now, login, logout */}

            {/* <div className="flex w-[250px] justify-end items-center">
              <div>
                <Link
                  to={'/order-form/'}
                  style={{
                    background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                  }}
                  className="transition-all text-black hover:bg-black hover:text-white inter text-xs px-4 py-3 font-semibold rounded-3xl"
                >
                  ORDER NOW
                </Link>
              </div>
            </div> */}

            {
              !showLogout ? (
                <div className="flex w-[200px] justify-end items-center">
                  <Link
                    to={'/login'}
                    style={{
                      background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                    }}
                    className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                  >
                    LOGIN NOW
                  </Link>
                </div>
              )
                : (
                  <Menu as="div" className="relative inline-block text-left ml-2 mt-2">
                    <div>
                      <MenuButton
                        style={{
                          background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                        }}
                        className="inline-flex font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                      >
                        {username || "PROFILE"}
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 w-5 h-5 text-white" />
                      </MenuButton>
                    </div>

                    <Menu.Items
                      transition
                      className="dropdown-profile absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <a
                            href="/order-form"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                          >
                            Order Now
                          </a>
                        </MenuItem>

                        <MenuItem>
                          <a
                            href="/your-orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                          >
                            Previous Orders
                          </a>

                        </MenuItem>
                        <MenuItem>
                          <button
                            onClick={logout} // Replace with your actual logout function
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                          >
                            Logout
                          </button>
                        </MenuItem>

                        {username === "Admin" && (
                          <MenuItem>
                            <a
                              href="/admin-all-users"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                            >
                              Admin Dashboard
                            </a>

                          </MenuItem>
                        )}
                      </div>
                    </Menu.Items>
                  </Menu>
                )
            }


          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className='w-full flex bg-white lg:hidden fixed top-0 z-[1200] drop-shadow-lg'>
        <div className=" flex w-full container mx-auto items-center justify-between tex py-2.5 px-4">
          <div className="flex  items-center">
            <Link onClick={() => handleLinkClick("/")} to={"/"}>
              <img src={logo} className='w-[110px]' alt="" /></Link>
          </div>
          <div>
            <button onClick={toggleMobileNav} className="text-gray-600">
              <i className={`fa-solid ${isMobileNavOpen ? "fa-xmark" : "fa-bars"} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0  z-[100] right-0 w-full lg:hidden h-screen px-4 py-20 bg-black bg-opacity-50 transform transition-transform duration-300 ease-in-out ${isMobileNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex bg-white rounded-2xl h-auto flex-col gap-10 w-full">
          {/* <button onClick={toggleMobileNav} className="text-gray-600 mb-6">
            <i className="fa-solid fa-xmark  absolute top-10 right-10 text-2xl"></i>
          </button> */}

          <div className="py-6">
            <div className="flex flex-col gap-6 mb-6">
              {/* Main Navigation Links for Mobile */}
              <div className="flex flex-col">
                <div style={{ borderBottom: "2px solid #F2F2F2" }} className='pb-3'>
                  <Link onClick={() => handleLinkClick("/internet-wan")} to={"/"} className="text-black  text-md text-md font flex items-center px-4 no-underline">Home </Link>
                </div>
                <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                  <a href="#" className="text-black font flex tracking-wide items-center px-4 no-underline">About</a>
                </div>
                <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                  <a onClick={() => openModal('agencies')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                    First Responder Agency
                    <i className="fa-solid text-black text-xs fa-chevron-down"></i>
                  </a>
                </div>
                <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                  <a onClick={() => openModal('managements')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                    Wireless Wireline AC Management
                    <i className="fa-solid text-xs fa-chevron-down"></i>
                  </a>
                </div>
                <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                  <a onClick={() => openModal('technology')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                    Technologies
                    <i className="fa-solid text-xs fa-chevron-down"></i>
                  </a>
                </div>
                {/* </div>
              <div className="flex justify-center items-center"> */}
                {/* <a href="" className="font-light inter text-gray-600 text-sm">Contact Us</a> */}
                {/* <a href="" className="font-light inter text-gray-600 text-sm">Log In</a> */}
                {
                  !showLogout ? (
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="mx-4 mt-6 font-bold text-md text-white transition-all tracking-wider px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LOGIN NOW</Link>
                    </button>
                  )
                    : (
                      <Menu as="div" className="relative inline-block text-left ml-2 mt-2">
                        <div className="mx-3 pt-4">
                          <MenuButton
                            style={{
                              background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                            }}
                            className="inline-flex gap-24 font-bold text-md text-white transition-all tracking-wider px-8 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                          >
                            {username || "PROFILE"}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 w-5 h-5 text-white" />
                          </MenuButton>
                        </div>

                        <Menu.Items
                          transition
                          className="dropdown-profile absolute left-10 text-center z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <a
                                href="/order-form"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                              >
                                Order Now
                              </a>
                            </MenuItem>

                            <MenuItem>
                              <a
                                href="/your-orders"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                              >
                                Previous Orders
                              </a>

                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={logout} // Replace with your actual logout function
                                className="block w-full px-4 py-2  text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                              >
                                Logout
                              </button>
                            </MenuItem>
                            {username === "Admin" && (
                              <MenuItem>
                                <a
                                  href="/admin-all-users"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Admin Dashboard
                                </a>

                              </MenuItem>
                            )}
                          </div>
                        </Menu.Items>
                      </Menu>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal: First Responder Agency Solution */}
      {activeModal === 'agency' && (
        <div className="overflow-scroll">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
            <div className="relative w-full md:max-w-[1000px] max-h-[100vh] overflow-y-auto">
              <div className="md:hidden bg-white flex w-full container py-3 px-6 items-center justify-between">
                <div className="flex items-center">
                  <Link onClick={() => handleLinkClick("/")} to={"/"}>
                    <img src={logo} className='w-[105px]' alt="Logo" />
                  </Link>
                </div>
                <button
                  onClick={closeModal}
                  className="font-inter text-xs ml-auto text-black bg-red-600 hover:bg-red-800 rounded flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="h-full md:flex-row pt-3 px-3 flex-col flex w-full">
                <div className="w-full md:w-[450px]">
                  <div className="justify-end px-4 py-6 md:rounded-l-3xl md:rounded-tr-none gap-2 bg-tron-blue-200 flex flex-col md:h-[500px] w-full rounded-t-3xl">
                    <h3 className="text-center font-poppins text-[#393939] text-3xl font-medium">Agency</h3>
                    <p className="text-center font-poppins text-[#393939] font-light">Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                    </button>
                  </div>
                </div>
                <div className="bg-white w-full py-4 px-4 md:rounded-r-3xl overflow-y-auto max-h-[70vh] md:max-h-[none]">
                  <button
                    onClick={closeModal}
                    className="hidden md:block font-inter text-xs ml-auto bg-white p-1 text-black bg-red-600 hover:bg-red-800 rounded-full items-center justify-center"
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                  <div className="t m l-5 font-poppins w-full">
                    <h3 className="font-poppins text-[#393939]">Platform</h3>
                    <div className="w-full grid md:grid-cols-2 mt-2">
                      {/* First Item: Cellular Services for Business */}
                      <div className="flex gap-2 items-start mt-6">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid mt-1 text-[#393939] fa-mobile"></i> {/* Mobile phone icon */}
                        </div>
                        <div>
                          <Link to={"/first-net-mobility"}
                            className="text-[#393939] text-sm font-semibold tracking-wide no-underline"
                            onClick={() => handleLinkClick("/cellular-service")}>
                            First Net Mobility
                          </Link>
                          <p className="text-[14px] mt-1 font-light text-[#606060]">
                            Seamless and robust mobile connectivity solutions designed to ensure your business stays connected anywhere.
                          </p>
                        </div>
                      </div>

                      {/* Second Item: First Net IoT */}
                      <div className="flex gap-2 items-start mt-6">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid mt-1 text-[#393939] fa-cogs"></i> {/* Gear icon for IoT */}
                        </div>
                        <div>
                          <Link to={"/first-net-iot"}
                            className="text-[#393939] text-sm font-semibold tracking-wide no-underline"
                            onClick={() => handleLinkClick("/cellular-service")}>
                            First Net IoT
                          </Link>
                          <p className="text-[14px] mt-1 font-light text-[#606060]">
                            IoT-driven solutions enabling smarter operations with connected devices, sensors, and real-time data analytics.
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

      {activeModal === 'agencies' && (
        <div className="overflow-scroll">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
            <div className="relative w-full max-h-[100vh] overflow-y-auto py-6">
              <div className="md:hidden bg-white flex w-full container py-3 px-6 items-center justify-between">
                <div className="flex items-center">
                  <Link onClick={() => handleLinkClick("/")} to={"/"}>
                    <img src={logo} className='w-[105px]' alt="Logo" />
                  </Link>
                </div>
                <button
                  onClick={closeModal}
                  className="font-inter text-xs ml-auto text-black bg-red-600 hover:bg-red-800 rounded flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="md:flex-row py-3 px-3 flex-col flex w-full">
                <div className="w-full md:w-[450px] bg-white  rounded-2xl py-4">
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='pb-3'>
                    <Link onClick={() => handleLinkClick("/internet-wan")} to={"/"} className="text-black  text-md text-md font flex items-center px-4 no-underline">Home </Link>
                  </div>
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a href="#" className="text-black font flex tracking-wide items-center px-4 no-underline">About</a>
                  </div>
                  <div className="justify-end px-4 py-6 gap-2 bg-tron-blue-200 flex flex-col md:h-[500px] w-full">
                    <h3 className="text-center font-poppins text-[#393939] text-3xl font-medium">Agency</h3>
                    <p className="text-center font-poppins text-[#393939] font-light">Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="font-bold text-md text-white transition-all tracking-wider px-6 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                    </button>
                  </div>

                  <div className="bg-white w-full py-4 px-4 md:rounded-r-3xl overflow-y-auto max-h-[70vh] md:max-h-[none]">
                    <button
                      onClick={closeModal}
                      className="hidden md:block font-inter text-xs ml-auto bg-white p-1 text-black bg-red-600 hover:bg-red-800 rounded-full items-center justify-center"
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                    <div className="t m l-5 font-poppins w-full">
                      <h3 className="font-poppins text-[#393939]">Platform</h3>
                      <div className="w-full grid md:grid-cols-2 mt-2">
                        {/* First Item: Cellular Services for Business */}
                        <div className="flex gap-2 items-start mt-6">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid mt-1 text-[#393939] fa-mobile"></i> {/* Mobile phone icon */}
                          </div>
                          <div>
                            <Link to={"/first-net-mobility"}
                              className="text-[#393939] text-sm font-semibold tracking-wide no-underline"
                              onClick={() => handleLinkClick("/cellular-service")}>
                              First Net Mobility
                            </Link>
                            <p className="text-[14px] mt-1 font-light text-[#606060]">
                              Seamless and robust mobile connectivity solutions designed to ensure your business stays connected anywhere.
                            </p>
                          </div>
                        </div>

                        {/* Second Item: First Net IoT */}
                        <div className="flex gap-2 items-start mt-6">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid mt-1 text-[#393939] fa-cogs"></i> {/* Gear icon for IoT */}
                          </div>
                          <div>
                            <Link to={"/first-net-iot"}
                              className="text-[#393939] text-sm font-semibold tracking-wide no-underline"
                              onClick={() => handleLinkClick("/cellular-service")}>
                              First Net IoT
                            </Link>
                            <p className="text-[14px] mt-1 font-light text-[#606060]">
                              IoT-driven solutions enabling smarter operations with connected devices, sensors, and real-time data analytics.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ border: "2px solid #F2F2F2" }} className='py-3'>
                    <a onClick={() => openModal('managements')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                      Wireless Wireline AC Management
                      <i className="fa-solid text-xs fa-chevron-down"></i>
                    </a>
                  </div>
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a onClick={() => openModal('technology')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                      Technologies
                      <i className="fa-solid text-xs fa-chevron-down"></i>
                    </a>
                  </div>
                  {
                    !showLogout ? (
                      <button
                        style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                        className="mx-4 mt-6 font-bold text-md text-white transition-all tracking-wider px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                        <Link to={"/login"} className='text-white no-underline'>LOGIN NOW</Link>
                      </button>
                    )
                      : (
                        <Menu as="div" className="relative inline-block text-left ml-2 mt-2">
                          <div className="mx-3 pt-4">
                            <MenuButton
                              style={{
                                background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                              }}
                              className="inline-flex gap-24 font-bold text-md text-white transition-all tracking-wider px-8 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                            >
                              {username || "PROFILE"}
                              <ChevronDownIcon aria-hidden="true" className="-mr-1 w-5 h-5 text-white" />
                            </MenuButton>
                          </div>

                          <Menu.Items
                            transition
                            className="dropdown-profile absolute left-10 text-center z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <a
                                  href="/order-form"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Order Now
                                </a>
                              </MenuItem>

                              <MenuItem>
                                <a
                                  href="/your-orders"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Previous Orders
                                </a>

                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={logout} // Replace with your actual logout function
                                  className="block w-full px-4 py-2  text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Logout
                                </button>
                              </MenuItem>
                              {username === "Admin" && (
                                <MenuItem>
                                  <a
                                    href="/admin-all-users"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                  >
                                    Admin Dashboard
                                  </a>

                                </MenuItem>
                              )}

                            </div>
                          </Menu.Items>
                        </Menu>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'managements' && (
        <div className="overflow-scroll">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
            <div className="relative w-full max-h-[100vh] overflow-y-auto py-6">
              <div className="md:hidden bg-white flex w-full container py-3 px-6 items-center justify-between">
                <div className="flex items-center">
                  <Link onClick={() => handleLinkClick("/")} to={"/"}>
                    <img src={logo} className='w-[105px]' alt="Logo" />
                  </Link>
                </div>
                <button
                  onClick={closeModal}
                  className="font-inter text-xs ml-auto text-black bg-red-600 hover:bg-red-800 rounded flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="md:flex-row py-3 px-3 flex-col flex w-full">
                <div className="w-full md:w-[450px] bg-white  rounded-2xl py-4">
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='pb-3'>
                    <Link onClick={() => handleLinkClick("/internet-wan")} to={"/"} className="text-black  text-md text-md font flex items-center px-4 no-underline">Home </Link>
                  </div>
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a href="#" className="text-black font flex tracking-wide items-center px-4 no-underline">About</a>
                  </div>

                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a onClick={() => openModal('agencies')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                      First Responder Agency
                      <i className="fa-solid text-xs fa-chevron-down"></i>
                    </a>
                  </div>

                  <div className="justify-end px-4 py-6 gap-2 bg-tron-blue-200 flex flex-col md:h-[500px] w-full">
                    <h3 className="text-center font-poppins text-[#393939] text-3xl font-medium">Management</h3>
                    <p className="text-center font-poppins text-[#393939] font-light">Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="font-bold text-md text-white transition-all tracking-wider px-6 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                    </button>
                  </div>

                  <div className="bg-white w-full py-4 px-4 md:rounded-r-3xl overflow-y-auto max-h-[70vh] md:max-h-[none]">
                    <button
                      onClick={closeModal}
                      className="hidden md:block font-inter text-xs ml-auto bg-white p-1 text-black bg-red-600 hover:bg-red-800 rounded-full items-center justify-center"
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                    <div className="t m l-5 font-poppins w-full">
                      <h3 className="font-poppins text-[#393939]">Platform</h3>
                      <div className="w-full grid md:grid-cols-2 mt-2">
                        {/* First Item: Cellular Services for Business */}
                        <div className="flex gap-2 items-start mt-6">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid mt-1 text-[#393939] fa-mobile"></i> {/* Mobile phone icon */}
                          </div>
                          <div>
                            <Link
                              to={"/bills-and-services"}
                              className='text-[#393939] font-semibold text-sm tracking-normal no-underline'
                              onClick={() => handleLinkClick("/fibre-internet")}
                            >
                              Bills
                            </Link>
                            <p className='text-[14px] mt-1 font-light text-[#606060]'>
                              Comprehensive analysis of your business’s billing and service usage to optimize costs and improve efficiency.
                            </p>
                          </div>
                        </div>

                        {/* Second Item: First Net IoT */}
                        <div className="flex gap-2 items-start mt-6">
                          <div className="flex items-center gap-2">
                            <i className="fa-solid mt-1 text-[#393939] fa-cogs"></i> {/* Gear icon for IoT */}
                          </div>
                          <div>
                            <Link
                              to={"/bills-and-services"}
                              className='text-[#393939] font-semibold text-sm tracking-normal no-underline'
                              onClick={() => handleLinkClick("/fibre-internet")}
                            >
                              Services
                            </Link>
                            <p className='text-[14px] mt-1 font-light text-[#606060]'>
                              Comprehensive analysis of your business’s billing and service usage to optimize costs and improve efficiency.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ border: "2px solid #F2F2F2" }} className='py-3'>
                    <a onClick={() => openModal('technology')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                      Technologies
                      <i className="fa-solid text-xs fa-chevron-down"></i>
                    </a>
                  </div>
                  {
                    !showLogout ? (
                      <button
                        style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                        className="mx-4 mt-6 font-bold text-md text-white transition-all tracking-wider px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                        <Link to={"/login"} className='text-white no-underline'>LOGIN NOW</Link>
                      </button>
                    )
                      : (
                        <Menu as="div" className="relative inline-block text-left ml-2 mt-2">
                          <div className="mx-3 pt-4">
                            <MenuButton
                              style={{
                                background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                              }}
                              className="inline-flex gap-24 font-bold text-md text-white transition-all tracking-wider px-8 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                            >
                              {username || "PROFILE"}
                              <ChevronDownIcon aria-hidden="true" className="-mr-1 w-5 h-5 text-white" />
                            </MenuButton>
                          </div>

                          <Menu.Items
                            transition
                            className="dropdown-profile absolute left-10 text-center z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <a
                                  href="/order-form"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Order Now
                                </a>
                              </MenuItem>

                              <MenuItem>
                                <a
                                  href="/your-orders"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Previous Orders
                                </a>

                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={logout} // Replace with your actual logout function
                                  className="block w-full px-4 py-2  text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Logout
                                </button>
                              </MenuItem>
                              {username === "Admin" && (
                                <MenuItem>
                                  <a
                                    href="/admin-all-users"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                  >
                                    Admin Dashboard
                                  </a>

                                </MenuItem>
                              )}
                            </div>
                          </Menu.Items>
                        </Menu>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'management' && (
        <div className="overflow-scroll">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
            <div className="relative w-full md:max-w-[1000px] max-h-[100vh] overflow-y-auto">
              <div className="md:hidden bg-white flex w-full container py-3 px-6 items-center justify-between">
                <div className="flex items-center">
                  <Link onClick={() => handleLinkClick("/")} to={"/"}>
                    <img src={logo} className='w-[105px]' alt="Logo" />
                  </Link>
                </div>
                <button
                  onClick={closeModal}
                  className="font-inter text-xs ml-auto text-black bg-red-600 hover:bg-red-800 rounded flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="h-full md:flex-row pt-3 px-3 flex-col flex w-full">
                <div className="w-full md:w-[450px]">
                  <div className="justify-end px-4 py-6 md:rounded-l-3xl md:rounded-tr-none gap-2 bg-tron-blue-200 flex flex-col md:h-[500px] w-full rounded-t-3xl">
                    <h3 className="text-center font-poppins text-[#393939] text-3xl font-medium">Management</h3>
                    <p className="text-center font-poppins text-[#393939] font-light">Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                    </button>
                  </div>
                </div>
                <div className="bg-white w-full py-4 px-4 md:rounded-r-3xl overflow-y-auto max-h-[70vh] md:max-h-[none]">
                  <button
                    onClick={closeModal}
                    className="hidden md:block font-inter text-xs ml-auto bg-white p-1 text-black bg-red-600 hover:bg-red-800 rounded-full items-center justify-center"
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                  <div className="t m l-5 font-poppins w-full">
                    <h3 className="font-poppins text-[#393939]">Platform</h3>
                    <div className="w-full grid md:grid-cols-2 mt-2">
                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-file-invoice'></i> {/* Invoice icon */}
                        </div>
                        <div>
                          <Link
                            to={"/bills-and-services"}
                            className='text-[#393939] font-semibold text-sm tracking-normal no-underline'
                            onClick={() => handleLinkClick("/fibre-internet")}
                          >
                            Bills
                          </Link>
                          <p className='text-[14px] mt-1 font-light text-[#606060]'>
                            Comprehensive analysis of your business’s billing and service usage to optimize costs and improve efficiency.
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-file-invoice'></i> {/* Invoice icon */}
                        </div>
                        <div>
                          <Link
                            to={"/bills-and-services"}
                            className='text-[#393939] font-semibold text-sm tracking-normal no-underline'
                            onClick={() => handleLinkClick("/fibre-internet")}
                          >
                            Services
                          </Link>
                          <p className='text-[14px] mt-1 font-light text-[#606060]'>
                            Comprehensive analysis of your business’s billing and service usage to optimize costs and improve efficiency.
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

      {activeModal === 'technology' && (
        <div className="overflow-scroll">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
            <div className="relative w-full max-h-[100vh] overflow-y-auto py-6">
              <div className="md:hidden bg-white flex w-full container py-3 px-6 items-center justify-between">
                <div className="flex items-center">
                  <Link onClick={() => handleLinkClick("/")} to={"/"}>
                    <img src={logo} className='w-[105px]' alt="Logo" />
                  </Link>
                </div>
                <button
                  onClick={closeModal}
                  className="font-inter text-xs ml-auto text-black bg-red-600 hover:bg-red-800 rounded flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="md:flex-row py-3 px-3 flex-col flex w-full">
                <div className="w-full md:w-[450px] bg-white  rounded-2xl py-4">
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='pb-3'>
                    <Link onClick={() => handleLinkClick("/internet-wan")} to={"/"} className="text-black  text-md text-md font flex items-center px-4 no-underline">Home </Link>
                  </div>
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a href="#" className="text-black font flex tracking-wide items-center px-4 no-underline">About</a>
                  </div>

                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a onClick={() => openModal('agencies')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                      First Responder Agency
                      <i className="fa-solid text-xs fa-chevron-down"></i>
                    </a>
                  </div>
                  <div style={{ borderBottom: "2px solid #F2F2F2" }} className='py-3'>
                    <a onClick={() => openModal('managements')} className="text-black text-md font flex justify-between items-center px-4 no-underline">
                      Wireless Wireline AC MAnagement
                      <i className="fa-solid text-xs fa-chevron-down"></i>
                    </a>
                  </div>

                  <div className="justify-end px-4 py-6 gap-2 bg-tron-blue-200 flex flex-col md:h-[500px] w-full">
                    <h3 className="text-center font-poppins text-[#393939] text-3xl font-medium">Technologies</h3>
                    <p className="text-center font-poppins text-[#393939] font-light">Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="font-bold text-md text-white transition-all tracking-wider px-6 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                    </button>
                  </div>

                  <div className="bg-white w-full pt-4 px-4 md:rounded-r-3xl overflow-y-auto">
                    <button
                      onClick={closeModal}
                      className="hidden md:block font-inter text-xs ml-auto bg-white p-1 text-black bg-red-600 hover:bg-red-800 rounded-full items-center justify-center"
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                    <div className="t m l-5 font-poppins w-full">
                      <h3 className="font-poppins text-[#393939]">Platform</h3>
                      <div className="w-full h-full grid md:grid-cols-2 mt-2">
                        <div className='flex gap-2 items-start mt-6'>
                          <div className='flex items-center gap-2'>
                            <i className='fa-solid mt-1 text-[#393939] fa-computer'></i> {/* Signal icon */}
                          </div>
                          <div>
                            <Link
                              to={"/cellular-service"}
                              className='text-[#393939] text-sm tracking-normal no-underline'
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
                              className='text-[#393939] text-sm tracking-normal no-underline'
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
                              className='text-[#393939] text-sm tracking-normal no-underline'
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
                              className='text-[#393939] text-sm tracking-normal no-underline'
                              onClick={() => handleLinkClick("/cyber-security")}
                            >
                              Cybersecurity AT&T
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
                              className='text-[#393939] text-sm tracking-normal no-underline'
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
                              className='text-[#393939] text-sm tracking-normal no-underline'
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
                  {
                    !showLogout ? (
                      <button
                        style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                        className="mx-4 mt-6 font-bold text-md text-white transition-all tracking-wider px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                        <Link to={"/login"} className='text-white no-underline'>LOGIN NOW</Link>
                      </button>
                    )
                      : (
                        <Menu as="div" className="relative inline-block text-left ml-2 mt-2">
                          <div className="mx-3 pt-4">
                            <MenuButton
                              style={{
                                background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                              }}
                              className="inline-flex gap-24 font-bold text-md text-white transition-all tracking-wider px-8 py-2.5 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                            >
                              {username || "PROFILE"}
                              <ChevronDownIcon aria-hidden="true" className="-mr-1 w-5 h-5 text-white" />
                            </MenuButton>
                          </div>

                          <Menu.Items
                            transition
                            className="dropdown-profile absolute left-10 text-center z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <a
                                  href="/order-form"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Order Now
                                </a>
                              </MenuItem>

                              <MenuItem>
                                <a
                                  href="/your-orders"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Previous Orders
                                </a>

                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={logout} // Replace with your actual logout function
                                  className="block w-full px-4 py-2  text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                >
                                  Logout
                                </button>
                              </MenuItem>
                              {username === "Admin" && (
                                <MenuItem>
                                  <a
                                    href="/admin-all-users"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 no-underline"
                                  >
                                    Admin Dashboard
                                  </a>

                                </MenuItem>
                              )}
                            </div>
                          </Menu.Items>
                        </Menu>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'technologies' && (
        <div className="overflow-scroll" id="platform">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[2900]">
            <div className="relative w-full md:max-w-[1000px] max-h-[100vh] overflow-y-auto">
              <div className="md:hidden bg-white flex w-full container py-3 px-6 items-center justify-between">
                <div className="flex items-center">
                  <Link onClick={() => handleLinkClick("/")} to={"/"}>
                    <img src={logo} className='w-[105px]' alt="Logo" />
                  </Link>
                </div>
                <button
                  onClick={closeModal}
                  className="font-inter text-xs ml-auto text-black bg-red-600 hover:bg-red-800 rounded flex items-center justify-center"
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <div className="h-full md:flex-row pt-3 px-3 flex-col flex w-full">
                <div className="w-full md:w-[450px]">
                  <div className="justify-end px-4 py-6 md:rounded-l-3xl md:rounded-tr-none gap-2 bg-tron-blue-200 flex flex-col md:h-[500px] w-full rounded-t-3xl">
                    <h3 className="text-center font-poppins text-[#393939] text-3xl font-medium">Technologies</h3>
                    <p className="text-center font-poppins text-[#393939] font-light">Deliver exceptional experiences to people, places, and things with best-in-class Meraki technologies.</p>
                    <button
                      style={{ background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)" }}
                      className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-105 hover:shadow-lg hover:bg-transparent">
                      <Link to={"/login"} className='text-white no-underline'>LEARN MORE</Link>
                    </button>
                  </div>
                </div>
                <div className="bg-white w-full py-4 px-4 md:rounded-r-3xl overflow-y-auto max-h-[70vh] md:max-h-[none]">
                  <button
                    onClick={closeModal}
                    className="hidden md:block font-inter text-xs ml-auto bg-white p-1 text-black bg-red-600 hover:bg-red-800 rounded-full items-center justify-center"
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                  <div className="t m l-5 font-poppins w-full">
                    <h3 className="font-poppins text-[#393939]">Platform</h3>
                    <div className="w-full grid md:grid-cols-2 mt-2">


                      <div className='flex gap-2 items-start mt-6'>
                        <div className='flex items-center gap-2'>
                          <i className='fa-solid mt-1 text-[#393939] fa-computer'></i> {/* Signal icon */}
                        </div>
                        <div>
                          <Link
                            to={"/cellular-service"}
                            className='text-[#393939] text-sm tracking-normal no-underline'
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
                            className='text-[#393939] text-sm tracking-normal no-underline'
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
                            className='text-[#393939] text-sm tracking-normal no-underline'
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
                            className='text-[#393939] text-sm tracking-normal no-underline'
                            onClick={() => handleLinkClick("/cyber-security")}
                          >
                            Cybersecurity AT&T
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
                            className='text-[#393939] text-sm tracking-normal no-underline'
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
                            className='text-[#393939] text-sm tracking-normal no-underline'
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
