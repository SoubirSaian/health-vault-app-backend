
        import catchAsync from "../../../utilities/catchasync";
        import sendResponse from "../../../utilities/sendResponse";
        import PostServices from "./Post.service";

        const updateUserProfile = catchAsync(async (req, res) => {
            const { files } = req;
            if (files && typeof files === "object" && "profile_image" in files) {
                req.body.profile_image = files["profile_image"][0].path;
            }
            const result = await PostServices.updateUserProfile(
                req.user.profileId,
                req.body
            );
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "Profile updated successfully",
                data: result,
            });
        });

        const PostController = { updateUserProfile };
        export default PostController;