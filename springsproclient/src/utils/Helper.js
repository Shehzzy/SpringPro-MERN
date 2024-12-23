import { ABOUT, BENEFIT, CHATBOT, EMAIL, HOME, LOCATION, SERVICES } from "./const";
import clientProfileImg from "../assets/images/webp/client-image.webp";
import ratingStars from "../assets/images/svg/rating-stars.svg";
import costManagment from "../assets/images/webp/cost-management.webp";
import comprehensiveService from "../assets/images/webp/comprehensive-service.webp";

export const CONTACT_US_CARD_DATA = [
  {
    icon: "chatBot",
    title: "Chat with Us!",
    description: ["We're just a message away.", "Start chatting now!"],
    url: CHATBOT,
  },
  {
    icon: "phone",
    title: "Phone",
    description: ["(917) 473-0532", "(684) 555-0102"],
    url: "",
  },
  {
    icon: "email",
    title: "Email",
    description: ["savings@getbetterbills.com"],
    url: EMAIL,
  },
];
export const NAV_LINK_LIST = [
  { title: "Home", url: HOME },
  { title: "About", url: ABOUT },
  { title: "Services", url: SERVICES },
  { title: "Benefit", url: BENEFIT },
];
export const OUR_CLIENTS_DATA = [
  {
    clientImg: clientProfileImg,
    Stars: ratingStars,
    description:
      "I’ve always thought my cell phone bill was just part of life—something I couldn’t change. But after using this service, I was amazed to see a 28% reduction in my monthly bill! The process was so simple; they took care of everything, from reviewing my plan to negotiating with the carrier. I highly recommend this to anyone who feels like they’re overpaying.",
    name: "Sarah L.",
    designation: "Student",
  },
  {
    clientImg: clientProfileImg,
    Stars: ratingStars,
    description:
      "I’ve always thought my cell phone bill was just part of life—something I couldn’t change. But after using this service, I was amazed to see a 28% reduction in my monthly bill! The process was so simple; they took care of everything, from reviewing my plan to negotiating with the carrier. I highly recommend this to anyone who feels like they’re overpaying.",
    name: "Sarah L.",
    designation: "Student",
  },
  {
    clientImg: clientProfileImg,
    Stars: ratingStars,
    description:
      "I’ve always thought my cell phone bill was just part of life—something I couldn’t change. But after using this service, I was amazed to see a 28% reduction in my monthly bill! The process was so simple; they took care of everything, from reviewing my plan to negotiating with the carrier. I highly recommend this to anyone who feels like they’re overpaying.",
    name: "Sarah L.",
    designation: "Student",
  },
];

// === CHOOSE US DATA =====
export const CHOOSE_US_DATA_LIST = [
  {
    icon: "fee",
    title: "No Hidden Fees",
    description: "Transparent pricing—only pay for results.",
  },
  {
    icon: "savings",
    title: "Quick Savings",
    description: "Start seeing lower bills in just a few weeks.",
  },
  {
    icon: "process",
    title: "Easy Process",
    description: "No need for technical knowledge. We handle everything!",
  },
];
export const BENEFITS_CARD_DATA = [
  {
    image: costManagment,
    title: "Cost Management",
    description:
      "We help you manage and lower your telecommunication expenses.",
  },
  {
    image: comprehensiveService,
    title: "Comprehensive Service",
    description:
      "We handle everything from procurement to management and implementation, so you can focus on your core business activities.",
  },
];

export const PLAN_DATA_LIST = [
  {
    title:" AT&T",
    name: "Our Deal",
    credits:"Company credits",
    price: 10,
    autopayDiscount: 70,
    streaming: true,
    network5G: false,
    total: 74,
  },
  {
    title:" AT&T",
    name: "Through Retail",
    credits:"Credits",
    price: 5,
    autopayDiscount: 70,
    streaming: true,
    network5G: false,
    total: 74,
  },
  {
    title:"Verizon",
    credits:"Credits",
    price: 10,
    autopayDiscount: 70,
    streaming: true,
    network5G: false,
    total: 74,
  },
  {
    title:"T-Mobile",
    credits:"Credits",
    price: "5-25",
    autopayDiscount: 70,
    streaming: true,
    network5G: false,
    total: 74,
  },
];

export const SELECT_OPTION_LIST = [
  {
    label: "Unlimited Everything",
  },
  {
    label: "Unlimited Everything+",
  },
];

export const MID_TIER_VALUES = [
  [70, 70, 75, 70],
  [120, 120, 130, 120],
  [135, 135, 150, 120],
  [160, 160, 180, 140],
  [175, 175, 200, 160],
  [210, 210, 240, 180],
  [245, 245, 280, 210],
  [280, 280, 320, 240],
  [315, 315, 360, 270],
  [350, 350, 400, 300],
];

export const UNLIMITED_TOP_TIER_VALUES = [
  [80, 80, 80, 85, 90],
  [140, 140, 140, 140, 150],
  [165, 165, 165, 140, 185],
  [200, 200, 220, 170, 220],
  [225, 225, 225, 200, 225],
  [240, 240, 270, 240, 270],
  [280, 280, 315, 280, 315],
  [320, 320, 360, 320, 360],
  [360, 360, 405, 360, 405],
  [400, 400, 450, 400, 450],
];
