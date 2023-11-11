import Link from "next/link";

export default function UserPersona() {
    return (
        <div className="flex flex-row justify-center w-full h-full">
            <div className="mt-48 flex flex-col">
                <div className=" text-center ">
                    <p className="[font-family:'Poppins',Helvetica] font-bold text-transparent text-[60px] tracking-[0] leading-[56.2px]">
                        <span className="text-[#ff6363]">Supercharge</span> <span className="text-black"> your</span>
                        <br/>
                        <span className="text-black"> marketing journey </span>
                    </p>
                </div>
                <div className="mt-5">
                    <p className="[font-family:'Poppins',Helvetica] text-black text-[24px] text-center">
                        Elevate your brand with our dynamic solutions, <br/>reach unparalleled success in the digital
                        landscape 🚀
                    </p>
                </div>
                <div className="mt-10 flex justify-center">
                    <Link href="/user-persona-data/">
                        <button
                            className="bg-[#ff6363] text-white font-Poppins font-medium text-24px leading-32.04px px-5 py-3 w-40 rounded rounded-8">Try
                            For Free
                        </button>
                    </Link>
                    <button
                        className="text-black border-2 border-gray-400 font-Poppins font-medium text-24px leading-32.04px px-5 py-3 w-40 rounded rounded-8 ml-4">Pricing
                    </button>
                </div>
            </div>

        </div>
    );
}
