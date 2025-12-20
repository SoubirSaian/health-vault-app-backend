import { Types } from "mongoose";

export interface ISettings {
    // id: string;
    description: string;
}

export interface IFaq{
    question: string;
    answer: string;
}

export interface IHelpAndSupport {
    phone: string;
    email: string;
    description: string;
}