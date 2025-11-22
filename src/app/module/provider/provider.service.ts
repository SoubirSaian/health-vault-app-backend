
        import ApiError from "../../../error/ApiError";
        import { IProvider } from "./provider.interface";
        import providerModel from "./provider.model";

        const updateUserProfile = async (id: string, payload: Partial<IProvider>) => {
            if (payload.email || payload.username) {
                throw new ApiError(400, "You cannot change the email or username");
            }
            const user = await providerModel.findById(id);
            if (!user) {
                throw new ApiError(404, "Profile not found");
            }
            return await providerModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
        };

        const ProviderServices = { updateUserProfile };
        export default ProviderServices;