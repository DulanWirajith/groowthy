'use server'
import OpenAI from 'openai';
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
    if (!process.env.OPENAI_API_KEY) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }

    const data = await req.json() || "";
    if (data.actor.trim().length === 0) {
        return new Response(JSON.stringify({ message: 'Please enter a valid actor' }), {
            status: 400,
            statusText: "Please enter a valid actor"
        });
    }

    try {
        // const completion = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [ { role: "user", content: generatePrompt(data.actor) } ],
        // });
        // console.log("completion >>", completion.choices);
        // // res.status(200).json({ result: completion.choices[0].message.content });
        //
        // const completion2 = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [ {
        //         role: "user",
        //         content: 'write their need to use a car in 5 points, write their goal to use a car in 5 points, their barriers to use a car in 5 points, and then finally summarize the whole thing in 50 words'
        //     } ],
        // });
        // console.log("completion2 >>", completion2.choices);
        return new Response(JSON.stringify({ message: 'Testing' }), {
            status: 200,
            statusText: "Testing"
        });
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${ error.message }`);
        }

    }
}

const generatePrompt = (actor: string): string => `Write a 50-word user persona about a ${ actor } who would use a car. Should be 50 words or more.`;

