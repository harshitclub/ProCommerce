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

/* POST Request (Brand Only)*/
brandRouter.post("/register", brandRegister); // register brand
brandRouter.post("/login", brandLogin); // login brand
brandRouter.post(
  "/product/add/:catId/:subCatId",
  isLogin,
  isBrand,
  bAddProduct
); // adding product

/* GET Request (Brand Only)*/
brandRouter.get("/profile", isLogin, isBrand, brandProfile); // getting brand profile
brandRouter.get("/products", isLogin, isBrand, getBrandProducts); // get brand products
brandRouter.get("/product/:id", isLogin, isBrand, getBrandProduct); // get brand product

/* PATCH Request (Brand Only)*/
brandRouter.patch("/update", isLogin, isLogin, updateBrand); // update brand profile
brandRouter.patch("/change-password", isLogin, isBrand, bChangePassword); // change brand password
brandRouter.patch("/send-forget-password-token"); // send forget password token to email
brandRouter.patch("/forget-password/:token"); // reset password
brandRouter.patch("/product/:productId", isLogin, isBrand, updateBrandProduct); // update brand's product

/* DELETE Request (Brand Only)*/
brandRouter.delete("/product/delete/:id", isLogin, isBrand, deleteBrandProduct); // delete product

// admin access routes for brand
brandRouter.get("/all", isLogin, isAdmin, getAllBrands); // getting all brands
brandRouter.get("/brand/:id", isLogin, isAdmin, getBrand); // get brand
brandRouter.patch("/block/:id", isLogin, isAdmin, blockBrand); // block brand
brandRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockBrand); // unblock brand
brandRouter.delete("/brand/:id", isLogin, isAdmin, deleteBrand); // delete brand

export default brandRouter;
