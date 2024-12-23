import "../../App.css";


const Resource = () => {
    // Data for each resource card
    const resources = [
        {
            id: 1,
            icon: "fa-file",
            type: "REPORTS",
            title: "2024 Global Networking Trends Report",
            description:
                "Gain insights from over 2,000 global IT leaders on the networking strategies that are advancing digital business.",
            buttonText: "GET REPORT",
        },
        {
            id: 2,
            icon: "fa-shield",
            type: "SECURITY",
            title: "The Future of Cybersecurity",
            description:
                "Explore how businesses are adapting to modern cybersecurity threats with advanced technologies.",
            buttonText: "LEARN MORE",
        },
        {
            id: 3,
            icon: "fa-network-wired",
            type: "NETWORKING",
            title: "Enterprise Networking in 2024",
            description:
                "Discover the latest trends in networking technology and how they are transforming businesses worldwide.",
            buttonText: "READ REPORT",
        },
        {
            id: 4,
            icon: "fa-lightbulb",
            type: "INSIGHTS",
            title: "Innovations in IT",
            description:
                "Get an inside look at groundbreaking IT innovations that are shaping the future.",
            buttonText: "EXPLORE NOW",
        },
    ];

    return (
        <>
            <div className="resource">
                <div className="container mx-auto px-4 py-16 xl:px-[120px]">
                    <h1 className="text-5xl text-[#3C3C3C] font-medium font-poppins">
                        Resource Hub
                    </h1>
                    <div className="grid gap-x-10 gap-y-10 mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {resources.map((resource) => (
                            <div
                                key={resource.id}
                                className="bg-white flex flex-col justify-between rounded-2xl p-10 shadow-lg"
                            >
                                <div>
                                    <div className="flex justify-start gap-3 items-center">
                                        <i
                                            className={`fa-light text-[#3C3C3C] ${resource.icon} text-4xl`}
                                        ></i>
                                        <span className="font-light text-sm font-inter">
                                            {resource.type}
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-[#3C3C3C] mt-5 text-lg font-medium font-poppins">
                                            {resource.title}
                                        </h1>
                                    </div>
                                    <div>
                                        <p className="font-light mt-8">{resource.description}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="w-full flex justify-center">
                                        <button className="text-[maroon] mt-5 font-medium text-base">
                                            <span>{resource.buttonText}</span>
                                            <i className="fa-solid ml-2 fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resource;
