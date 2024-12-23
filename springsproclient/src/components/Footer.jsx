import logo from "../assets/images/logo.svg"
const Footer = () => {

    return(<>
    <footer>
        <div className="container px-4 xl:px-[120px]  py-10 mx-auto">
            <div className="w-full  h-full">
                <div className="flex sm:pl-0    md:flex-row gap-y-14 flex-col  h-full">
                    <div className="w-full md:w-[20%] lg:w-[30%]  flex items-start justify-center md:justify-start">
                        <img src={logo} className="w-[200px]" alt="" />
                    </div>
                    <div className=" w-full  sm:gap-x-6 gap-x-4 md:w-[80%] lg:w-[70%] h-full gap-y-10 grid-cols-2 grid md:grid-cols-3 ">
                        <div className="h-full gap-1 flex flex-col">
                            <h1 className="text-gray-600  font-poppins  font-[350] inter pb-6 tracking-wider">Quick Links</h1>
                            <a href="#" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Home</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider ">About</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider mt-">First Responder Agency Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider mt-">Technology Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider mt-">Wireless Account Management</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider mt-">Contact</a>
                        </div>
                        <div className="h-full gap-1 flex flex-col">
                            <h1 className="text-gray-600  font-poppins  font-[350] inter pb-6 tracking-wider">Technology Solutions</h1>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Cellular Service for Business</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Fibre Internet for Business & Enterprise</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Cloud Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">CyberSecurity</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">AT&T</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Internet & WAN Networking</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Business Voice Solution</a>

                        </div>
                        <div className="h-full gap-1 flex flex-col">
                            <h1 className="text-gray-600  font-poppins  font-[350] inter pb-6 tracking-wider">Contact Information</h1>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Cellular Service for Business</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Fibre Internet for Business & Enterprise</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">Cloud Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">info@springsairns.com</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">212-991-8442</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider">90 Hausman St, Brooklyn NY 11222</a>



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
                    <div className="w-fit  text-gray-600  inter font-light tracking-wide text-sm">
                        <h1>© 2024 SpringsAirNS, Inc.</h1>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>)}
export default Footer;