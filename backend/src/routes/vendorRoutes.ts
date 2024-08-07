import express from "express";
import {
  blockVendor,
  deleteVendor,
  deleteVProduct,
  getAllVendors,
  getProduct,
  getProducts,
  getVendor,
  unBlockVendor,
  updateVendor,
  updateVendorProduct,
  vAddProduct,
  vChangePassword,
  vendorLogin,
  vendorProfile,
  vendorRegister,
} from "../controllers/vendorController";
import { isAdmin, isLogin, isVendor } from "../middlewares/auth";

const vendorRouter = express.Router();

/* POST Request (Vendor Only)*/
vendorRouter.post("/register", vendorRegister); // register vendor
vendorRouter.post("/login", vendorLogin); // login vendor
vendorRouter.post(
  "/product/add/:catId/:subCatId",
  isLogin,
  isVendor,
  vAddProduct
); // adding product as vendor

/* GET Request (Vendor Only)*/
vendorRouter.get("/profile", isLogin, isVendor, vendorProfile); // getting profile
vendorRouter.get("/products", isLogin, isVendor, getProducts); // getting vendor's products
vendorRouter.get("/product/:productId", isLogin, isVendor, getProduct); // getting vendor's product

/* PATCH Request (Vendor Only)*/
vendorRouter.patch("/update", isLogin, isVendor, updateVendor); // update vendor profile
vendorRouter.patch("/change-password", isLogin, isVendor, vChangePassword); // change password
vendorRouter.patch(
  "/product/:productId",
  isLogin,
  isVendor,
  updateVendorProduct
); // update vendor's product

/* DELETE Request (Vendor Only)*/
vendorRouter.delete("/product/delete/:id", isLogin, isVendor, deleteVProduct); // delete vendor's product

// admin access routes for vendor
vendorRouter.get("/all", isLogin, isAdmin, getAllVendors); // get all vendors
vendorRouter.get("/vendor/:id", isLogin, isAdmin, getVendor); // get vendor
vendorRouter.patch("/block/:id", isLogin, isAdmin, blockVendor); // block vendor
vendorRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockVendor); // unblock vendor
vendorRouter.delete("/vendor/:id", isLogin, isAdmin, deleteVendor); // delete vendor

export default vendorRouter;
