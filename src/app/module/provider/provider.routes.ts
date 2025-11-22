import express from "express";
        import auth from "../../middlewares/auth";
        import validateRequest from "../../middlewares/validateRequest";
        import providerValidations from "./provider.validation";
        import providerController from "./provider.controller";
        

        const router = express.Router();

        

        export const providerRoutes = router;