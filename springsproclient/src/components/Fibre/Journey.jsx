import "../../App.css";
import router from "../../assets/images/router.avif";
import umbrella from "../../assets/images/umbrella.webp"
import duo from "../../assets/images/duo.avif"
import eye from "../../assets/images/eye.avif"


const Journey = () => {
    const items = [
        {
            id: 1,
            imgSrc: router,
            title: "Explore SD-WAN",
            description: "Establish secure connectivity in just three clicks. Get started with Meraki SD-WAN.",
            buttonText: "Explore the SD WAN",
        },
        {
            id: 2,
            imgSrc: umbrella,
            title: "Cloud Networking",
            description: "Easily manage your cloud networks with built-in security and scalability.",
            buttonText: "Learn About Cloud",
        },
        {
            id: 3,
            imgSrc: duo,
            title: "IoT Integration",
            description: "Connect and manage IoT devices seamlessly with smart solutions.",
            buttonText: "Discover IoT",
        },
        {
            id: 4,
            imgSrc: eye,
            title: "Advanced Analytics",
            description: "Leverage advanced insights to optimize your network performance.",
            buttonText: "View Analytics",
        },
    ];

    return (
        <div className="py-24">
            <div className="container mx-auto xl:px-[120px] px-4">
                <h1 className="text-[#3C3C3C] text-5xl text-center font-medium font-poppins">
                    Just starting your journey? <br />
                    Fibre your way.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col gap-6">
                            <img className="object-cover" src={item.imgSrc} alt={item.title} />
                            <h1 className="text-[#3C3C3C] text-2xl text-center mt-4 font-inter">{item.title}</h1>
                            <p className="text-[#3C3C3C] font-light text-center">{item.description}</p>
                            <div className="flex justify-center">
                                <button className="text-[maroon] font-poppins font-medium mx-auto text-center">
                                    {item.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Journey;
