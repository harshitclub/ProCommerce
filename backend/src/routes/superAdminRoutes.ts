import express from "express";
import {
  superAdminLogin,
  superAdminProfile,
  superAdminRegister,
} from "../controllers/superAdminController";
import { isAdmin, isLogin } from "../middlewares/auth";
const superAdminRouter = express.Router();

superAdminRouter.post("/register", superAdminRegister);
superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.get("/profile", isLogin, isAdmin, superAdminProfile);

export default superAdminRouter;
