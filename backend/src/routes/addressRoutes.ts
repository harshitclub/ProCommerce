import express from "express";
import { isAdmin, isLogin } from "../middlewares/auth";
import {
  addingAddress,
  deleteMyAddress,
  getAddresses,
  getMyAddresses,
  getUserAddresses,
  setDefaultAddress,
} from "../controllers/addressController";

const addressRouter = express();

/* POST Request (Only User)*/
addressRouter.post("/add", isLogin, addingAddress); // adding address

/* GET Request (Only User)*/
addressRouter.get("/my-addresses", isLogin, getMyAddresses); // retrieving address

/* PATCH Request (Only User)*/
addressRouter.patch("/update-address/:id", isLogin); // updating address
addressRouter.patch("/default/:id", isLogin, setDefaultAddress); // mark address as default

/* DELETE Request (Only User)*/
addressRouter.delete("/delete-address/:id", isLogin, deleteMyAddress); // delete address

/* ///// ADMIN Only \\\\\ */
/* GET Request */
addressRouter.get("/addresses", isLogin, isAdmin, getAddresses); // get all addresses by admin
addressRouter.get(
  "/get-user-addresses/:id",
  isLogin,
  isAdmin,
  getUserAddresses
); // get user's addresses

export default addressRouter;
