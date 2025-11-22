import { profile } from "console";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import { sendVerificationEmail } from "../../../helper/emailHelper";
import { createToken } from "../../../helper/jwtHelper";
import generateVerifyCode from "../../../utilities/codeGenerator";
import { IUser } from "../user/user.interface";
import UserModel from "../user/user.model";
import { JwtPayload, Secret,SignOptions } from "jsonwebtoken";
import { TLoginUser } from "./auth.interface";
import { comparePassword } from "../../../helper/bcryptHelper";
import CustomerModel from "../customer/customer.model";
import ProviderModel from "../provider/provider.model";
import { ICustomer } from "../customer/customer.interface";
import { IProvider } from "../provider/provider.interface";

const registerUserService = async (payload: IUser) => {
    // Service logic goes here
    const {name,email,contact,password,role} = payload;
    const newUser = await UserModel.create({
        name,
        email,
        contact,
        password,
        role
    });
    if(!newUser){
        throw new ApiError(400,'Failed to create user');
    }

    //generate verification code
    const {code,expiredAt} = generateVerifyCode(10);

    newUser.verificationCode = code;
    await newUser.save();

    //send email with verification code
    await sendVerificationEmail(newUser.email,{
        name: newUser.name,
        code: code
    });

    //generate token
    const tokenPayload = {
        userId: newUser?._id as string,
        // profileId: newUser?._id as string,
        role: newUser?.role,
        email: newUser?.email
    };

    const accessToken: string =  createToken(
        tokenPayload,
        config.jwt.secret as Secret,
        config.jwt.expires_in as SignOptions["expiresIn"]
    );

    const user : object = {
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
        role: newUser.role,
        
    }

    return {user,accessToken};
}
const loginUserService = async (payload: TLoginUser) => {
    const {email,password} = payload;

    // Service logic goes here
    const user = await UserModel.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, 'This user does not exist');
    }
    
    if (user.isBlocked) {
        throw new ApiError(403, 'This user is blocked');
    }
    // if (!user.isVerified) {
    //     throw new ApiError(
    //         403,
    //         'You are not verified user . Please verify your email'
    //     );
    // }

    // checking if the password is correct ----
    // if (user.password && !(await UserModel.isPaswordMatched(password, user.password))) {
    //     throw new ApiError(403, 'Password do not match');
    // }

    if(!comparePassword(password,user.password)){
        throw new ApiError(403,'Password do not match');
    }


    //generate token
    const tokenPayload = {
        userId: user?._id as string,
        profileId: user?.profile as string,
        role: user?.role,
        email: user?.email
    };

    const accessToken: string =  createToken(
        tokenPayload,
        config.jwt.secret as Secret,
        config.jwt.expires_in as SignOptions["expiresIn"]
    );


    const newUser : object = {
        name: user?.name,
        email: user?.email,
        contact: user?.contact,
        role: user.role,
        
    }

    return {user: newUser,accessToken};
}
const completeUserService = async (userDetails: JwtPayload,payload: ICustomer | IProvider) => {
    // Service logic goes here
    const {userId,role} = userDetails;

    let profile;

    switch (role) {
        case 'customer':
             profile = await CustomerModel.create({...payload,user: userId});
        case 'provider':
            profile = await ProviderModel.create({...payload,user: userId});
             
        default:
            throw new ApiError(400,'Invalid user role');
    }

    if(!profile){
        throw new ApiError(400,'Failed to create profile');
    }

    //update user profile field
    const user = await UserModel.findByIdAndUpdate(
        userId,
        { profile: profile._id },
        { new: true }
    );

    if(!user){
        throw new ApiError(404,'User not found');
    }       

    return profile; 
}


const AuthServices = { 
    registerUserService,
    loginUserService,
    completeUserService
};
export default AuthServices;