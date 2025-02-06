import { StatusCodes } from "http-status-codes";
import {prisma} from "../db/db.js"
export const getAllPostsService = async()=>{
    const posts = await prisma.post.findMany();
    return posts;
}
export const createPostService = async(postData, userId)=>{
    const posts = await prisma.post.create({
        data: {
            userId:userId,
            content:postData.content,
        }
    },);
    return posts;
}

export const getPostByIdService = async(postId)=>{
    const post = await prisma.post.findUnique({where:{id:postId}});
    if (!post){
        throw new Error("Not Found", {cause: "NotFoundCustom"});
    }
    return post;
}

export const getPostByUserIdService = async(userId)=>{
    const post = await prisma.post.findMany({where:{userId:userId}});
    if (!post){
        throw new Error("Not Found", {cause: "NotFoundByUserCustom"});
    }
    return post;
}