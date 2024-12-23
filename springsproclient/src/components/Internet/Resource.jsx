import "../../App.css";


const Resource = () => {
    // Data for each resource card
    const resources = [
        {
            id: 1,
            icon: "fa-shield-check",
            type: "SOLUTION GUIDE",
            title: "Mobile and temporary sites: sample deployment",
            description:"See what customers are using to transform the way they serve the public on AT&T FirstNet, America’s nationwide cellular network dedicated to first responders and the public safety community.",
            buttonText: "LEARN MORE",
        },
        {
            id: 2,
            icon: "fa-file-video",
            type: "WEBINAR",
            title: "Work-anywhere experience delivered by Meraki",
            description:"See how easy it is to get started on your journey to SASE and support a work-anywhere experience with Meraki.",
            buttonText: "LEARN MORE",
        },
        {
            id: 3,
            icon: "fa-file-video",
            type: "VIDEO",
            title: "Deep dive on the Meraki cellular gateway",
            description:"Get a deep dive into the use cases and technology that make it easy to access and scale cellular networks.",
            buttonText: "WATCH NOW",
        },
        {
            id: 4,
            icon: "fa-laptop-binary",
            type: "SOLUTION GUIDE",
            title: "Meraki for manufacturing",
            description:"Take advantage of instantly-on connectivity with cellular to rapidly extend WAN coverage and add resiliency.",
            buttonText: "EXPLORE NOW",
        },
    ];

    return (
        <>
            <div className="resource">
                <div className="container mx-auto px-4 py-16 xl:px-[120px]">
                    <h1 className="text-5xl  text-[#3C3C3C] font-semibold text-center font-poppins">
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
