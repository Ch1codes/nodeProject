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

export const deletePostByIdService = async(postId, loggedInUserId)=>{
    const post = await prisma.post.findUnique({where:{id:postId}});
    if (!post){
        throw new Error("Not Found", {cause: "NotFoundCustom"});
    }
    if(post.userId==loggedInUserId){
        const deletedPost = await prisma.post.delete({where:{id:postId}});
        return deletedPost;
    }else{
        throw new Error("Unauthorized for the user", {cause: "UnauthorizedCustom"})
    }
    
}