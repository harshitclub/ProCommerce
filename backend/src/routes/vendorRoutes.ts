import express from "express";
import {
  vAddProduct,
  vendorLogin,
  vendorProfile,
  vendorRegister,
} from "../controllers/vendorController";
import { isLogin, isVendor } from "../middlewares/auth";

const vendorRouter = express.Router();

// POST Request
vendorRouter.post("/register", vendorRegister);
vendorRouter.post("/login", vendorLogin);
vendorRouter.post("/product/add", vAddProduct);

// Get Request
vendorRouter.get("/profile", isLogin, isVendor, vendorProfile);

// Patch Request

// Delete Request

export default vendorRouter;
