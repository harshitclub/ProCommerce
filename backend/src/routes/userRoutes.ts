import express from "express";
import {
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/profile", userProfile);

export default userRouter;
