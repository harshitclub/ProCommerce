import express from "express";
import { getProduct, getProducts } from "../controllers/productController";
const productRouter = express.Router();

/* GET Request (Global)*/
productRouter.get("/all", getProducts); // get products
productRouter.get("/product/:id", getProduct); // get product

export default productRouter;
