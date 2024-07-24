import express from "express";
import {
  changeSAdminPassword,
  superAdminLogin,
  superAdminProfile,
  superAdminRegister,
  updateSuperAdmin,
} from "../controllers/superAdminController";
import { isAdmin, isLogin } from "../middlewares/auth";
const superAdminRouter = express.Router();

superAdminRouter.post("/register", superAdminRegister);
superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.get("/profile", isLogin, isAdmin, superAdminProfile);
superAdminRouter.patch("/update", isLogin, isAdmin, updateSuperAdmin);
superAdminRouter.patch(
  "/change-password",
  isLogin,
  isAdmin,
  changeSAdminPassword
);

export default superAdminRouter;
