import { StatusCodes } from "http-status-codes";
import {prisma} from "../db/db.js"
export const getAllPostsService = async()=>{
    const posts = await prisma.post.findMany();
    return posts;
}
export const createPostService = async(postData)=>{
    const posts = await prisma.post.create({
        data: {
            userId:postData.id,
            content:postData.content,
            likesCount:postData.likesCount,
        }
    },);
    return posts;
}