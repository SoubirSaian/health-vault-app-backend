
        import ApiError from "../../../error/ApiError";
        import { IPost } from "./Post.interface";
        import PostModel from "./Post.model";

        const updateUserProfile = async (id: string, payload: Partial<IPost>) => {
            if (payload.email || payload.username) {
                throw new ApiError(400, "You cannot change the email or username");
            }
            const user = await PostModel.findById(id);
            if (!user) {
                throw new ApiError(404, "Profile not found");
            }
            return await PostModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
        };

        const PostServices = { updateUserProfile };
        export default PostServices;