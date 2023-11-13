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
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout exceeded')), 180000) // 3 minutes timeout
        );
        console.log(generatePrompt(data))
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [ { role: 'user', content: generatePrompt(data) } ],
        });
        const personaDetails = extractPersonaDetails(completion.choices);
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

