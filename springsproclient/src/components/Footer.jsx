import logo from "../assets/images/logo.svg"
const Footer = () => {

    return (<>
        <footer>
            <div className="container px-4 xl:px-[120px]  py-16 mx-auto">
                <div className="w-full  h-full">
                    <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-8 h-full items-start">
                        {/* Logo Section */}
                        <div className="w-full md:w-[20%] flex justify-center md:justify-start items-start">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 h-auto"
                            />
                        </div>
                        <div className=" w-full  sm:gap-x-6 gap-x-4 md:w-[80%] lg:w-[70%] h-full gap-y-10 grid-cols-2 grid md:grid-cols-3 ">
                            <div className="h-full gap-y-2.5 flex flex-col">
                                <h4 className="text-gray-600 font-poppins font-[400] tracking-wider">COMPANY</h4>
                                <div className="mt-1"></div>
                                <a href="#" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Home</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">About</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline mt-">First Responder</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Technology Solutions</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Wireless Account Management</a>
                            </div>
                            <div className="h-full gap-y-2.5 flex flex-col">
                                {/* <h2 className="text-gray-600  font-poppins font-[550] inter pb-6 tracking-wider">Technology Solutions</h2> */}
                                <h4 className="text-gray-600 font-poppins font-[400] tracking-wider">SOLUTIONS</h4>
                                <div className="mt-1"></div>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Cellular Service</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Fibre Internet</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Cloud Solutions</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">CyberSecurity</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">AT&T</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Internet & WAN Networking</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">Business Voice Solution</a>

                            </div>
                            <div className="h-full gap-y-2.5 flex flex-col">
                                {/* <h2 className="text-gray-600  font-poppins  font-[550] inter pb-6 tracking-wider">Contact Information</h2> */}
                                <h4 className="text-gray-600 font-poppins font-[400] tracking-wider">CONTACT</h4>
                                <div className="mt-1"></div>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline mt-">Contact Us</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">office@springsairns.com</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">(855) 525-0855</a>
                                <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[15px]  inter tracking-wider no-underline">33 Great Neck Rd. STE #7, Great Neck Plaza, NY 11021</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full  gap-y-4 flex sm:flex-row px-6 flex-col justify-between pt-5 border-t mt-20 border-gray-300">
                        <div className="flex gap-2.5 sm:gap-5 !text-xl ">
                            <i className="fa-brands text-gray-600 fa-facebook"></i>
                            <i className="fa-brands text-gray-600 fa-instagram"></i>
                            <i className="fa-brands text-gray-600 fa-linkedin"></i>
                            <i className="fa-brands text-gray-600 fa-youtube"></i>
                            <i className="fa-brands text-gray-600 fa-whatsapp"></i>
                        </div>
                        <div className="w-fit">
                            <h1 className="text-gray-600 inter font-[350] text-sm sm:text-[16px]">© 2024 Spring Air Network Solutions, Inc.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>)
}
export default Footer;