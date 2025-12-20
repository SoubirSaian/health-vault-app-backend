import express from "express";
        import auth from "../../middlewares/auth";
        import validateRequest from "../../middlewares/validateRequest";
        import PostValidations from "./Post.validation";
        import PostController from "./Post.controller";
        

        const router = express.Router();

        

        export const PostRoutes = router;