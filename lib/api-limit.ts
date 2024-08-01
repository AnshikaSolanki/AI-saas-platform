import { auth } from "@clerk/nextjs/server";

import prismadb from "./prismadb";

import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async() =>{
    const { userId } = auth();
    if(!userId){
        return;
    }
    const userApiLimit = await prismadb.userapilimit.findUnique({
        where:{
            userId
        }
    });
    if(userApiLimit){
        await prismadb.userapilimit.update({
            where: {
                userId: userId
            },
            data:{
                count: userApiLimit.count+1
            },
        })
    }
    else{
        await prismadb.userapilimit.create({
            data:{ userId: userId, count: 1}
        })
    }
};

export const checkApiLimit = async() =>{
    const { userId } = auth();
    if(!userId){
        return false;
    }

    const userApiLimit = await prismadb.userapilimit.findUnique({
        where:{ userId: userId}
    });
    if(!userApiLimit || userApiLimit.count <MAX_FREE_COUNTS){
        return true;
    }else{
        return false;
    }
};

export const getApiLimitCount = async() =>{
    const { userId } = auth();
    if(!userId){
        return 0;
    }
    const userApiLimit = await prismadb.userapilimit.findUnique({
        where:{
            userId: userId
        }
    });
    if(!userApiLimit){
        return 0;
    }
    return userApiLimit.count;

};