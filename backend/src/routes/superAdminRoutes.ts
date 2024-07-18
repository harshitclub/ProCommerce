import express from "express";
import {
  superAdminLogin,
  superAdminProfile,
  superAdminRegister,
} from "../controllers/superAdminController";
const superAdminRouter = express.Router();

superAdminRouter.post("/register", superAdminRegister);
superAdminRouter.post("/login", superAdminLogin);
superAdminRouter.get("/profile", superAdminProfile);

export default superAdminRouter;
