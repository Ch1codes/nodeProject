import { StatusCodes } from "http-status-codes";
import {prisma} from "../db/db.js"
export const getAllPostsService = async()=>{
    const posts = await prisma.post.findMany({include:{User:{omit:{password:true}}}});
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

export const updatePostByIdService = async(postId,updatedContent, loggedInUserId)=>{
    const post = await prisma.post.findUnique({where:{id:postId}});
    if (!post){
        throw new Error("Not Found", {cause: "NotFoundCustom"});
    }
    if(updatedContent.like){
        post.likesCount=post.likesCount+1;
    }
    
    if(post.userId==loggedInUserId){
        const updatedPost = await prisma.post.update({
            where:{id:postId},
            data: {
                content:updatedContent.content,
                likesCount:post.likesCount
            }
        },);
        return updatedPost;
        
    }else{
        throw new Error("Unauthorized for the user", {cause: "UnauthorizedCustom"})
    }
}