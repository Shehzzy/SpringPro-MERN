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
            button: "PARTNER PORTAL"
        },
        {
            img: cam2,
            imgbg: cambg2,
            button: "SALES CONNECT"
        },
        {
            img: cam3,
            imgbg: cambg3,
            button: "MARKETPLACE"
        },

    ];

    return (
        <>
            <div className="w-full pb-20 pt-40">
                <div className="container px-4 xl:px-[120px]  mx-auto">
                    <div className="w-full flex flex-col items-center">
                        <h1 className="text-5xl work-sans text-center font-semibold text-[#3C3C3C]">
                        Additional resources
                        </h1>
                        <p className="text-center text-gray-700 mt-3 inter font-light">
                        Whether you’re an established business or just starting out, Meraki gives you the tools <br /> and resources you need to sell well.   </p>

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
                                <button className="text-black border-2 border-tron-blue  hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6  mt-5 inter lg:text-sm sm:text-sm py-3 rounded-full font-medium tracking-wide">
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
