import storyimg1 from "../../assets/images/story-img-1.webp"
import storyimg2 from "../../assets/images/story-img-2.webp"

const Story = () => {


    return (
        <>
        <div className="w-full py-16">
            <div className="container px-4 xl:px-[120px]  mx-auto ">
            <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px] text-[#3C3C3C] mt-5 work-sans text-center font-medium lea">Build a secure experience for <br className="sm:block hidden" /> employees and customers.</h1>
            <p className="  mt-7 text-[#3C3C3C] font-[350] text-center work-sans">Future-proof your financial services operations to ensure that banking applications are stable, secure, and always <br className="sm:block hidden" /> on for the moments that matter.</p>

 
           <div className="grid gap-y-16 gap-10   mt-24 grid-cols-1 md:grid-cols-2">
           <div>
            <img src={storyimg1} alt="" />
            <h1 className="work-sans mt-10 text-2xl">FirstNet Mobility</h1>
            <p className="work-sans text-4xl font-[600] text-[#3C3C3C] mt-4">Simplifying IT operations and reducing costs</p>
            <p className="font-light inter mt-6">The FirstNet mission is to deploy, operate, maintain, and improve the first high-speed, nationwide wireless broadband network dedicated to public safety.</p>
            <button className="text-black hover:bg-transparent hover:border-black transition-all border-2 border-tron-blue bg-tron-blue px-6  inter mt-10 text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
EXPLORE PLATFORM
    </button>
           </div>
           <div>
            <img src={storyimg2} alt="" />
            <h1 className="work-sans mt-10 text-2xl">FirstNET IoT</h1>
            <p className="work-sans text-4xl font-[600] text-[#3C3C3C] mt-4">Improving the customer and patient experience</p>
            <p className="font-light inter mt-6">FirstNet IoT advantages allow first responder agencies and those who support them to quickly and easily deploy devices critical to the mission using a FirstNet </p>
            <button className="text-black hover:bg-transparent hover:border-black transition-all border-2 border-tron-blue bg-tron-blue px-6  inter mt-10 text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
DELIEVER THE FUTURE
    </button>
           </div>
           </div>
            </div>
        </div>
        </>
    )
}
export default Story;