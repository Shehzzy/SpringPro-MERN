

import Hero from "./Hero";
import Tabs from "./Tab";
import img from "../../assets/images/umbrella.webp"
import Strip from "./Strip";
import Deploys from "./Deploys";
import Grid from "./Grid"
import Trial from "./Trial";
import Structure from "../Cellular Service/Structure";
import Resource from "./Resource";
const Cloud = () => {
  
    return (
<>
<Hero/>
<Strip/>
<Tabs/>
<Structure img={img} heading={"Speed, security, and scale."} details={"Seamlessly secure and automate management of your hybrid cloud, anywhere, through a single platform with vMX.d"} point1={"Scale and migrate workloads across multiple regions and cloud providers on a single Meraki-powered SD-WAN"} point2={"Manage common security, configuration, and segmentation policies across a multi-cloud infrastructure"} point3={"Protect every connection and secure every transaction—backed by one of the world’s largest commercial threat intelligence teams"} button={"TRY IT NOW"}  classe={"md:flex-row flex-col"} padding={"xl:pr-[120px] lg:pr-8"}/>
<Grid/>
<Resource/>
<Deploys/>
<Trial/>
</>

)}
export default Cloud;