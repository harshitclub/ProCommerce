import express from "express";
import {
  addToCart,
  addToWishlist,
  blockUser,
  deleteUser,
  getAllUsers,
  getCartItems,
  getUser,
  getWishlistItems,
  removeFromCart,
  removeFromWishlist,
  unBlockUser,
  updateUser,
  userChangePassword,
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController";
import { isAdmin, isLogin } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/profile", isLogin, userProfile);
userRouter.patch("/update", isLogin, updateUser);
userRouter.patch("/change-password", isLogin, userChangePassword);
userRouter.patch("/send-forget-password-token");
userRouter.patch("/forget-password/:token");

userRouter.post("/add-to-cart", isLogin, addToCart);
userRouter.get("/my-cart", isLogin, getCartItems);
userRouter.delete("/remove-from-cart/:cartItemId", isLogin, removeFromCart);
userRouter.post("/add-to-wishlist", isLogin, addToWishlist);
userRouter.get("/my-wishlist", isLogin, getWishlistItems);
userRouter.delete(
  "/remove-from-wishlist/:wishlistItemId",
  isLogin,
  removeFromWishlist
);

// admin access routes for user
userRouter.get("/all", isLogin, isAdmin, getAllUsers);
userRouter.get("/user/:id", isLogin, isAdmin, getUser);
userRouter.patch("/block/:id", isLogin, isAdmin, blockUser);
userRouter.patch("/unblock/:id", isLogin, isAdmin, unBlockUser);
userRouter.delete("/user/:id", isLogin, isAdmin, deleteUser);

export default userRouter;
