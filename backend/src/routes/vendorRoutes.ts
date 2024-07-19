import express from "express";
import {
  vendorLogin,
  vendorProfile,
  vendorRegister,
} from "../controllers/vendorController";

const vendorRouter = express.Router();

vendorRouter.post("/register", vendorRegister);
vendorRouter.post("/login", vendorLogin);
vendorRouter.get("/profile", vendorProfile);

export default vendorRouter;
