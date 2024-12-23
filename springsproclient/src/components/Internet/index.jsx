
import Hero from "./Hero";
import Tab from "./Tab";
import Structure from "../Cellular Service/Structure"
import img from "../../assets/images/women.png"
import Carrier from "./Carrier";
import Resource from "./Resource";
import Deploys from "./Deploys";
import Products from "./Products";
import CTA from "./Cta"
import Food from "./Food"
const Internet = () => {

  return (
    <>
<Hero/>
<Tab/>
<Structure img={img} heading={"Network modernization in minutes."} details={"Get unmatched speed, scale, and security with Cisco cloud-managed 5G SD-Branch and SD-Campus."} point1={"Quickly set up and manage networks with a single view into SIM card settings, one-click auto-failover, and radio stats."} point2={"Manage common security, configuration, and segmentation policies across a multi-cloud infrastructure"} point3={"Protect every connection and secure every transaction—backed by one of the world’s largest commercial threat intelligence teams"} button={"GET YOUR DEMO"}  classe={"md:flex-row flex-col"} padding={"xl:pr-[120px] lg:pr-8"}/>
<Carrier/>
<Resource/>
<Deploys/>
<Food/>
<Products/>
<CTA/>
    </>)
}
export default Internet;