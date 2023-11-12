"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [ productOrService, setProductOrService ] = useState('');
    const [ targetAudience, setTargetAudience ] = useState('');

    return (
        <div className="flex flex-row justify-center w-full h-full">
            <div className="mt-36 flex flex-col">
                <div className=" text-center ">
                    <p className="[font-family:'Poppins',Helvetica] font-bold text-transparent text-[38px] tracking-[0] leading-[56.2px]">
                        <span className="text-[#ff6363]">Create</span> <span className="text-black"> user persona</span>
                    </p>
                </div>
                <div className="mt-5">
                    <p className="[font-family:'Poppins',Helvetica] text-black text-[20px]">
                        What is your product or service?
                    </p>
                    <input
                        type="text"
                        value={ productOrService }
                        onChange={ (e) => setProductOrService(e.target.value) }
                        className="border-2 border-gray-500 rounded px-4 py-2 mt-2 text-black w-80"
                        placeholder="Example: News Website"
                    />
                    <br/>
                    <br/>
                    <p className="[font-family:'Poppins',Helvetica] text-black text-[20px]">
                        What is your target audience?
                    </p>
                    <input
                        type="text"
                        value={ targetAudience }
                        onChange={ (e) => setTargetAudience(e.target.value) }
                        className="border-2 border-gray-500 rounded px-4 py-2 mt-2 text-black w-80"
                        placeholder="Example: Startup founders"
                    />

                </div>
                <div className="mt-10 flex justify-start">
                    <Link href="/user-persona">
                        <button
                            className="bg-[#ff6363] text-white font-Poppins font-medium text-24px leading-32.04px px-5 py-3 w-40 rounded rounded-8">
                            Generate
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}
