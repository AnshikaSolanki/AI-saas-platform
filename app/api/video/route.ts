import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import  Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(
    req: Request
){
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;
        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }
        if(!prompt){
            return new NextResponse("Prompt is required", {status: 400});
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro){
            return new NextResponse("Free trial has expired.", {
                status: 403
            })
        }

        const response = await replicate.run("lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f", { input:{
            n_prompt: prompt
        } });
        if(!isPro){
            await increaseApiLimit();
        }
        return NextResponse.json(response);

    }catch(error){
        console.log("[Video Error]", error);
        return new NextResponse("Internal Error", { status: 500});
    }

}