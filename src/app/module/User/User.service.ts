import ApiError from "../../../error/ApiError";
import { IUser } from "./User.interface";
import UserModel from "./User.model";

const updateUserProfile = async (id: string, payload: Partial<IUser>) => {
    if (payload.email || payload.username) {
        throw new ApiError(400, "You cannot change the email or username");
    }
    const user = await UserModel.findById(id);
    if (!user) {
        throw new ApiError(404, "Profile not found");
    }
    return await UserModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const UserServices = { updateUserProfile };
export default UserServices;