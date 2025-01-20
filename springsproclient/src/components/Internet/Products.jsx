import cambg1 from "../../assets/images/cam-1-bg.avif";
import cam1 from "../../assets/images/cam-1.avif";
import cambg2 from "../../assets/images/cam-2-bg.avif";
import cam2 from "../../assets/images/cam-2.avif";
import cambg3 from "../../assets/images/cam-3-bg.avif";
import cam3 from "../../assets/images/cam-3.avif";

const Products = () => {
    const cards = [
        {
            img: cam1,
            imgbg: cambg1,
            button: "SMART IOT SOLUTIONS"
        },
        {
            img: cam2,
            imgbg: cambg2,
            button: "SECURE SD WAN"
        },
        {
            img: cam3,
            imgbg: cambg3,
            button: "CLOUD MANAGED DATA"
        },

    ];

    return (
        <>
            <div className="w-full pb-20 pt-40">
                <div className="container px-4 xl:px-[120px]  mx-auto">
                    <div className="w-full flex flex-col items-center">
                        <h1 className="text-5xl work-sans text-center font-semibold text-[#3C3C3C]">
                        Scale SD-branch and SD- <br />campus faster with Meraki.
                        </h1>
                        <p className="text-center text-gray-700 mt-3 inter font-light">
                        Easily combine Meraki MG cloud-managed 5G fixed wireless access (FWA) with MX SD- <br />WAN, MR wireless, MS switching, and MT and MV Internet of Things for a faster, simpler,<br /> more secure connected experience.
                        </p>

                    </div>
                         {/* Product Cards Section */}
                <div className=" gap-y-10 grid   sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                    {cards.map((card, index) => (
                        <div key={index} className=" flex flex-col items-center">
                            {/* Background image */}
                            <div className="relative rounded-3xl overflow-hidden w-full h-full">            <img className="w-full object-cover" src={card.imgbg} alt="" />

                                {/* Foreground image */}
                                <img
                                    src={card.img}
                                    className="absolute top-0 left-0 w-full h-full object-cover transition-all hover:opacity-0 z-10"
                                    alt=""
                                /></div>
                                <div>
                                <button 
                                style={{
                                background: "linear-gradient(90deg, rgba(65, 253, 254) 0%, rgba(0, 210, 255, 1) 100%)"
                                }} 
                                className="font-bold text-xs text-white transition-all tracking-wider mt-4 px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                                >
                                    {card.button}
                                </button>
                                </div>

                        </div>
                    ))}
                </div>
                </div>

           
            </div>
        </>
    );
};

export default Products;
