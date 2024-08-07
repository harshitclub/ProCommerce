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

/* POST Request (Admin Only)*/
superAdminRouter.post("/register", superAdminRegister); // register admin
superAdminRouter.post("/login", superAdminLogin); // login admin

/* GET Request (Admin Only)*/
superAdminRouter.get("/profile", isLogin, isAdmin, superAdminProfile); // getting admin profile

/* PATCH Request (Admin Only)*/
superAdminRouter.patch("/update", isLogin, isAdmin, updateSuperAdmin); // updating admin
superAdminRouter.patch(
  "/change-password",
  isLogin,
  isAdmin,
  changeSAdminPassword
); // change admin password

export default superAdminRouter;
