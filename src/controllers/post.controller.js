import { StatusCodes } from "http-status-codes";
import { createPostService, getAllPostsService, getPostByIdService } from "../services/post.service.js";
import { createPostSchema } from "../schemas/post.schema.js";
export const getAllPostsController=async (req, res, next)=>{
    try {
        const posts = await getAllPostsService();
        res.status(StatusCodes.OK).json(posts);
    }
    catch(error){
        console.error(error);
        next(error);
    }
}
export const createPostController = async (req, res, next)=>{
    try {
        createPostSchema.parse(req.body);
        
        const data = await createPostService(req.body, req.userId);
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export const getPostByIdController=async (req, res, next)=>{
    try {
        const postId=req.params.postId;
        
        console.log(postId,"hello hello");
        const post = await getPostByIdService(postId);
        res.status(StatusCodes.OK).json(post);
    }
    catch(error){
        console.error(error);
        next(error);
    }
}