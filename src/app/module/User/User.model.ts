import { model, Schema, models } from "mongoose";
import { IUser } from "./user.interface";
import { USER_ROLE } from "../../../utilities/enum";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>({
    profile: { 
        type: Schema.Types.ObjectId
     },
    name: { 
        type: String,
        required: true 
    },
    contact: { 
        type: String, 
        required: true
    },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String,
        required: true 
    },
    role :{
        type: String,
        enun: Object.values(USER_ROLE),
        required: true
    },
    isEmailVerified: { 
        type: Boolean,
        default: false 
    },
    isBlockd: {
        type: Boolean,
        default: false
    },
    verificationCode: { 
        type: String,
        default: null
    }
   
}, { timestamps: true });

//hash password before saving
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.password) {
        user.password = await bcrypt.hash(
            user.password,
            Number(config.bcrypt.salt_round)
        );
    }
    next();
});

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// statics method for check is user exists
userSchema.statics.isUserExists = async function (email: string) {
    return await UserModel.findOne({ email }).select('+password');
};

// statics method for check password match  ----
userSchema.statics.isPasswordMatched = async function (
    plainPasswords: string,
    hashPassword: string
) {
    return await bcrypt.compare(plainPasswords, hashPassword);
};

const UserModel = models.User || model<IUser>("User", userSchema);

export default UserModel;