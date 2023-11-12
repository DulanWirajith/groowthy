import Link from "next/link";

export default function UserPersona() {
    const buttonStyle = { width: '200px' };

    return (
        <div className="flex flex-col items-center justify-center h-full md:h-screen"
             style={ { height: 'calc(100vh - 60px)' } }>
            <div className="mt-12 max-w-screen-lg w-full">
                <div className="text-center">
                    <p className="[font-family:'Poppins',Helvetica] font-bold text-transparent text-4xl lg:text-5xl leading-10 lg:leading-14">
                        <span className="text-[#ff6363]">Supercharge</span> <span className="text-black"> your</span>
                        <br/>
                        <span className="text-black"> marketing journey </span>
                    </p>
                </div>
                <div className="mt-5">
                    <p className="[font-family:'Poppins',Helvetica] text-black text-lg lg:text-xl text-center">
                        Elevate your brand with our dynamic solutions, <br/>reach unparalleled success in the digital
                        landscape 🚀
                    </p>
                </div>
                <div className="mt-8 flex flex-col lg:flex-row items-center justify-center">
                    <Link href="/user-persona-data/">
                        <button style={ buttonStyle }
                                className="bg-[#ff6363] text-white font-Poppins font-medium text-lg lg:text-xl leading-8 lg:leading-10 px-5 py-3 rounded rounded-8 mb-4 lg:mb-0 lg:mr-4">
                            Try For Free
                        </button>
                    </Link>
                    <Link href="/pricing/">
                        <button style={ buttonStyle }
                                className="bg-white text-black border-2 border-gray-400 font-Poppins font-medium text-lg lg:text-xl leading-8 lg:leading-10 px-5 py-3 rounded rounded-8">
                            Pricing
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
