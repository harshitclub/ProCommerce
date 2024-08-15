import express from "express";
import {
  addToCart,
  addToWishlist,
  blockUser,
  deleteUser,
  getAllUsers,
  getCartItems,
  getUser,
  getUserCartItems,
  getUserWishlistItems,
  getWishlistItems,
  removeFromCart,
  removeFromWishlist,
  sendForgetPasswordEmail,
  unBlockUser,
  updateUser,
  userChangePassword,
  userForgetPassword,
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController";
import { isAdmin, isLogin } from "../middlewares/auth";

const userRouter = express.Router();

/* POST Request (User Only)*/
userRouter.post("/register", userRegister); // register user
userRouter.post("/login", userLogin); // login user
userRouter.post("/add-to-cart", isLogin, addToCart); // add product to cart
userRouter.post("/add-to-wishlist", isLogin, addToWishlist); // add product to wishlist

/* GET Request (User Only)*/
userRouter.get("/profile", isLogin, userProfile); // get profile
userRouter.get("/my-cart", isLogin, getCartItems); // get cart items
userRouter.get("/my-wishlist", isLogin, getWishlistItems); // get wishlist items

/* PATCH Request (User Only)*/
userRouter.patch("/update", isLogin, updateUser); // update profile
userRouter.patch("/change-password", isLogin, userChangePassword); // change password
userRouter.patch("/send-forget-password-token", sendForgetPasswordEmail); // send forget password token to email
userRouter.patch("/forget-password/:token", userForgetPassword); // reset password

/* DELETE Request (User Only)*/
userRouter.delete("/remove-from-cart/:cartItemId", isLogin, removeFromCart); // remove product from cart
userRouter.delete(
  "/remove-from-wishlist/:wishlistItemId",
  isLogin,
  removeFromWishlist
); // remove product from wishlist

// admin access routes for user
userRouter.get("/all", isLogin, isAdmin, getAllUsers); // get all users
userRouter.get("/user/:id", isLogin, isAdmin, getUser); // get user
userRouter.patch("/block/:id", isLogin, isAdmin, blockUser); // block user
userRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockUser); // unblock user
userRouter.delete("/user/:id", isLogin, isAdmin, deleteUser); // delete user
userRouter.get("/user/cart/:id", isLogin, isAdmin, getUserCartItems); // get user cart items
userRouter.get("/user/wishlist/:id", isLogin, isAdmin, getUserWishlistItems); // get user wishlist items

export default userRouter;
