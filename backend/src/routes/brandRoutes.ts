import express from "express";
import {
  blockBrand,
  brandLogin,
  brandProfile,
  brandRegister,
  deleteBrand,
  getAllBrands,
  getBrand,
  unBlockBrand,
} from "../controllers/brandController";
import { isAdmin, isBrand, isLogin } from "../middlewares/auth";

const brandRouter = express.Router();

brandRouter.post("/register", brandRegister);
brandRouter.post("/login", brandLogin);
brandRouter.get("/profile", isLogin, isBrand, brandProfile);

// admin access routes for brand
brandRouter.get("/all", isLogin, isAdmin, getAllBrands);
brandRouter.get("/brand/:id", isLogin, isAdmin, getBrand);
brandRouter.patch("/block/:id", isLogin, isAdmin, blockBrand);
brandRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockBrand);
brandRouter.delete("/vendor/:id", isLogin, isAdmin, deleteBrand);

export default brandRouter;
