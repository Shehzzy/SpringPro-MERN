
import Hero from "./Hero";
import img from "../../assets/images/summery.svg"
import Strip from "./Strip";
import Info from "./Info";
import Guide from "./Guide";
import Starbucks from "./Starbucks";
import Structure from "./Structure";
import Tab from "./Tab";
import Watch from "./Watch";
import Trial from "./Trial";
const Cellular = () => {
  
    return (
<>
<Hero/>
<Strip/>
<Structure heading={"Easily scale at your own pace."} details={"Deploy one or tens of thousands of networks quickly through automation and configuration that’s a breeze."} point1={"Meet specific needs for each location by creating unique configurations"} point2={"Keep all locations aligned to your corporate standards"} point3={"Gain a seamless experience with cloud/on-premises network configurations"} button={"LEARN HOW WE SCALE"} img={img} classe={"md:flex-row flex-col"} padding={"xl:pr-[120px] lg:pr-8"}/>
<Info/>
<Structure heading={"Manage and monitor from anywhere."}  details={"Manage your entire distributed network remotely with a single interface—the SpringAir dashboard."} point1={"Monitor WAN, access, and IoT technologies in one place with end-to-end visibility"} point2={"See the overall health of each network and proactively solve issues before they become critical"} point3={"Leverage our advanced AI to take the guesswork out of optimizing networks."} classe={"md:flex-row flex-col"} padding={"xl:pr-[120px] lg:pr-8"}  button={"EXPLORE THE DASHBOARD"} img={img}/>
<Structure heading={"Gain enhanced reliability and security."}  details={"Meet the changing demands of your business without compromising reliability or security with the always-agile Spring Air platform."} point1={"Operate at scale with a 99.99% uptime SLA"} point2={"Increase protection with network data that’s encrypted in transit and at rest in the cloud"} point3={"Feel confident about data privacy, as no end-user traffic passes through the Meraki cloud"} classe={"md:flex-row-reverse flex-col"} padding={"xl:pl-[120px] lg:pl-8"}  button={"LEARN MORE"} img={img}/>
<Starbucks/>
<Tab/>
<Guide/>
<Watch/>
<Trial/>
</>

)}
export default Cellular;