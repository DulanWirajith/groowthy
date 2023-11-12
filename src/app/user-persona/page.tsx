"use client";
import Card from "@/components/card";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="mt-10 max-w-screen-lg w-full">
                <div className="text-center">
                    <p className="[font-family:'Poppins',Helvetica] font-bold text-transparent text-[38px] tracking-[0] leading-[56.2px]">
                        <span className="text-black"> Student 🧑‍🎓</span>
                    </p>
                </div>
                <section className="mt-8 lg:mt-16 w-full">
                    <div className="mb-8">
                        <p className="[font-family:'Poppins',Helvetica] text-black text-[20px] font-light">
                            Meet Sarah, a college student seeking a reliable car for seamless campus commuting, weekend
                            escapes with friends, and part-time job travel. Balancing studies and social life, she
                            envisions the car as a gateway to independence, time efficiency, and the freedom to explore
                            opportunities beyond the campus boundaries.
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2">
                            <Card
                                title="Problems 🤔"
                                reasons={ [
                                    'Efficient campus commuting.',
                                    'Weekend getaways with friends.',
                                    'Part-time job or internship travel.',
                                    'Carrying study materials and projects.',
                                    'Independence for errands.asd',
                                ] }
                                bgColor="#61A3BA"
                                borderColor="#61A3BA"
                            />
                            <Card
                                title="Barriers 😬"
                                reasons={ [
                                    'Financial constraints.',
                                    'Limited campus parking.',
                                    'Environmental concerns.',
                                    'Public transportation availability.',
                                    'Insurance and registration complexities.',
                                ] }
                                bgColor="#0174BE"
                                borderColor="#0174BE"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <Card
                                title="Goals 🧐"
                                reasons={ [
                                    'Academic and career opportunities.',
                                    'Strengthened social connections.',
                                    'Improved time management.',
                                    'Practical driving skills.',
                                    'Freedom and autonomy.',
                                ] }
                                bgColor="#FF7676"
                                borderColor="#FF7676"
                            />
                            <Card
                                title="Summary 😎"
                                reasons={ [
                                    'Students seek cars for campus commuting, socializing, work, and independence. Goals include academic and career growth, enhanced social connections, improved time management, driving skills, and a sense of freedom. Barriers encompass financial constraints, parking issues, environmental concerns, transportation alternatives, and administrative complexities.',
                                ] }
                                bgColor="#748E63"
                                borderColor="#748E63"
                                removeNumbers={ true }
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
