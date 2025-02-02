import { prisma } from "../db/db.js";
import { generateJwtToken } from "../libs/jwt-utils.js";
import { checkPassword, generateHashforPassword } from "../libs/passwordutility.js";


export const userLoginService = async(loginData)=> {
    const email=loginData.email;
    const password=loginData.password;
    const user= await prisma.user.findUnique({where:{email: email}});
    if (!user){
        // return {message:"no user found"};
        throw new Error("Invalid User", {cause:"noSuchUser"});
    }
    const isPasswordSame = await checkPassword(password, user.password);
    if(isPasswordSame){
        const token =generateJwtToken(user.id);
        delete user.password;
        return{message:"Login successful", user, token};
    }
    // return {message: "Login unsuccessful"};
    throw new Error("Invalid Credentials", {cause:"invalidCredentials"});

}



export const getUsersService = async () => {
    const allUsers= await prisma.user.findMany({omit:{password:true}});
    return allUsers;
  };

  export const registerUserService= async(registerUserData)=>{
    const hashedPassword = await generateHashforPassword(registerUserData.password);

    const res = await prisma.user.create({
        data: {
            fullName:registerUserData.fullName,
            email:registerUserData.email,
            password:hashedPassword,
            gender:registerUserData.gender
        },
        omit: {
            password:true,
        }
    },);
    const token=generateJwtToken(res.id);
    return {res, token};
  }
  
export const getUserProfileService = async (userId) => {
    const user= await prisma.user.findUnique(
        {where:{id:userId},
        omit:{password:true}});
    //console.log(user);
    return user;
  };
  
  