import "../../App.css";


const Resource = () => {
    // Data for each resource card
    const resources = [
        {
            id: 1,
            icon: "fa-eye",
            type: "AT-A-GLANCE",
            title: "vMX trial guide",
            description: "Find out how you can get a free trial of the vMX in your environment today" ,
            buttonText: "GET REPORT",
        },
        {
            id: 2,
            icon: "fa-file-chart-pie",
            type: "INFOGRAPHIC",
            title: "Hybrid cloud best practices on AWS",
            description:"Check out best practices to elevate your hybrid cloud with vMX on AWS.", 
            buttonText: "LEARN MORE",
        },
        {
            id: 3,
            icon: "fa-file",
            type: "WHITE PAPER",
            title: "Auto VPN white paper",
            description:"Learn why Cisco Meraki Auto VPN is the fastest way to securely connect people and resources across networks and clouds.",
            buttonText: "READ REPORT",
        },
        {
            id: 4,
            icon: "fa-file",
            type: "SETUP GUIDE",
            title: "Run vMX on a Cisco UCS running NFVIS",
            description:
                "See how to run Cisco Meraki vMX on a Cisco Unified Computing System using Cisco Enterprise NFV Infrastructure Software",
            buttonText: "EXPLORE NOW",
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
