import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import customerValidations from "./customer.validation";
import customerController from "./customer.controller";


const router = express.Router();



export const customerRoutes = router;