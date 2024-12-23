import starbucks from "../../assets/images/y.webp"
const Starbucks = () => {
    return(<>
    <div className="bg-blue-500 pb-16 py-12 w-full">
        <div className="container flex justify-center mx-auto px-4 xl:px-[120px]">
            <div className="w-fit flex flex-col items-center">
                <img src={starbucks} alt="" />
                <h1 className="font-poppins text-center font-[425] mt-7 text-white text-2xl">
                
Meraki technology is indispensable for the <br className="sm:block hidden" /> Greater Wichita YMCA as it touches every<br className="sm:block hidden" /> aspect of operations, including Wi-Fi access, <br className="sm:block hidden" />  switchboards, and all of the transactional <br className="sm:block hidden" />  business.
                </h1>

                <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-14 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
READ MORE
    </button>
            </div>
        </div>
    </div>    
    </>)
}
export default Starbucks;