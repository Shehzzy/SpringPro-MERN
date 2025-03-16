import React, { useState } from "react";

// Import the certificate images
import certificate1 from "../assets/images/certifications/CISSP.png";
import certificate2 from "../assets/images/certifications/CompTIA.png";
import certificate3 from "../assets/images/certifications/GCFA.png";
import certificate4 from "../assets/images/certifications/GCIA.png";
import certificate5 from "../assets/images/certifications/GCIH.png";
import certificate6 from "../assets/images/certifications/GPEN.png";
import certificate7 from "../assets/images/certifications/GSLC.png";
import certificate8 from "../assets/images/certifications/GWAPT.png";
import certificate9 from "../assets/images/certifications/OSCP.png";
import certificate10 from "../assets/images/certifications/Securityplus.png";

const Certifications = () => {
  const certificates = [
    { image: certificate1, text: "CISSP - Certified Information Systems Security Professional" },
    { image: certificate2, text: "CompTIA - Computing Technology Industry Association" },
    { image: certificate3, text: "GCFA - GIAC Certified Forensic Analyst" },
    { image: certificate4, text: "GCIA - GIAC Certified Intrusion Analyst" },
    { image: certificate5, text: "GCIH - GIAC Certified Incident Handler" },
    { image: certificate6, text: "GPEN - GIAC Penetration Tester" },
    { image: certificate7, text: "GSLC - GIAC Security Leadership" },
    { image: certificate8, text: "GWAPT - GIAC Web Application Penetration Tester" },
    { image: certificate9, text: "OSCP - Offensive Security Certified Professional" },
    { image: certificate10, text: "Security+ - CompTIA Security+" },
  ];

  // Duplicate the certificates to create a seamless loop
  const duplicatedCertificates = [...certificates, ...certificates];

  // State to track which certificate is being hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full py-10 px-4 sm:pb-32 md:pt-16 bg-tron-blue-200">
      <div className="container mx-auto">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl mt-8 sm:mt-16 md:text-5xl font-medium text-black text-center">
            SOC Certifications & Accreditations
          </h1>
          <p className="text-center mt-4">
            Our SOC services are highly decorated with the latest certifications to deliver the most up-to-date cybersecurity services.
          </p>

          {/* Slider Container */}
          <div className="w-[850px] h-[250px] mt-8 overflow-hidden relative">
            {/* Single Slider with duplicated content */}
            <div className="slides flex absolute w-[600%] left-0 top-0 h-[250px] items-center gap-24">
              {duplicatedCertificates.map((cert, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={cert.image}
                    className="w-[250px] mx-12 relative z-10 transition-transform duration-300 ease-in-out pt-4"
                    alt={`Certificate ${index + 1}`}
                  />
                  {hoveredIndex === index && (
                    <div className="absolute bottom-full left-3/4 transform -translate-x-1/2 bg-white z-20 text-black text-sm px-3 py-2 rounded whitespace-nowrap">
                      {cert.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;