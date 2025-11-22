import ApiError from "../../../error/ApiError";
import { ICustomer } from "./customer.interface";
import customerModel from "./customer.model";

const updateUserProfile = async (id: string, payload: Partial<ICustomer>) => {
    if (payload.email || payload.username) {
        throw new ApiError(400, "You cannot change the email or username");
    }
    const user = await customerModel.findById(id);
    if (!user) {
        throw new ApiError(404, "Profile not found");
    }
    return await customerModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const CustomerServices = { updateUserProfile };
export default CustomerServices;