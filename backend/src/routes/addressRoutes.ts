import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import { addingAddress, getAddresses } from "../controllers/addressController";

const addressRouter = express();

addressRouter.post("/add", isLogin, addingAddress);

// admin routes

addressRouter.get("/addresses", isLogin, isAdmin, getAddresses);

export default addressRouter;
