import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import { addCategory, addSubCategory } from "../controllers/categoryController";

const categoryRouter = express.Router();
const subCategoryRouter = express.Router();

categoryRouter.post("/add", isLogin, isAdmin, addCategory);
categoryRouter.get("/all-categories");
categoryRouter.get("/category/:id");
categoryRouter.delete("/delete/:id");

subCategoryRouter.post("/add", isLogin, isAdmin, addSubCategory);
subCategoryRouter.get("/sub-category/:id");
subCategoryRouter.delete("/delete/:id");

export { categoryRouter, subCategoryRouter };
