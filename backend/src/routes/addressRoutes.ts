import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import {
  addingAddress,
  getAddresses,
  getMyAddresses,
  getUserAddresses,
} from "../controllers/addressController";

const addressRouter = express();

addressRouter.post("/add", isLogin, addingAddress);
addressRouter.get("/my-addresses", isLogin, getMyAddresses);
addressRouter.patch("/update-address/:id", isLogin);
addressRouter.delete("/delete-address/:id", isLogin);
addressRouter.patch("/default", isLogin);

// admin routes

addressRouter.get("/addresses", isLogin, isAdmin, getAddresses);
addressRouter.get(
  "/get-user-addresses/:id",
  isLogin,
  isAdmin,
  getUserAddresses
);

export default addressRouter;
