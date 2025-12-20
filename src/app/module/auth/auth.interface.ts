import { Types } from "mongoose";

export interface IAuth {
    
    name: string;
    phone: string;
    email: string;
    password: string;
    address?: string;
    image?: string;

}

export interface TLoginUser {
    email: string;
    password: string;
}

export interface IResetPassword {
    email: string;
    newPassword: string;
    confirmPassword: string;
}