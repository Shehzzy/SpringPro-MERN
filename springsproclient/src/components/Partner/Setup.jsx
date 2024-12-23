import React from "react";

const Setup = () => {
    // Data for grid items
    const gridItems = [
        {
            id: 1,
            title: "Create a Cisco account",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, porro!",
            linkText: "Complete Setup 1",
            linkHref: "#",
        },
        {
            id: 2,
            title: "Set up your profile",
            description: "Expedite your setup with these easy steps to configure your profile.",
            linkText: "Complete Setup 2",
            linkHref: "#",
        },
        {
            id: 3,
            title: "Start your first project",
            description: "Kickstart your journey with guided steps to create your project.",
            linkText: "Complete Setup 3",
            linkHref: "#",
        },
    ];

    return (
        <>
            <div className="py-16">
                <div className="container mx-auto xl:px-[120px] px-4">
                    <h1 className="text-6xl font-poppins text-center text-[#3C3C3C] font-semibold">
                        The benefits of joining
                    </h1>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:gap-x-8 mt-16">
                        {gridItems.map((item) => (
                            <div
                                key={item.id}
                                className=" transition-all flex flex-col justify-between items-center pt-16 hover:shadow-2xl py-10 rounded-2xl px-8 "
                            >
                                <div className="flex  items-center flex-col">
                                    <div className="relative h-[140px]">
                                        <span className="text-[150px] text-blue-600 leading-[100px] z-[1] sticky work-sans font-semibold">
                                            {item.id}
                                        </span>
                                        <span className="absolute top-0 left-[-60px] z-0 w-[200px] rounded-full -rotate-45 h-[100px] bg-blue-100"></span>
                                    </div>
                                    <div className="mt-5">
                                        <h1 className="text-[#3C3C3C] text-center text-2xl font-poppins font-semibold">
                                            {item.title}
                                        </h1>
                                    </div>
                                    <div className="mt-5">
                                        <p className="text-center font-poppins text-[#3C3C3C] font-[350]">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <a
                                        className="text-[maroon] font-poppins font-semibold"
                                        href={item.linkHref}
                                    >
                                        <span>{item.linkText}</span>
                                        <i className="fa-solid fa-chevron-right ml-4"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
