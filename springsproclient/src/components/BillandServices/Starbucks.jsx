import starbucks from "../../assets/images/manorbit.svg"
const Starbucks = () => {
    return(<>
    <div className="bg-blue-400 py-12 w-full">
        <div className="container flex justify-center mx-auto px-4 xl:px-[120px]">
            <div className="w-fit flex flex-col items-center">
                <img src={starbucks} alt="" />
                <h1 className="font-poppins text-center  font-[425] mt-7 text-[white] text-3xl">
                How Smart Spaces Power Better Banking
                </h1>
                <p className="text-[white] font-[425] text-center text-[17px] mt-8">Boosting connectivity, data, and security for financial institutions.</p>
                <button className="text-black hover:border-black hover:bg-transparent transition-all bg-tron-blue px-6 border-2 border-tron-blue mt-5 inter text-base sm:text-sm py-2.5 rounded-full font-medium tracking-wide">
READ MORE
    </button>
            </div>
        </div>
    </div>    
    </>)
}
export default Starbucks;