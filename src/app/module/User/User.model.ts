import { model, models, Schema } from "mongoose";
import { IUser } from "./User.interface";
import bcrypt from "bcrypt";
import config from "../../../config";


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true,"Name is required"],
    },
    email: {
        type: String,
        required: [true,"email is required"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    phone: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: ''
    },
    campaign: {
        type: Number,
        default: 0
    },
    // isMoveAndDeliver: {
    //     type: Boolean,
    //     default: true
    // },
    // isBuyAndDeliver: {
    //     type: Boolean,
    //     default: true
    // },
    // isRecycle: {
    //     type: Boolean,
    //     default: true
    // },
    // isRemove: {
    //     type: Boolean,
    //     default: true
    // },
    isBlockd: {
        type: Boolean,
        default: false
    },
    
}, { timestamps: true });

// UserSchema.pre('save', async function (next) {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const user = this;
//     if (user.password) {
//         user.password = await bcrypt.hash(
//             user.password,
//             Number(config.bcrypt.salt_round)
//         );
//     }
//     next();
// });

// UserSchema.post('save', function (doc, next) {
//     doc.password = '';
//     next();
// });

// // statics method for check is user exists
// UserSchema.statics.isUserExists = async function (phoneNumber: string) {
//     return await UserModel.findOne({ phoneNumber }).select('+password');
// };

// // statics method for check password match  ----
// UserSchema.statics.isPasswordMatched = async function (
//     plainPasswords: string,
//     hashPassword: string
// ) {
//     return await bcrypt.compare(plainPasswords, hashPassword);
// };

// UserSchema.statics.isJWTIssuedBeforePasswordChange = async function (
//     passwordChangeTimeStamp,
//     jwtIssuedTimeStamp
// ) {
//     const passwordChangeTime =
//         new Date(passwordChangeTimeStamp).getTime() / 1000;

//     return passwordChangeTime > jwtIssuedTimeStamp;
// };

const UserModel = models.User || model<IUser>("User", UserSchema);

export default UserModel;