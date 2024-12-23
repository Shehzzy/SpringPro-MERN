// Example third image
import watch1 from "../../assets/images/watch1.avif"
import watch2 from "../../assets/images/watch2.avif"

const Watch = () => {
  // Array of data for the watches
  const watchData = [
    {
      image: watch1,
      title: 'WPP',
      description: 'Cisco technology enables WPP to create smart locations that encourage creativity and healthy ways of working.',
    },
    {
        image: watch2,
        title: 'Qdoba Mexican Eats',
        description: 'Qdoba Mexican Eats utilizes a full-stack Meraki solution to save $300,000 annually in support costs.',
      },

    // Add more objects as needed
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto xl:px-[120px] px-4">
        {/* Mapping over the watchData array */}
        <div className="grid md:grid-cols-2 gap-8">
          {watchData.map((item, index) => (
            <div key={index}>
              <div className="rounded-xl overflow-hidden">
                <img src={item.image} className="w-full h-[275px] object-cover" alt={item.title} />
              </div>
              <h1 className="text-[32px] font-[550] mt-4 font-poppins text-[#3C3C3C]">{item.title}</h1>
              <p className="text-[#3C3C3C] mt-5">{item.description}</p>
              <button className="text-black hover:bg-transparent transition-all border-2 border-tron-blue hover:border-black bg-tron-blue px-6 mt-5 inter text-base sm:text-sm py-3 rounded-full font-medium tracking-wide">
                LEARN MORE
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
