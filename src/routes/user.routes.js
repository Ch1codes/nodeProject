import {Router} from "express";
import { getUserProfileController, getUsersController, registerUserController, userLoginController } from "../controllers/user.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const userRouter=Router();


userRouter.post('/login', userLoginController)
userRouter.get('/allUsers', getUsersController)
userRouter.post('/register', registerUserController)
userRouter.get('/:userId', authMiddleWare, getUserProfileController)



export default userRouter;