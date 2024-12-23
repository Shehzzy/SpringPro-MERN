

import Hero from "./Hero";
import Deploys from "./Deploys";
import img from "../../assets/images/2.png"
import Tab from "./Tab";
import Accordion from "./Accordin";
import Location from "./Location";
import Resource from "./Resource";
import ProReactive from "./ProReactive";
import CTA from "./Cta";
import Products from "./Products";
import Slider from "./Slider";
import Structure from "../Cellular Service/Structure";
const Cyber = () => {
  
    return (
<>
<Hero/>
<Deploys/>
<Tab/>
<Structure heading={"Three clicks to secure SD-WAN"} details={"Gain accuracy through a unique design that uses the same protocol for measuring path performance as real traffic."} point1={"Build resilient SD-WAN connectivity with integrated wired and cellular WAN, switching, and Wi-Fi"} point2={"Optimize traffic over all available paths, between sites and all multicloud environments—public and private"} point3={"Gain a seamless experience with cloud/on-premises network configurations"} button={"SEE THE DEMO"} img={img} classe={"md:flex-row flex-col"} padding={"xl:pr-[120px] lg:pr-8"}/>
<Structure heading={"Complete cybersecurity protection. Simplified."} details={"Automatically block 98% of malware—25% more than the industry average—with unmatched threat intelligence from Cisco Talos."} point1={"Prevent real-time threats with a powerful, built-in, next-gen firewall including IDS/IPS, URL filtering, and malware protection"} point2={"Detect and respond to advanced threats automatically with Cisco XDR natively integrated"} point3={"Gain a seamless experience with cloud/on-premises network configurations"} button={"FIND OUT MORE"} img={img} classe={"md:flex-row-reverse flex-col"} padding={"xl:pl-[120px] lg:pl-8"}/>
<ProReactive/>
<Accordion/>
<Resource/>
<Location/>
<Slider/>
<Products/>
<CTA/>
</>

)}
export default Cyber;