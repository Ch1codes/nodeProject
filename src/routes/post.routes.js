import {Router} from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { createPostController, getAllPostsController, getPostByIdController } from "../controllers/post.controller.js";



const postRouter=Router();
postRouter
    .route("/")
    .get(authMiddleWare, getAllPostsController)
    .post(authMiddleWare, createPostController);

postRouter.get('/',getAllPostsController)
postRouter
    .route("/:postId")
    .get(authMiddleWare, getPostByIdController)
//     .patch(updatePostController)
//     .delete(deletePostController);


export default postRouter;