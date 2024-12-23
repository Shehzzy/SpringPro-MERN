
import Hero from "./Hero";
import img from "../../assets/images/summery.svg"
import Structure from "../Cellular Service/Structure";
import Accordion from "./Accordin";
import Food from "./Food";
import Journey from "./Journey";
import Resource from "./Resource";
import Explore from "./Explore";
const Fibre = () => {
  
    return (
<>
<Hero/>
<Structure img={img} heading={"Why Fibre Internet?"} details={"Hybrid workforces and multi-cloud environments increase operational complexity and can put security resilience at risk."} point1={"Network complexity is at odds with business agility and IT teams need more dynamic solutions to get fast, flexible connectivity"} point2={"Without centralized control over policy, access, and identity, security teams can’t deliver trusted, secure experiences at scale"} point3={"Unified SASE solutions provide rich visibility, proactive insight, and comprehensive control for seamless IT management"} button={"READ MORE"}  classe={"md:flex-row-reverse flex-col"} padding={"xl:pl-[120px] lg:pl-8"}/>
<Accordion/>
<Structure img={img} heading={"SPRINGS Secure Connect"} point1={"Streamline operations, reduce security risks, and boost the productivity of your Meraki dashboard"} details={"Streamline operations, reduce security risks, and boost the productivity of your Meraki dashboard"} point2={"Seamlessly connect a hybrid workforce and optimize application performance across public and private clouds through Meraki SD-WAN"} point3={"Protect every connection and secure every transaction—backed by one of the world’s largest commercial threat intelligence teams"} button={"GET FIBRE"}  classe={"md:flex-row-reverse flex-col"} padding={"xl:pl-[120px] lg:pl-8"}/>
<Food/>
<Journey/>
<Resource/>
<Explore/>
</>

)}
export default Fibre;