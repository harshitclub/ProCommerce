import express from "express";
import {
  vendorLogin,
  vendorProfile,
  vendorRegister,
} from "../controllers/vendorController";
import { isLogin, isVendor } from "../middlewares/auth";

const vendorRouter = express.Router();

vendorRouter.post("/register", vendorRegister);
vendorRouter.post("/login", vendorLogin);
vendorRouter.get("/profile", isLogin, isVendor, vendorProfile);

export default vendorRouter;
