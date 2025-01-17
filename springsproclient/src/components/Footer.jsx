import logo from "../assets/images/logo.svg"
const Footer = () => {

    return(<>
    <footer>
        <div className="container px-4 xl:px-[120px]  py-16 mx-auto">
            <div className="w-full  h-full">
                <div className="flex sm:pl-0    md:flex-row gap-y-14 flex-col  h-full">
                    <div className="w-full md:w-[10%] lg:w-[25%]  flex items-start justify-center md:justify-start">
                        <img src={logo} className="w-[200px]" alt="" />
                    </div>
                    <div className=" w-full  sm:gap-x-6 gap-x-4 md:w-[80%] lg:w-[70%] h-full gap-y-10 grid-cols-2 grid md:grid-cols-3 ">
                        <div className="h-full gap-2 flex flex-col">
                            <h2 className="text-gray-600  font-poppins font-[550] inter tracking-wider">Quick Links</h2>
                            <a href="#" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Home</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">About</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline mt-">First Responder Agency Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Technology Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Wireless Account Management</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline mt-">Contact</a>
                        </div>
                        <div className="h-full gap-2 flex flex-col">
                            {/* <h2 className="text-gray-600  font-poppins font-[550] inter pb-6 tracking-wider">Technology Solutions</h2> */}
                            <h2 className="text-gray-600  font-poppins font-[550] inter tracking-wider">Solutions</h2>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Cellular Service for Business</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Fibre Internet for Business & Enterprise</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Cloud Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">CyberSecurity</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">AT&T</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Internet & WAN Networking</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Business Voice Solution</a>

                        </div>
                        <div className="h-full gap-2 flex flex-col">
                            {/* <h2 className="text-gray-600  font-poppins  font-[550] inter pb-6 tracking-wider">Contact Information</h2> */}
                            <h2 className="text-gray-600 font-poppins font-[550] inter tracking-wider">Contact</h2>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Cellular Service for Business</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Fibre Internet for Business & Enterprise</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">Cloud Solutions</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">info@springsairns.com</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">212-991-8442</a>
                            <a href="" className="text-gray-600 font-poppins font-[350] text-[14px] sm:text-[16px]  inter tracking-wider no-underline">90 Hausman St, Brooklyn NY 11222</a>



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
                        <h1 className="text-lg">© 2024 Spring Air Network Solutions, Inc. 33 Great Neck Rd., Ste #7 Great Neck Plaza, NY 11021</h1>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>)}
export default Footer;