import {Router} from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { createPostController, getAllPostsController, getPostByIdController, getPostByUserIdController } from "../controllers/post.controller.js";



const postRouter=Router();
postRouter
    .route("/")
    .get(authMiddleWare, getAllPostsController)
    .post(authMiddleWare, createPostController);

postRouter.get('/',getAllPostsController)
postRouter
    .route("/:postId")
    .get(authMiddleWare, getPostByIdController)
postRouter
    .route("/user/:userId")
    .get(authMiddleWare, getPostByUserIdController)
//     .patch(updatePostController)
//     .delete(deletePostController);


export default postRouter;