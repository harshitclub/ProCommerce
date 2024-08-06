import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import {
  addingAddress,
  getAddresses,
  getMyAddresses,
} from "../controllers/addressController";

const addressRouter = express();

addressRouter.post("/add", isLogin, addingAddress);
addressRouter.get("/my-addresses", isLogin, getMyAddresses);
addressRouter.patch("/update-address/:id", isLogin);
addressRouter.delete("/delete-address/:id", isLogin);

// admin routes

addressRouter.get("/addresses", isLogin, isAdmin, getAddresses);

export default addressRouter;
