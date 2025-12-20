import { Types } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    isEmailVerified: boolean;
    verificationCode: string;
    campaign: number;
    isMoveAndDeliver: Boolean;
    isBuyAndDeliver: Boolean;
    isRecycle: Boolean;
    isRemove: Boolean;
    isBlockd: boolean;

}





export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// export interface IUserRole {

// }