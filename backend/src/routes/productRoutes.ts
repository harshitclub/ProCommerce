import express from "express";
import { getProduct, getProducts } from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/all", getProducts);
productRouter.get("/product/:id", getProduct);

export default productRouter;
