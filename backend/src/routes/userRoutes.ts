import express from "express";
import {
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController";
import { isLogin } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/profile", isLogin, userProfile);

export default userRouter;
