import { Types,Model } from "mongoose";

export interface IUser {
    profile: Types.ObjectId;
    name: string
    email: string
    password: string
    contact: string
    role : string
    verificationCode: Number
    isBlockd: boolean
    isEmailVerified: boolean
    // createdAt: timestamp
}


export interface ILoginWithGoogle {
    name: string;
    email: string;
    profile_image?: string;
    phone?: string;
}

export interface UserModel extends Model<IUser> {
    // myStaticMethod(): number;
    isUserExists(phoneNumber: string): Promise<IUser>;
    //   isUserDeleted(email: string): Promise<boolean>;
    //   isUserBlocked(email: string): Promise<boolean>;
    isPasswordMatched(
        plainPassword: string,
        hashPassword: string
    ): Promise<IUser>;
    isJWTIssuedBeforePasswordChange(
        passwordChangeTimeStamp: Date,
        jwtIssuedTimeStamp: number
    ): Promise<boolean>;
}
