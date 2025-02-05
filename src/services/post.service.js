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