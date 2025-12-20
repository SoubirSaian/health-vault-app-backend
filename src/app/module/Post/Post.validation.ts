import { z } from "zod";

        export const updatePostData = z.object({
            body: z.object({
                name: z.string().optional(),
                phone: z.string().optional(),
                address: z.string().optional(),
            }),
        });

        const PostValidations = { updatePostData };
        export default PostValidations;