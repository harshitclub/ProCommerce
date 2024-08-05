import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import superAdminRouter from "./routes/superAdminRoutes";
import vendorRouter from "./routes/vendorRoutes";
import userRouter from "./routes/userRoutes";
import brandRouter from "./routes/brandRoutes";
import { categoryRouter, subCategoryRouter } from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";
import addressRouter from "./routes/addressRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2001;

// Security middleware setup
app.use(helmet()); // Protect against common vulnerabilities
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit requests to 100 per window
  })
); // Limit excessive requests

// Middleware setup
app.use(express.json({ limit: "16kb" })); // Parse JSON data with limit
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data with limit
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
); // Enable CORS with restrictions
app.use(
  //@ts-ignore
  process.env.NODE_ENV !== "production" ? morgan("dev") : null
); // Conditional logging

function handleListen(error?: Error): void {
  // Define error as optional with Error type
  if (error) {
    console.log("Error:", error);
  } else {
    console.log(`http:localhost:${PORT}`);
  }
}

app.use("/api/v1/super-admin", superAdminRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/sub-category", subCategoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/address", addressRouter);

app.listen(PORT, handleListen);
