
import women from "../../assets/images/women.png"
const Guide = () => {

    return (
        <>
            <div className="py-10">
                <div className="bg-blue-300 py-10 md:py-5">
                    <div className="container mx-auto xl:px-[120px] px-4 ">
                        <div className=" flex flex-col gap-y-10 md:flex-row w-full ">
                            <div className="flex justify-between items-center w-full md:w-1/2">
                                <img src={women} className="md:p-8 lg:p-16" alt="" />
                            </div>
                            <div className="x flex flex-col justify-center w-full md:w-1/2 h-auto ">
                                <h6 className="text-[#3C3C3C] font-poppins">EXPERIENCE GUIDE</h6>
                                <h1 className="font-poppins text-3xl font-medium text-[#3C3C3C] mt-4">It’s easier to unify IT and IoT experiences on a cloud-first network platform.</h1>
                                <button className="text-black w-fit mt-10 md:mt-20 hover:bg-transparent transition-all border-2 border-tron-blue hover:border-black bg-tron-blue px-6   inter text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
                                    GET THE GUIDE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Guide;