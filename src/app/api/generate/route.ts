'use server'
import OpenAI from 'openai';
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type dataObjForModel = {
    targetAudience: string,
    productOrService: string
}

type PersonaDetails = {
    userDescription: string;
    userQuote: string;
    behaviorsInsights: string[];
    problemsPainPoints: string[];
    needs: string[];
    goals: string[];
}

function extractPersonaDetails(completion: any): PersonaDetails {
    console.log('completion in function >>', completion)
    const userMessage = completion[0].message.content;

    const userDescriptionMatch = userMessage.match(/User Description:\n([\s\S]+?)\n\n/);
    const userQuoteMatch = userMessage.match(/User Quote:\n"([\s\S]+?)"\n/);
    const behaviorsInsightsMatch = userMessage.match(/Behaviors and Insights:\n([\s\S]+?)\n\n/);
    const problemsPainPointsMatch = userMessage.match(/Problems or Pain Points:\n([\s\S]+?)\n\n/);
    const needsMatch = userMessage.match(/Needs:\n([\s\S]+?)\n\n/);
    const goalsMatch = userMessage.match(/Goals:\n([\s\S]+)/);

    const userDescription = userDescriptionMatch ? userDescriptionMatch[1].replace(/(?:Name: [\s\S]+?)\n/, '').trim() : '';
    const userQuote = userQuoteMatch ? userQuoteMatch[1].trim() : '';
    const behaviorsInsights = behaviorsInsightsMatch ? behaviorsInsightsMatch[1].trim().split('\n') : [];
    const problemsPainPoints = problemsPainPointsMatch ? problemsPainPointsMatch[1].trim().split('\n') : [];
    const needs = needsMatch ? needsMatch[1].trim().split('\n') : [];
    const goals = goalsMatch ? goalsMatch[1].trim().split('\n') : [];

    return {
        userDescription,
        userQuote,
        behaviorsInsights,
        problemsPainPoints,
        needs,
        goals
    };
}

export async function POST(req: NextRequest, res: NextResponse) {
    if (!process.env.OPENAI_API_KEY) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }

    const data: dataObjForModel = await req.json() || "";
    if (data.targetAudience.trim().length === 0 && data.productOrService.trim().length === 0) {
        return new Response(JSON.stringify({ message: 'Please enter a valid details' }), {
            status: 400,
            statusText: "Please enter a valid details"
        });
    }

    try {
        console.log(generatePrompt(data))
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [ { role: 'user', content: generatePrompt(data) } ],
        });
        // const completion =
        //     [
        //         {
        //             index: 0,
        //             message: {
        //                 role: 'assistant',
        //                 content: 'User Description:\n' +
        //                     'Meet Sarah Thompson, a 28-year-old software engineer from New York City. She has been working in the tech industry for five years and is passionate about creating innovative software solutions. Sarah is highly skilled in various programming languages and has a strong eye for detail.\n' +
        //                     '\n' +
        //                     'User Quote:\n' +
        //                     `"I've spent hours perfecting my resume, but it never seems to capture my true skills and abilities. I need a Resume Generator that truly understands the software engineering industry."\n` +
        //                     '\n' +
        //                     'Behaviors and Insights:\n' +
        //                     '1. Sarah regularly attends industry conferences and networking events to stay updated on the latest trends and technologies.\n' +
        //                     '2. She frequently reads tech blogs and follows influential software engineers on social media platforms to expand her knowledge.\n' +
        //                     '3. Sarah actively participates in coding competitions and contributes to open-source projects to enhance her coding skills.\n' +
        //                     '4. She often seeks feedback from her colleagues and mentors to improve her programming abilities and career prospects.\n' +
        //                     '5. Sarah values simplicity and efficiency in any software she uses, as it helps her focus on her core responsibilities.\n' +
        //                     '\n' +
        //                     'Problems or Pain Points:\n' +
        //                     '1. Sarah struggles to highlight her technical skills and accomplishments effectively in her resume to impress potential employers.\n' +
        //                     '2. She finds it challenging to tailor her resume specifically for different job opportunities within the software engineering field.\n' +
        //                     '3. Sarah faces difficulty in showcasing her relevant projects and experience in a concise and visually appealing manner.\n' +
        //                     '4. The existing resume templates and generators fail to provide software engineering-specific customization options.\n' +
        //                     '5. She often feels overwhelmed by the time-consuming process of creating and updating her resume manually.\n' +
        //                     '\n' +
        //                     'Needs:\n' +
        //                     '1. Sarah needs a Resume Generator that understands the specific technical requirements and industry jargon of software engineering.\n' +
        //                     '2. She requires customization options to showcase her programming languages, frameworks, and software development methodologies effectively.\n' +
        //                     '3. Sarah needs a resume builder that can automatically import her relevant projects from GitHub or other code repositories.\n' +
        //                     '4. She requires a user-friendly interface that allows her to effortlessly modify and update her resume based on job requirements.\n' +
        //                     '5. Sarah needs a Resume Generator that offers templates specifically designed for software engineers, highlighting their skill sets.\n' +
        //                     '\n' +
        //                     'Goals:\n' +
        //                     '1. Sarah aims to create a visually appealing and professional resume that reflects her software engineering expertise accurately.\n' +
        //                     '2. She wants to improve her chances of getting noticed by potential employers and securing interviews for her dream job opportunities.\n' +
        //                     '3. Sarah aspires to demonstrate her problem-solving skills and ability to work in a team through her resume.\n' +
        //                     '4. She seeks a Resume Generator that can streamline the resume creation process and save her valuable time.\n' +
        //                     '5. Sarah wants to present her technical achievements and contributions effectively to stand out among other software engineering candidates.'
        //             },
        //             finish_reason: 'stop'
        //         }
        //     ]

        // console.log("completion >>", completion.choices);
        const personaDetails = extractPersonaDetails(completion.choices);

        // res.status(200).json({ result: completion.choices[0].message.content });
        return new Response(JSON.stringify({ message: personaDetails }), {
            status: 200,
            statusText: "Success"
        });
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${ error.message }`);
        }

    }
}

const generatePrompt = (data: dataObjForModel): string => {
    return `
        I want you to do comprehensive customer research for me.
        Tell me about the user in 75 words. Put a random name and describe it as a real person. Display a quote by the ${ data.targetAudience } related to the ${ data.productOrService }. 
        Then, tell me 5 behaviors and insights, 5 problems or pain points, 5 needs, and 5 goals that a ${ data.targetAudience } experiences related to ${ data.productOrService }. 
        Display the output of the user description, user quote, 5 behaviors and insights, 5 problems or pain points, 5 needs, and 5 goals in section by section.
    `;
};

