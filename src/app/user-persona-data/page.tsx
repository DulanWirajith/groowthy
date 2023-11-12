"use client";
import { useState } from "react";
import Link from "next/link";

export default function UserPersonaData() {
    const [ productOrService, setProductOrService ] = useState('');
    const [ targetAudience, setTargetAudience ] = useState('');

    return (
        <div className="flex flex-col items-center justify-center h-full md:h-screen"
             style={ { height: 'calc(100vh - 60px)' } }>
            <div className="mt-10 max-w-md w-full px-4">
                <div className="text-center lg:text-left">
                    <p className="[font-family:'Poppins',Helvetica] font-bold text-transparent text-4xl lg:text-4xl leading-14 ">
                        <span className="text-[#ff6363]">Create</span> <span className="text-black"> user persona</span>
                    </p>
                </div>
                <div className="mt-5">
                    <p className="[font-family:'Poppins',Helvetica] text-black text-lg">
                        What is your product or service?
                    </p>
                    <input
                        type="text"
                        value={ productOrService }
                        onChange={ (e) => setProductOrService(e.target.value) }
                        className="border-2 border-gray-500 rounded px-4 py-2 mt-2 text-black w-full lg:w-80"
                        placeholder="Example: News Website"
                    />
                    <br/>
                    <br/>
                    <p className="[font-family:'Poppins',Helvetica] text-black text-lg">
                        What is your target audience?
                    </p>
                    <input
                        type="text"
                        value={ targetAudience }
                        onChange={ (e) => setTargetAudience(e.target.value) }
                        className="border-2 border-gray-500 rounded px-4 py-2 mt-2 text-black w-full lg:w-80"
                        placeholder="Example: Startup founders"
                    />
                </div>
                <div className="mt-10 flex justify-center lg:justify-start">
                    <Link href="/user-persona">
                        <button
                            className="bg-[#ff6363] text-white font-Poppins font-medium text-lg lg:text-xl leading-8 lg:leading-10 px-5 py-3 w-full lg:w-40 rounded rounded-8">
                            Generate
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
