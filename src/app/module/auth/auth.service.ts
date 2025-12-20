import { profile } from "console";
import config from "../../../config";
import ApiError from "../../../error/ApiError";
import mongoose from "mongoose";
import { sendVerificationEmail } from "../../../helper/emailHelper";
import { createToken } from "../../../helper/jwtHelper";
import generateVerifyCode from "../../../utilities/codeGenerator";
import { IUser } from "../User/User.interface";
import UserModel from "../User/User.model";
import { JwtPayload, Secret,SignOptions } from "jsonwebtoken";
import { IResetPassword, TLoginUser } from "./auth.interface";
import { IJwtPayload } from "../../../interface/jwt.interface";



const registerUserService = async (payload: IUser) => {
    // Service logic goes here
    const {name,email,password} = payload;
    
    const emailExist = await UserModel.exists({ email: email });
    
    if (emailExist) {
        throw new ApiError(400, 'This email already exists. Please Login.');
        
    } 
    
    // Generate verification code
    const { code, expiredAt } = generateVerifyCode(10);

        // Prepare user data
        const userDataPayload: Partial<IUser> = {
            name: name,
            email: email.toLocaleUpperCase(),
            password,
            verificationCode: code,
            // 5 minutes expiry
            // codeExpireIn: new Date(Date.now() + 5 * 60000), 
        };

        // Create user
        const user = await UserModel.create(userDataPayload);
        console.log(user);
        

        //send email with verification code
        await sendVerificationEmail(email,{
            name: name,
            code: code
        });

        //generate token
        // const tokenPayload = {
        //     userId: user?._id as string,
        //     email: user?.email
            //    name: user?.name
        // };

        // const accessToken: string =  createToken(
        //     tokenPayload,
        //     config.jwt.secret as Secret,
        //     config.jwt.expires_in as SignOptions["expiresIn"]
        // );

        const newUser : object = {
            name: name,
            email: email
            
        }
        
        return {
            newUser,
            // accessToken
        };

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

    // if(!comparePassword(password,user.password)){
    //     throw new ApiError(403,'Password do not match');
    // }

    if(password !== user.password){
        throw new ApiError(403,'Password do not match');
    }


    //generate token
    const tokenPayload: IJwtPayload = {
        userId: user?._id as string,
        email: user?.email,
        name: user?.name
    };

    const accessToken: string =  createToken(
        tokenPayload,
        config.jwt.secret as Secret,
        config.jwt.expires_in as SignOptions["expiresIn"]
    );


    const newUser : object = {
        name: user?.name,
        email: user?.email,
        // phone: user?.phone,
        // role: user.role,
        
    }

    return {user: newUser,accessToken};
}

const verifyCode = async (payload:{email: string, verifyCode: string}) => {
    const { email, verifyCode } = payload;

    const user = await UserModel.findOne({ email: email }).select("profile email role verificationCode isEmailVerified");

    if (!user) {
        throw new ApiError(404, 'User not found to verify otp');
    }

    // if (user.codeExpireIn < new Date(Date.now())) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'Verify code is expired');
    // }

    if (verifyCode !== user.verificationCode) {
        throw new ApiError(400, "Code doesn't match");
    }

    // const result = await UserModel.findOneAndUpdate(
    //     { email: email },
    //     { isVerified: true },
    //     { new: true, runValidators: true }
    // );

    user.verificationCode = '';
    user.isEmailVerified = true;
    await user.save();

    

    // if (!result) {
    //     throw new AppError(
    //         httpStatus.SERVICE_UNAVAILABLE,
    //         'Server temporary unable please try again letter'
    //     );
    // }

    // Create JWT tokens
    const tokenPayload: IJwtPayload = {
        userId: user?._id,
        email: user?.email,
        name: user?.name
    };

    const accessToken: string =  createToken(
            tokenPayload,
            config.jwt.secret as Secret,
            config.jwt.expires_in as SignOptions["expiresIn"]
        );

    // const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_refresh_secret as string,
    //     config.jwt_refresh_expires_in as string
    // );

    return  {user,accessToken};
};

const sendVerifyCodeService = async (payload:{email: string}) => {
    const { email } = payload;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, 'User not found to send otp');
    }

    const {code, expiredAt} = generateVerifyCode(10);

    
    user.verificationCode = code;

    await user.save();

    await sendVerificationEmail(email,{
        name: user.name,
        code: code
    });

    return null;
}

// reset password
const resetPasswordService = async (payload: IResetPassword) => {
    const { email, newPassword } = payload;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, 'This user does not exist to reset password');
    }

    if (user.isBlocked) {
        throw new ApiError(403, 'This user is blocked. Cannot reset password');
    }

    //hash new password
    // const newHashedPassword = await bcrypt.hash(
    //     payload.password,
    //     Number(config.bcrypt_salt_rounds)
    // );

    user.password = newPassword;
    await user.save();

    //generate new token after password reset
    const tokenPayload: IJwtPayload = {
        userId: user?._id as string,
        email: user?.email,
        name: user?.name
    };

    const accessToken: string =  createToken(
        tokenPayload,
        config.jwt.secret as Secret,
        config.jwt.expires_in as SignOptions["expiresIn"]
    );

    // const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_refresh_secret as string,
    //     config.jwt_refresh_expires_in as string
    // );

    return {user:{name:user.name,email:user.email}, accessToken };
};



const AuthServices = { 
    registerUserService,
    loginUserService,
    verifyCode,
    sendVerifyCodeService,
    resetPasswordService
};
export default AuthServices;