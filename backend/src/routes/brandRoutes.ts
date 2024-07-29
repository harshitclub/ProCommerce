import express from "express";
import {
  bAddProduct,
  bChangePassword,
  blockBrand,
  brandLogin,
  brandProfile,
  brandRegister,
  deleteBrand,
  deleteBrandProduct,
  getAllBrands,
  getBrand,
  getBrandProduct,
  getBrandProducts,
  unBlockBrand,
  updateBrand,
  updateBrandProduct,
} from "../controllers/brandController";
import { isAdmin, isBrand, isLogin } from "../middlewares/auth";

const brandRouter = express.Router();

brandRouter.post("/register", brandRegister);
brandRouter.post("/login", brandLogin);
brandRouter.get("/profile", isLogin, isBrand, brandProfile);
brandRouter.patch("/update", isLogin, isLogin, updateBrand);
brandRouter.patch("/change-password", isLogin, isBrand, bChangePassword);
brandRouter.patch("/send-forget-password-token");
brandRouter.patch("/forget-password/:token");

brandRouter.post(
  "/product/add/:catId/:subCatId",
  isLogin,
  isBrand,
  bAddProduct
);
brandRouter.get("/products", isLogin, isBrand, getBrandProducts);
brandRouter.get("/product/:id", isLogin, isBrand, getBrandProduct);
brandRouter.patch("/product/:productId", isLogin, isBrand, updateBrandProduct);
brandRouter.delete("/product/delete/:id", isLogin, isBrand, deleteBrandProduct);

// admin access routes for brand
brandRouter.get("/all", isLogin, isAdmin, getAllBrands);
brandRouter.get("/brand/:id", isLogin, isAdmin, getBrand);
brandRouter.patch("/block/:id", isLogin, isAdmin, blockBrand);
brandRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockBrand);
brandRouter.delete("/vendor/:id", isLogin, isAdmin, deleteBrand);

export default brandRouter;
