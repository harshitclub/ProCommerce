import express from "express";
import {
  blockVendor,
  deleteVendor,
  getAllVendors,
  getProduct,
  getProducts,
  getVendor,
  unBlockVendor,
  updateVendor,
  updateVendorProduct,
  vAddProduct,
  vendorLogin,
  vendorProfile,
  vendorRegister,
} from "../controllers/vendorController";
import { isAdmin, isLogin, isVendor } from "../middlewares/auth";

const vendorRouter = express.Router();

// POST Request
vendorRouter.post("/register", vendorRegister);
vendorRouter.post("/login", vendorLogin);
vendorRouter.post(
  "/product/add/:catId/:subCatId",
  isLogin,
  isVendor,
  vAddProduct
);

// Get Request
vendorRouter.get("/profile", isLogin, isVendor, vendorProfile);
vendorRouter.get("/products", isLogin, isVendor, getProducts);
vendorRouter.get("/product/:productId", isLogin, isVendor, getProduct);

// Patch Request
vendorRouter.patch("/update", isLogin, isAdmin, updateVendor);
vendorRouter.patch(
  "/product/:productId",
  isLogin,
  isVendor,
  updateVendorProduct
);

// Delete Request

// admin access routes for vendor
vendorRouter.get("/all", isLogin, isAdmin, getAllVendors);
vendorRouter.get("/vendor/:id", isLogin, isAdmin, getVendor);
vendorRouter.patch("/block/:id", isLogin, isAdmin, blockVendor);
vendorRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockVendor);
vendorRouter.delete("/vendor/:id", isLogin, isAdmin, deleteVendor);

export default vendorRouter;
