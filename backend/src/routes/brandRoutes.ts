import express from "express";
import {
  brandLogin,
  brandProfile,
  brandRegister,
} from "../controllers/brandController";

const brandRouter = express.Router();

brandRouter.post("/register", brandRegister);
brandRouter.post("/login", brandLogin);
brandRouter.get("/profile", brandProfile);

export default brandRouter;
