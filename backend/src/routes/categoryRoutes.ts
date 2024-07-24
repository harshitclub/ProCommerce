import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import {
  addCategory,
  addSubCategory,
  getCategories,
  getCategory,
  getSubCategories,
  getSubCategory,
  updateCategory,
  updateSubCategory,
} from "../controllers/categoryController";

const categoryRouter = express.Router();
const subCategoryRouter = express.Router();

categoryRouter.post("/add", isLogin, isAdmin, addCategory);
categoryRouter.get("/all-categories", getCategories);
categoryRouter.get("/category/:id", getCategory);
categoryRouter.patch("/update-category/:id", isLogin, isAdmin, updateCategory);
categoryRouter.delete("/delete/:id");

subCategoryRouter.post("/add", isLogin, isAdmin, addSubCategory);
subCategoryRouter.get("/all-sub-categories", getSubCategories);
subCategoryRouter.get("/sub-category/:id", getSubCategory);
subCategoryRouter.patch(
  "/update-sub-category/:id",
  isLogin,
  isAdmin,
  updateSubCategory
);
subCategoryRouter.delete("/delete/:id");

export { categoryRouter, subCategoryRouter };
