import React from "react";
import womenimg from "../assets/images/hero-img.png"; // Make sure the path is correct

const Cobec = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-hidden container md:flex-row flex-col px-4 xl:px-[120px] mx-auto w-full flex md:pt-[140px] pt-[120px] md:h-[700px]">
          <div className="flex-col md:h-auto md:px-4 px-4 sticky z-[10] lg:px-4 xl:px-4 !pr-0 w-full md:w-1/2 flex justify-center items-start">
            <h1 className="work-sans text-5xl sm:text-7xl font-medium text-[#3C3C3C]">
            Spring Air Network Solutions, Inc. <br className="md:block block" /> <p className="text-tron-blue">(SANS)</p>
            </h1>
          </div>
          <div className="sticky z-[10] flex md:h-auto sm:h-[600px] ] items-start sm:items-center justify-center w-full md:w-1/2">
            {/* Ensure the image is being used correctly with the imported path */}
            <img src={womenimg} alt="Hero" className="w-[800px] py-4  " />
          </div>
        </div>
        <div className="overflow-hidden container h-full flex flex-col justify-center  w-full md:w-1/2 pt-12">
            <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px]  work-sans font-medium lea">Code of Business Ethics and Conduct (COBEC)</h1>
            <p className="mt-3">Spring Air Network Solutions, Inc. ("SANS") is committed to achieving its business goals responsibly, ethically, and in full compliance with federal, state, and local laws, including the laws of New York State. This Code of Business Ethics and Conduct (COBEC) outlines the principles and expectations for SANS Representatives in all business activities. Representatives are required to comply with this Code and all applicable laws. Violations may result in significant consequences, including termination of agreements or employment, and potential legal action.</p>

            <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px]  work-sans font-medium lea pt-4">Definition of Representatives</h1>
            <p className="mt-3">For the purposes of COBEC, the term "SANS Representatives" refers to individuals and entities engaged in business activities on behalf of SANS, including:</p>
            
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">1</p>
                    <h5>Sub-Agents (Referred to as "Partners"):</h5>
                </div>
                <p className="px-10">Independent entities authorized to promote, market, and sell SANS solutions. While referred to as "Partners" for goodwill, they are not formal partners or shareholders of SANS.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">2</p>
                    <h5>Referral Agents:</h5>
                </div>
                <p className="px-10">Individuals or entities that introduce prospective clients to SANS or its Representatives, often compensated for successful leads or referrals.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">3</p>
                    <h5>Employees:</h5>
                </div>
                <p className="px-10">Individuals employed directly by SANS to support its goals and uphold its values.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">4</p>
                    <h5>Independent Contractors:</h5>
                </div>
                <p className="px-10">Individuals or entities contracted to perform specific tasks or services for SANS.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">5</p>
                    <h5>Consultants:</h5>
                </div>
                <p className="px-10">Professionals engaged to provide expertise or strategic guidance supporting SANS operations and growth.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">6</p>
                    <h5>Other Authorized Representatives:</h5>
                </div>
                <p className="px-10">Any other individual or entity formally authorized by SANS to represent its interests, brand, or services.</p>
            </div>

            <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px]  work-sans font-medium lea pt-4">Ethical Standards and Guidelines</h1>
            
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">1</p>
                    <h5>Integrity and Honesty:</h5>
                </div>
                <p className="px-10">Conduct all business activities with honesty, transparency, and the highest standards of integrity.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">2</p>
                    <h5>Truthful Communication:</h5>
                </div>
                <p className="px-10">Avoid deceptive, misleading, or disparaging statements to influence others to engage in business with SANS.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">3</p>
                    <h5>Respect for Competitors:</h5>
                </div>
                <p className="px-10">Do not engage in slander, libel, or defamation of competitors.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">4</p>
                    <h5>Accurate Representation:</h5>
                </div>
                <p className="px-10">Represent roles and affiliations truthfully. For example, do not misrepresent yourself as an employee of SANS unless factually accurate.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">5</p>
                    <h5>Prohibition of Bribery:</h5>
                </div>
                <p className="px-10">Do not offer, pay, or accept bribes, kickbacks, or illegal payments. This includes compliance with New York State anti-bribery and corruption laws.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">6</p>
                    <h5>Respect for Proprietary Information:</h5>
                </div>
                <p className="px-10">Do not misuse competitor partner lists or confidential information. Build relationships based on SANS’s value proposition.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">7</p>
                    <h5>Truthful Communication:</h5>
                </div>
                <p className="px-10">Avoid deceptive, misleading, or disparaging statements to influence others to engage in business with SANS.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">8</p>
                    <h5>Respect for Competitors:</h5>
                </div>
                <p className="px-10">Do not engage in slander, libel, or defamation of competitors.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">9</p>
                    <h5>Accurate Representation:</h5>
                </div>
                <p className="px-10">Represent roles and affiliations truthfully. For example, do not misrepresent yourself as an employee of SANS unless factually accurate.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">10</p>
                    <h5>Prohibition of Bribery:</h5>
                </div>
                <p className="px-10">Do not offer, pay, or accept bribes, kickbacks, or illegal payments. This includes compliance with New York State anti-bribery and corruption laws.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">11</p>
                    <h5>Respect for Proprietary Information:</h5>
                </div>
                <p className="px-10">Do not misuse competitor partner lists or confidential information. Build relationships based on SANS’s value proposition.</p>
            </div>  
            
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">12</p>
                    <h5>Document Integrity:</h5>
                </div>
                <p className="px-10">Never falsify documents or forge signatures. Such actions violate New York State forgery statutes and are subject to prosecution.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">13</p>
                    <h5>Customer Authorization:</h5>
                </div>
                <p className="px-10">Do not submit orders on behalf of customers without explicit authorization. Compliance with New York State contract law is mandatory.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">14</p>
                    <h5>Accurate Representation:</h5>
                </div>
                <p className="px-10">Represent roles and affiliations truthfully. For example, do not misrepresent yourself as an employee of SANS unless factually accurate.</p>
            </div>
            <div>
                <div className="px-10 flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">15</p>
                    <h5>Compliance with Laws and Regulations:</h5>
                </div>
                <p className="px-10">Adhere to all applicable laws, including but not limited to:</p>
                <div className="px-10 flex gap-3 mt-2 items-baseline">
                    <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                    <p>New York State Consumer Protection Act: Ensuring fair and honest dealings with customers.</p>
                </div>
                <div className="px-10 flex gap-3 mt-2 items-baseline">
                    <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                    <p>Privacy Laws: Protecting customer data in compliance with New York State’s data security requirements.</p>
                </div>
                <div className="px-10 flex gap-3 mt-2 items-baseline">
                    <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                    <p>CPNI Compliance: Following federal and state telecommunications privacy rules.</p>
                </div>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">16</p>
                    <h5>Proper Use of Marketing Materials:</h5>
                </div>
                <p className="px-10">Do not use unapproved marketing materials, trademarks, or logos of SANS or its suppliers without authorization.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">17</p>
                    <h5>Adherence to Telemarketing Laws:</h5>
                </div>
                <p className="px-10">Do not engage in telemarketing campaigns that violate the Telephone Consumer Protection Act (TCPA) or New York State telemarketing and do-not-call registry laws.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">18</p>
                    <h5>Commitment to Fair Competition:</h5>
                </div>
                <p className="px-10">Compete fairly in the marketplace and avoid practices that unfairly disadvantage competitors.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">19</p>
                    <h5>Professional Behavior:</h5>
                </div>
                <p className="px-10">Maintain professionalism in all business interactions and avoid conduct that could harm SANS’s reputation.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">20</p>
                    <h5>Confidentiality:</h5>
                </div>
                <p className="px-10">Safeguard proprietary and sensitive information related to SANS, its partners, and customers, in compliance with New York’s Trade Secret Protection Act.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">21</p>
                    <h5>Responsibility to Report Violations:</h5>
                </div>
                <p className="px-10">Promptly report any known or suspected violations of COBEC to the appropriate SANS contact.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">22</p>
                    <h5>Commitment to Excellence:</h5>
                </div>
                <p className="px-10">Strive to deliver exceptional value and uphold SANS’s commitment to quality in all business dealings.</p>
            </div>


            <h1 style={{lineHeight:"50px"}} className=" text-[40px] lg:text-[50px]  work-sans font-medium lea pt-4">Accountability for Non-Compliance</h1>
            <p className="mt-3">SANS is dedicated to maintaining the highest ethical standards. Violations of COBEC or applicable laws will result in consequences, including:</p>
            
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">1</p>
                    <h5>Investigation of Violations:</h5>
                </div>
                <p className="px-10">All alleged violations of COBEC will be investigated. Representatives must cooperate fully.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">2</p>
                    <h5>Investigation of Violations:</h5>
                </div>
                <div className="px-10 flex gap-3 mt-2 items-baseline">
                    <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                    <p>Disciplinary actions, including termination of agreements or employment.</p>
                </div>
                <div className="px-10 flex gap-3 mt-2 items-baseline">
                    <i className="fa-solid fa-check text-[#3C3C3C] border-2 rounded-full px-[2.7px] text-xs bg-tron-blue"></i>
                    <p>Legal action under applicable New York State or federal laws, including civil or criminal prosecution.</p>
                </div>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">3</p>
                    <h5>Restitution:</h5>
                </div>
                <p className="px-10">Representatives may be required to reimburse SANS or affected parties for any damages caused by misconduct.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">4</p>
                    <h5>Notification of Termination:</h5>
                </div>
                <p className="px-10">SANS reserves the right to notify stakeholders, including customers and partners, of terminations due to COBEC violations.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">5</p>
                    <h5>Prohibition of Reinstatement:</h5>
                </div>
                <p className="px-10">Representatives terminated for COBEC violations are not eligible for re-engagement with SANS.</p>
            </div>
            <div>
                <div className="flex gap-3 mt-2 items-baseline">
                    <p className="fa-solid text-[#3C3C3C] border-2 px-2 py-1 rounded-full text-xs bg-tron-blue">6</p>
                    <h5>Legal Remedies:</h5>
                </div>
                <p className="px-10">SANS reserves the right to pursue legal remedies under New York State law for breaches of COBEC, including fraud, data theft, or contract violations.</p>
            </div>
            <p className="text-lg py-12">By adhering to COBEC, SANS Representatives safeguard the integrity of Spring Air Network Solutions, Inc. and ensure compliance with New York State law and professional standards.</p>
        </div>
      </div>
    </>
  );
};

export default Cobec;
