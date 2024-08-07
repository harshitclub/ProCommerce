import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import {
  addCategory,
  addSubCategory,
  blockCategory,
  blockSubCategory,
  deleteCategory,
  deleteSubCategory,
  getCategories,
  getCategory,
  getCategoryProducts,
  getCategorySubCategories,
  getSubCategories,
  getSubCategory,
  getSubCategoryProducts,
  unBlockCategory,
  unBlockSubCategory,
  updateCategory,
  updateSubCategory,
} from "../controllers/categoryController";

const categoryRouter = express.Router();
const subCategoryRouter = express.Router();

// [GLOBAL API's]
categoryRouter.get("/all-categories", getCategories); // get all categories
categoryRouter.get("/category/:id", getCategory); // get category
categoryRouter.get("/category/:id/products", getCategoryProducts); // get category products
categoryRouter.get("/category/:id/sub-categories", getCategorySubCategories); // get sub categories of category

subCategoryRouter.get("/all-sub-categories", getSubCategories); // get sub categories
subCategoryRouter.get("/sub-category/:id", getSubCategory); // get sub category
subCategoryRouter.get("/:id/products", getSubCategoryProducts); // get products of sub category

/* POST Request ([Category] Admin Only)*/
categoryRouter.post("/add", isLogin, isAdmin, addCategory); // add sub category

/* GET Request ([Category] Admin Only)*/
categoryRouter.patch("/update-category/:id", isLogin, isAdmin, updateCategory); // update category

/* DELETE Request ([Category] Admin Only)*/
categoryRouter.delete("/delete/:id"); // delete category

/* PATCH Request ([Category] Admin Only)*/
categoryRouter.patch("/block/:id", isLogin, isAdmin, blockCategory); // block category
categoryRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockCategory); // unblock category
categoryRouter.delete("/delete/:id", isLogin, isAdmin, deleteCategory); // delete category

/* POST Request ([Sub Category] Admin Only)*/
subCategoryRouter.post("/add", isLogin, isAdmin, addSubCategory); // add sub category

/* GET Request ([Sub Category] Admin Only)*/

/* PATCH Request ([Sub Category] Admin Only)*/
subCategoryRouter.patch(
  "/update-sub-category/:id",
  isLogin,
  isAdmin,
  updateSubCategory
); // udpate sub category
subCategoryRouter.patch("/block/:id", isLogin, isAdmin, blockSubCategory); // block sub category
subCategoryRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockSubCategory); // unblock sub category

/* DELETE Request ([Sub Category] Admin Only)*/
subCategoryRouter.delete("/delete/:id", isLogin, isAdmin, deleteSubCategory); // delete sub category

export { categoryRouter, subCategoryRouter };
