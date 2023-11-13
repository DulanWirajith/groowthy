"use client";
import Card from "@/components/card";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { ClipLoader } from "react-spinners";

interface Message {
    problemsPainPoints: string[];
    goals: string[];
    userDescription: string;
    behaviorsInsights: string[];
    userQuote: string;
}

export default function UserPersona() {
    const searchParams = useSearchParams()
    const [ productOrService, setProductOrService ] = useState<string>('');
    const [ targetAudience, setTargetAudience ] = useState<string>('');
    const [ dataLoading, setDataLoading ] = useState<boolean>(true);
    const [ description, setDescription ] = useState<string>('');
    const [ problems, setProblems ] = useState<string[]>([]);
    const [ behaviours, setBehaviours ] = useState<string[]>([]);
    const [ needs, setNeeds ] = useState<string[]>([]);
    const [ goals, setGoals ] = useState<string[]>([]);
    const [ quote, setQuote ] = useState<string>('');

    useEffect(() => {
        setProductOrService(searchParams.get('productOrService') || '');
        setTargetAudience(searchParams.get('targetAudience') || '');
    }, [ searchParams ]);

    useEffect(() => {
        setDataLoading(true)
        const data = {
            targetAudience,
            productOrService,
        };
        if (targetAudience !== '' && productOrService !== '') {
            fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(async (res) => {
                    const { message }: { message: Message } = await res.json();
                    setProblems(message.problemsPainPoints);
                    setGoals(message.goals);
                    setDescription(message.userDescription);
                    setBehaviours(message.behaviorsInsights);
                    setQuote(message.userQuote);
                    setDataLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    console.error('Failed to fetch data');
                    setDataLoading(false);
                });
        }
    }, [ targetAudience, productOrService ]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="mt-10 max-w-screen-lg w-full">
                { dataLoading ? (
                    <div className="text-center">
                        <ClipLoader color="#61A3BA" loading={ dataLoading } size={ 50 }/>
                        <p className="mt-4 text-gray-500">Embarking on the persona creation journey. Just a moment, it
                            is like baking a digital masterpiece—anticipate around 2 minutes. Thanks for your
                            understanding!.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <p className="[font-family:'Poppins',Helvetica] font-bold text-transparent text-[38px] tracking-[0] leading-[56.2px]">
                                <span className="text-black"> { targetAudience } 🧑‍🎓</span>
                            </p>
                        </div>
                        <section className="mt-8 lg:mt-16 w-full">
                            <div className="mb-8">
                                <p className="[font-family:'Poppins',Helvetica] text-black text-[20px] font-light">
                                    { description }
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="w-full lg:w-1/2">
                                    <Card
                                        title="Problems 🤔"
                                        reasons={ problems }
                                        bgColor="#61A3BA"
                                        borderColor="#61A3BA"
                                    />
                                    <Card
                                        title="Barriers 😬"
                                        reasons={ behaviours }
                                        bgColor="#0174BE"
                                        borderColor="#0174BE"
                                    />
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <Card
                                        title="Goals 🧐"
                                        reasons={ goals }
                                        bgColor="#FF7676"
                                        borderColor="#FF7676"
                                    />
                                    <Card
                                        title="Summary 😎"
                                        reasons={ [ quote ] }
                                        bgColor="#748E63"
                                        borderColor="#748E63"
                                        removeNumbers={ true }
                                    />
                                </div>
                            </div>
                        </section>
                    </>
                ) }
            </div>
        </div>
    );
}
