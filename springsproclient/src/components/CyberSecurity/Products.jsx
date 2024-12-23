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
            <div className="w-full py-20 ">
                <div className="container  mx-auto">
                    <div className="w-full flex px-4 flex-col items-center">
                        <h1 className="text-5xl work-sans text-center font-semibold text-[#3C3C3C]">
                        A complete tool kit to build a  <br className="sm:block hidden"/>complete experience.
                        </h1>
                        <p className="text-center text-gray-700 mt-3 inter font-light">
                            We know you want scalable, secure, and seamless IT solutions. Experience the ease and
                            <br />
                            efficiency of building them on the Meraki platform. Go ahead, give it a try—we’re with you
                            <br />
                            every step of the way.
                        </p>
                        <button className="text-black border-2 border-tron-blue hover:bg-transparent hover:border-black transition-all bg-tron-blue px-6 mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
                            BROWSE ALL PRODUCTS
                        </button>
                    </div>
                         {/* Product Cards Section */}
                <div className=" gap-y-10 grid px-4 xl:px-[120px]  sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
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
