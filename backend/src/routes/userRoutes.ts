import express from "express";
import {
  blockUser,
  deleteUser,
  getAllUsers,
  getUser,
  unBlockUser,
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController";
import { isAdmin, isLogin } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/profile", isLogin, userProfile);

// admin access routes for user
userRouter.get("/all", isLogin, isAdmin, getAllUsers);
userRouter.get("/user/:id", isLogin, isAdmin, getUser);
userRouter.patch("/block/:id", isLogin, isAdmin, blockUser);
userRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockUser);
userRouter.delete("/user/:id", isLogin, isAdmin, deleteUser);

export default userRouter;
