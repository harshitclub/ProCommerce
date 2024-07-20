import express from "express";
import {
  brandLogin,
  brandProfile,
  brandRegister,
} from "../controllers/brandController";
import { isBrand, isLogin } from "../middlewares/auth";

const brandRouter = express.Router();

brandRouter.post("/register", brandRegister);
brandRouter.post("/login", brandLogin);
brandRouter.get("/profile", isLogin, isBrand, brandProfile);

export default brandRouter;
