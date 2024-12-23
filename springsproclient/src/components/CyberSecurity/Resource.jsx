import "../../App.css";


const Resource = () => {
    // Data for each resource card
    const resources = [
        {
            id: 1,
            icon: "fa-database",
            type: "DATA SHEET",
            title: "MX family datasheet",
            description: "Learn more about the multifunctional network security and SD-WAN building blocks of a SASE architecture." ,
            buttonText: "LEARN MORE",
        },
        {
            id: 2,
            icon: "fa-video",
            type: "WEBINAR",
            title: "Introduction to Cisco Meraki Security and SD-WAN",
            description:"Hear about the security and SD-WAN features of Meraki MX appliances and get a deep-dive demo.", 
            buttonText: "LEARN MORE",
        },
        {
            id: 3,
            icon: "fa-eye",
            type: "AT A GLANCE",
            title: "Cisco SD-WAN powered by Meraki overview",
            description:"Get SD-WAN defined along with key use cases and a view of how SD-WAN powered by Meraki works.",
            buttonText: "LEARN MORE",
        },
        {
            id: 4,
            icon: "fa-blog",
            type: "BLOG",
            title: "When to use on-premises or cloud security?",
            description:
                "Discover the best practices for building a cloud-enabled network security model.",
            buttonText: "LEARN MORE",
        },
    ];

    return (
        <>
            <div className="resource">
                <div className="container mx-auto px-4 py-16 xl:px-[120px]">
                    <h1 className="text-5xl text-center text-[#3C3C3C] font-medium font-poppins">
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
