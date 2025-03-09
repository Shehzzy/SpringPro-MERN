import { useEffect, useRef, useState } from "react";
// import circleBlueDot from "../assets/images/png/blue-dot-circle.png";
import Icons from "../common/Icons";
import PrimaryHeading from "../common/PrimaryHeading";
import {
  SELECT_OPTION_LIST,
  UNLIMITED_TOP_TIER_VALUES,
  MID_TIER_VALUES,
  PLAN_DATA_LIST,
} from "../.././utils/Helper";
import SwitchSmartphone from "./SwitchSmartphone";
const SwitchCalculate = () => {
  const [isValue, setIsValue] = useState(1);
  const [selectedValue, setSelectedValue] = useState(25);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const decrementValue = () => {
    if (isValue > 1) {
      setIsValue(isValue - 1);
    }
  };

  const incrementValue = () => {
    if (isValue < 10) {
      setIsValue(isValue + 1);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    SELECT_OPTION_LIST[0] || ""
  );
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const [values, setValues] = useState(MID_TIER_VALUES);
  const handleSelect = (value) => {
    setSelectedOption(value);
    switch (value.label) {
      case "Unlimited Everything+":
        setValues(UNLIMITED_TOP_TIER_VALUES);
        break;
      default:
        setValues(MID_TIER_VALUES);
        break;
    }
    setIsOpen(false);
  };

  // function floorTo(num, decimals) {
  //   const factor = Math.pow(10, decimals);
  //   return Math.floor(num * factor) / factor;
  // }
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="pt-[75px] md:pt-[173px] relative">
      {/* <img
        className="animate-spin-slow xl:size-[161px] md:size-[80px] size-[70px] absolute -left-3 md:top-[120px] top-9 pointer-events-none md:block hidden"
        src={circleBlueDot}
        alt="circle,"
      /> */}
      <div className="lg:size-[204px] size-[100px] bg-tron-blue lg:blur-[200px] blur-[100px] rounded-full absolute lg:-right-[100px] -right-12 md:top-0px top-8 pointer-events-none"></div>
      <div className="xl:max-w-[1180px] px-5 mx-auto container" id="readmore">
        <PrimaryHeading
          className="text-center mb-2.5 [text-shadow:0px_0px_7.2px_#00000030] max-w-[542px] mx-auto"
          Children="Switch & Save Calculate Your Savings"
        />
        <p className="max-w-[450px] text-center mx-auto font-normal text-base leading-lh_150 text-cyan-blue text-opacity-70 font-poppins">
          Compare your current plan with new offers and see how much you can
          save.
        </p>
        <SwitchSmartphone
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <div className="mt-10 flex max-sm:flex-col items-center gap-6 lg:gap-10 max-w-[545px] mx-auto">
          <div className="w-full">
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={handleToggle}
                className="p-4 outline-none border border-navy-blue rounded-xl font-poppins font-medium text-lg text-black w-full sm:max-w-[301px] min-w-[301px] h-[60px] cursor-pointer flex items-center justify-between"
              >
                {selectedOption.label}{" "}
                {/* Display the label of the selected option */}
                <span
                  className={`transform transition-transform ${isOpen ? "rotate-180" : ""
                    }`}
                >
                  <Icons icon="selectIcon" />
                </span>
              </div>
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 border border-navy-blue rounded-xl bg-white z-40 overflow-hidden">
                  {SELECT_OPTION_LIST.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(option)}
                      className="p-3 hover:bg-gray-100 cursor-pointer font-normal text-base leading-lh_150 text-cyan-blue text-opacity-70 font-poppins"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="minus"
              disabled={isValue <= 1}
              onClick={decrementValue}
              className="rounded-xl disabled:hover:opacity-100 disabled:cursor-not-allowed duration-300 hover:bg-navy-blue bg-grey-cloud flex items-center justify-center size-12 sm:size-[60px]"
            >
              <Icons icon="minus" />
            </button>
            <div className="rounded-xl flex items-center justify-center size-12 sm:size-[60px] border border-navy-blue font-poppins text-2xl font-semibold text-black">
              {isValue}
            </div>
            <button
              aria-label="plus"
              onClick={incrementValue}
              className="rounded-xl disabled:hover:opacity-100 disabled:cursor-not-allowed duration-300 hover:bg-navy-blue bg-grey-cloud flex items-center justify-center size-12 sm:size-[60px]"
            >
              <Icons icon="plus" />
            </button>
          </div>
        </div>
        <div className="pt-16 sm:pt-12 lg:pt-[60px] flex max-w-[1140px] overflow-x-scroll relative xl:gap-5 h-auto">
          {PLAN_DATA_LIST.map((item, index) => (
            <div
              key={index}
              className={`sm:min-w-[270px] min-w-[168px] w-full flex flex-col shadow-[0_0_21.4px_0_#0000000F] hover:shadow-contactUsCard transition-all duration-300 ease-in-out border-transparent h-full group lg:rounded-[20px] overflow-hidden border border-navy-blue border-opacity-25 ${index === 0
                  ? "sticky z-30 top-0 left-0 w-[270px] rounded-sm md:translate-y-0 -translate-y-2.5 border-tron-blue max-md:rounded-tl-lg max-md:rounded-tr-lg"
                  : ""
                }`}
            >
              <div
                className={`${index === 0
                    ? "text-navy-blue bg-tron-blue sm:min-h-[109px] min-h-[135px]"
                    : "bg-brown bg-opacity-70 md:min-h-[109px] sm:min-h-[99px] min-h-[125px] !pb-0"
                  }   p-2.5 sm:p-[18px] !py-6 duration-300`}
              >
                <p
                  className={`drop-shadow-[0_0_7.2px_0_#0000001F] sm:text-start font-inter font-semibold text-2xl !leading-[29px] text-navy-blue ${item.title === "Verizon"
                      ? "text-red"
                      : item.title === "T-Mobile"
                        ? "text-pink"
                        : ""
                    }`}
                >
                  {item.title}
                </p>
                <div className="flex items-center sm:flex-row sm:gap-0 gap-3 flex-col justify-between sm:mt-2">
                  <p
                    className={`font-poppins text-base text-navy-blue ${index === 0 ? "opacity-100" : "text-navy-blue opacity-70"
                      }`}
                  >
                    {item.name}
                  </p>
                  <p
                    className={`drop-shadow-[0_0_7.2px_0_#0000001F] font-inter font-semibold text-navy-blue text-lg !leading-[22px] ${
                      // index === 0 ? "" : "text-navy-blue hidden"
                      index === 0 ? "" : "text-navy-blue"
                      }`}
                  >
                    $
                    {index === 0
                      ? (values[isValue - 1][index].toFixed(1) -
                        selectedValue * isValue) /
                      isValue
                      : index !== 0
                        ? (values[isValue - 1][index] / isValue).toFixed(2)

                        : item.price}
                    /line/mo.
                  </p>
                </div>
                <p className="flex md:justify-end justify-center text-end drop-shadow-[0_0_7.2px_0_#0000001F] font-inter font-semibold text-navy-blue text-sm !leading-[22px]">{item.months}</p>
              </div>
              <div
                className={`${index === 0 ? "bg-white" : "bg-white-100"
                  } h-full duration-300`}
              >
                <div
                  className={`p-2.5 sm:py-[26px] ${selectedOption === SELECT_OPTION_LIST[1] && "sm:h-[293px]"
                    } ${selectedOption === SELECT_OPTION_LIST[1] &&
                    index === 0 &&
                    "sm:!h-[293px]"
                    }`}
                >
                  <div className="flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2">
                    <p
                      className={`font-poppins text-xs sm:text-start !leading-lh_150 ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }   max-w-[214px]`}
                    >
                      {isValue} line(s) w/ AutoPay discount
                    </p>
                    <p
                      className={`font-bold sm:text-start text-center ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        } font-poppins text-bsae !leading-lh_150 whitespace-nowrap`}
                    >$
                      {values[isValue - 1] &&
                        values[isValue - 1][index] !== undefined &&
                        index !== 0
                        ? values[isValue - 1][index].toFixed(1)
                        : index === 0
                          ? values[isValue - 1][index]
                          : 0}
                      {values[isValue - 1]?.length === 5 &&
                        index >= 3 &&
                        values[isValue - 1][index + 1] !== undefined
                        ? ` - ${values[isValue - 1][index + 1].toFixed(1)}`
                        : ""}
                      /<span className="text-sm">mo.</span>
                    </p>
                  </div>
                  <div className="flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2">
                    <p
                      className={`font-poppins text-sm sm:text-start text-center !leading-lh_150 ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }   max-w-[214px]`}
                    >
                      {item.credits}
                    </p>
                    <p
                      className={`font-bold sm:text-start text-center ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        } font-poppins text-bsae !leading-lh_150 whitespace-nowrap`}
                    >
                      ${index === 0 ? selectedValue * isValue : 0}/
                      <span className="text-sm">mo.</span>
                    </p>
                  </div>
                  {/* <div className="flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2">
                    <p
                      className={`font-poppins text-xs sm:text-start text-center !leading-lh_150 ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }  max-w-[214px]`}
                    >
                      Est. min. taxes & fees
                    </p>
                    <p
                      className={`font-medium sm:text-start text-center ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }  font-poppins text-bsae !leading-lh_150`}
                    >
                      18%
                    </p>
                  </div> */}
                  <div className="flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2">
                    <p
                      className={`font-poppins text-xs sm:text-start text-center !leading-lh_150 ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }  max-w-[214px]`}
                    >
                      Similar streaming services
                    </p>
                    <p
                      className={`font-medium sm:text-start text-center ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }  font-poppins text-bsae !leading-lh_150`}
                    >
                      {item.streaming ? "Included" : "Not Included"}
                    </p>
                  </div>
                  <div className="flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2">
                    <p
                      className={`font-poppins text-xs sm:text-start text-center !leading-lh_150 ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }  max-w-[214px]`}
                    >
                      5G Access
                    </p>
                    <p
                      className={`font-medium sm:text-start text-center ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                        }  font-poppins text-bsae !leading-lh_150`}
                    >
                      {item.network5G ? "Included" : "Not Included"}
                    </p>
                  </div>
                </div>
                <div
                  className={`p-4 border-t border-opacity-20 ${index === 0 ? "border-casal" : "border-cyan-blue"
                    }  flex sm:justify-between justify-center sm:flex-row flex-col items-center gap-2`}
                >
                  <p
                    className={`font-poppins text-xs sm:text-start !leading-lh_150 ${index === 0 ? "text-navy-blue" : "text-cyan-blue"
                      }  font-semibold`}
                  >
                    Estimated Total
                  </p>
                  <p
                    className={`font-bold sm:text-end ${index === 0 ? "text-xl" : "text-3xl"
                      } font-poppins text-base !leading-lh_150`}
                  >
                    {/* <sup>$</sup> */}
                    <bold>$</bold>
                    {values[isValue - 1] &&
                      values[isValue - 1][index] !== undefined
                      ? index === 0
                        ? values[isValue - 1][index] -
                        (selectedValue * isValue).toFixed(1)
                        : ((values[isValue - 1][index] || 0)).toFixed(1)
                      : 0}
                    {values[isValue - 1]?.length === 5 &&
                      index >= 3 &&
                      values[isValue - 1][index + 1] !== undefined
                      
                       }
                    /
                    {/* <span className="text-sm sm:text-start text-center"> */}
                      mo.{" "}

                      <span className="text-sm sm:text-start text-center">
                    <span className="inline-block whitespace-nowrap text-xs">
                      +{" "}
                      taxes and fees
                    </span>
                    </span> 
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={openModal} // Open modal on click
            aria-label="get-start"
            className="mt-8 font-semibold w-full max-w-[375px] text-base leading-lh_145 font-jost text-navy-blue bg-tron-blue rounded-full px-5 py-[13.6px] border border-transparent border-solid hover:border-cyan-blue hover:bg-transparent transition-all duration-300 text-center"
          >
            Get Started Now
          </button>
        </div>
        
        <p className="max-w-[675px] text-center mx-auto font-normal text-base leading-lh_150 text-cyan-blue text-opacity-70 font-poppins pt-3">
          Promotional Credit of 24 months automatically applies when all eligibility criteria are met. Click here to see the official promotion being offered and terms and conditions.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="bg-white  relative rounded-lg sm:h-auto h-full w-[100%] sm:w-[700px]">
            <button
              onClick={closeModal}
              className="absolute top-[2px] sm:top-5  sm:pb-1  z-[101] bg-white  rounded-full text-3xl px-2.5 left-[20px] sm:left-5  font-bold text-black"
            >
              &times;
            </button>
            <iframe
              src="https://form.jotform.com/242966086554165"
              className="w-full h-full sm:h-[600px] border-none"
              title="Get Started Form"
            />
          </div>
        </div>
      )}

    </div>
  );
};
export default SwitchCalculate;