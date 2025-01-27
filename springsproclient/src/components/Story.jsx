import storyimg1 from "../assets/images/story-img-1.webp"
import storyimg2 from "../assets/images/story-img-2.webp"
import { Link } from 'react-router-dom';

const Story = () => {


    return (
        <>
            <div className="w-full py-16" id="stories">
                <div className="container px-4 xl:px-[120px]  mx-auto ">
                    <div className="w-full flex flex-col items-center">
                        <h1 className="work-sans font-medium text-[#3C3C3C] leading-tight text-3xl md:text-4xl lg:text-5xl">
                            The journey to success begins in the cloud.
                        </h1>
                        <p className="text-center text-gray-700 mt-3">Learn how our customers rely on the power and ease of the Meraki cloud-first platform to get there faster.</p>
                        <a href="#stories" className="text-tron-blue text-center mx-auto mt-2 font-medium no-underline">SEE ALL STORIES <i className="fa-solid rotate-180 fa-angle-left"></i></a>
                    </div>
                    <div className="grid gap-y-16 gap-10 mt-8 grid-cols-1 md:grid-cols-2">
                        <div>
                            <img src={storyimg1} alt="" />
                            <h1 className="work-sans mt-10 text-2xl">FirstNet Mobility</h1>
                            <p className="work-sans text-3xl font-[600] mt-4">Simplifying IT operations & reducing costs</p>
                            <p className="mt-6">The FirstNet mission is to deploy, operate, maintain, and improve the first high-speed, nationwide wireless broadband network dedicated to public safety.</p>
                            <button 
                            style={{
                            background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                            }} 
                            className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                            >
                                <Link to={"/first-net-mobility"} className='text-white no-underline'>LEARN MORE</Link>
                            </button>
                        </div>
                        <div>
                            <img src={storyimg2} alt="" />
                            <h1 className="work-sans mt-10 text-2xl">FirstNET IoT</h1>
                            <p className="work-sans text-3xl font-[600] mt-4">Improving the customer & patient experience</p>
                            <p className="mt-6">FirstNet IoT advantages allow first responder agencies and those who support them to quickly and easily deploy devices critical to the mission using a FirstNet </p>
                            <button 
                            style={{
                            background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                            }} 
                            className="font-bold text-xs text-white transition-all tracking-wider px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                            >
                                <Link to={"/first-net-iot"} className='text-white no-underline'>LEARN MORE</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Story;