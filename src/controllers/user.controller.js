import { StatusCodes } from "http-status-codes";
import { userLoginService, getUsersService, registerUserService, getUserProfileService } from "../services/user.service.js";
import { createUserSchema } from "../schemas/user.schema.js";



export const userLoginController=async(req, res, next   )=> {
    try{
        const data = await userLoginService(req.body);
        res.status(StatusCodes.ACCEPTED).json(data);
    }
    catch(error){
        console.log(error);
        next(error);
    }
    
}

export  const getUsersController= async(req, res, next)=> {
    try{
        const userData = await getUsersService();
     res.status(StatusCodes.OK).json(userData);
    // throw new Error("something is not right");
    }
    catch(error){
        console.error(error);
        next(error);
    }
}

export const registerUserController = async(req, res, next)=> {
    try{
        createUserSchema.parse(req.body);
        const data = await registerUserService(req.body);
        res.status(StatusCodes.OK).json(data);

    }
    catch(error){
        console.error(error);
        next(error);
    }
}

export  const getUserProfileController= async(req, res, next)=> {
    try{
        
        console.log(req.userId);
        const userData = await getUserProfileService(req.userId);
        res.status(StatusCodes.ACCEPTED).json(userData);
    // throw new Error("something is not right");
    }
    catch(error){
        console.error(error);
        next(error);
    }
}