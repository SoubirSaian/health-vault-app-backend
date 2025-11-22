import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import AuthValidations from "./auth.validation";
import AuthController from "./auth.controller";


const authRouter = express.Router();

authRouter.post("/register-user",validateRequest(AuthValidations.registerUserValidationSchema) , AuthController.registerUser);

authRouter.post("/login-user",validateRequest(AuthValidations.loginValidationSchema)  ,AuthController.loginUser);

authRouter.post("/complete-user-profile",
    validateRequest(AuthValidations.completeProfileValidationSchema),
    AuthController.completeUserProfile
);


export default authRouter;