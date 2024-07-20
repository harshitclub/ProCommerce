import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Request interface to include tokenValue property
declare module "express-serve-static-core" {
  interface Request {
    decodedToken?: any;
  }
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.procommerceToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing access token" });
    }
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error("Missing environment variable: ACCESS_TOKEN_SECRET");
    }
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token" });
    }

    req.decodedToken = decodedToken;
    next();
  } catch (error: any) {
    console.error("Error verifying access token:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Access token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token format" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing user information" });
    }
    const decoded = req.decodedToken;
    if (decoded.role !== "superAdmin") {
      // Handle non-superAdmin case (write your logic here)
      return res
        .status(403)
        .json({ message: "Forbidden: Access denied for non-superAdmin users" });
    }
    req.decodedToken = decoded;
    next();
  } catch (error: any) {
    console.error("Error verifying access token:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Access token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token format" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing user information" });
    }
    const decoded = req.decodedToken;
    if (decoded.role !== "vendor") {
      // Handle non-vendor case
      return res
        .status(403)
        .json({ message: "Forbidden: Access denied for non-vendor users" });
    }
    req.decodedToken = decoded;
    next();
  } catch (error: any) {
    console.error("Error verifying access token:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Access token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token format" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const isBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.decodedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing user information" });
    }
    const decoded = req.decodedToken;
    if (decoded.role !== "brand") {
      // Handle non-vendor case
      return res
        .status(403)
        .json({ message: "Forbidden: Access denied for non-vendor users" });
    }
    req.decodedToken = decoded;
    next();
  } catch (error: any) {
    console.error("Error verifying access token:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Access token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token format" });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
