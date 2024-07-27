import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  updateVendorValidator,
  vLoginValidator,
  vRegisterValidator,
} from "../validator/vendorValidator";
import { generateAccessToken } from "../utils/tokens/generateTokens";
import {
  productValidator,
  updateProductValidator,
} from "../validator/productValidator";
import validatePassword from "../utils/shorters/passwordChecker";
const prisma = new PrismaClient();

const saltRound = 10;

/* 
Vendor Registration Function
*/
export const vendorRegister = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, companyName, phone, password } =
      await vRegisterValidator.parseAsync(req.body);

    const existingVendor = await prisma.vendor.findUnique({
      where: { email },
    });
    if (existingVendor) {
      return res.status(400).json({
        message: "Email already in use | Login instead",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newVendor = await prisma.vendor.create({
      data: {
        firstName,
        lastName,
        email,
        companyName,
        phone,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Vendor Registered",
      user: {
        id: newVendor.id,
        firstName: newVendor.firstName,
        lastName: newVendor.lastName,
        email: newVendor.email,
        companyName: newVendor.companyName,
        phone: newVendor.phone,
        role: newVendor.role,
        isVerified: newVendor.isVerified,
      },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering vendor" });
  }
};

/* 
Vendor Login Function
*/
export const vendorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = await vLoginValidator.parseAsync(req.body);

    const checkVendor = await prisma.vendor.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        isVerified: true,
        password: true,
      },
    });

    if (!checkVendor) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      checkVendor.password
    );

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    const accessToken = await generateAccessToken({
      userId: checkVendor.id,
      userEmail: checkVendor.email,
      isVerified: checkVendor.isVerified,
      role: checkVendor.role,
      status: checkVendor.status,
    });

    res.cookie("procommerceToken", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (milliseconds)
      httpOnly: true, // Prevents client-side JavaScript access (recommended for security)
      secure: true, // Only send over HTTPS connections (recommended for security)
    });

    const sanitizedUser = {
      id: checkVendor.id,
      firstName: checkVendor.firstName,
      lastName: checkVendor.lastName,
      email: checkVendor.email,
      phone: checkVendor.phone,
      role: checkVendor.role,
      isVerified: checkVendor.isVerified,
      status: checkVendor.status,
    };

    return res
      .status(200)
      .json({ message: "Vendor logged in", user: sanitizedUser });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error logging vendor" });
  }
};

/* 
Get Vendor Profile
*/
export const vendorProfile = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const vendorProfile = await prisma.vendor.findUnique({
      where: { email: user.userEmail },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        companyName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        isVerified: true,
        avatar: true,
      },
    });
    if (!vendorProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const sanitizedUser = {
      id: vendorProfile.id,
      firstName: vendorProfile.firstName,
      lastName: vendorProfile.lastName,
      email: vendorProfile.email,
      companyName: vendorProfile.companyName,
      phone: vendorProfile.phone,
      role: vendorProfile.role,
      isVerified: vendorProfile.isVerified,
      status: vendorProfile.status,
    };
    return res
      .status(200)
      .json({ message: "Vendor profile fetched", user: sanitizedUser });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendor profile" });
  }
};

/* 
Update Vendor Profile Function
*/
export const updateVendor = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const vendorData = await updateVendorValidator.parseAsync(req.body);
    const updatedVendor = await prisma.vendor.update({
      where: { email: user.userEmail },
      data: {
        ...vendorData,
      },
    });

    if (!updatedVendor) {
      return res.status(400).json({
        message: "Error While Updating Vendor",
        data: updatedVendor,
      });
    }

    return res.status(200).json({
      message: "Vendor Updated",
      data: updatedVendor,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error while updating vendor profile" });
  }
};

/* 
Vendor Change Password
*/
export const vChangePassword = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400) // Bad Request
        .json({
          message: "Missing required fields: oldPassword and newPassword",
        });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { email: user.userEmail },
    });
    if (!vendor) {
      return res
        .status(401) // Unauthorized
        .json({ message: "Invalid credentials or unauthorized access" });
    }
    const passwordStrength = validatePassword(newPassword);
    if (!passwordStrength.isValid) {
      return res
        .status(400) // Bad Request
        .json({ message: passwordStrength.message });
    }

    const comparePassword = await bcrypt.compare(oldPassword, vendor.password);
    if (!comparePassword) {
      return res
        .status(401) // Unauthorized
        .json({ message: "Incorrect old password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, saltRound);

    const updatedVendor = await prisma.vendor.update({
      where: { email: vendor.email },
      data: { password: hashPassword },
    });

    return res
      .status(200) // OK
      .json({ message: "Password Changed" });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while changing password" });
  }
};

/* 
Add Vendor Product Function
*/
export const vAddProduct = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const { catId, subCatId } = req.params;
    const productData = await productValidator.parseAsync(req.body);

    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        vendorId: user.userId,
        categoryId: catId,
        subCategoryId: subCatId,
      },
    });
    if (!newProduct) {
      return res
        .status(409)
        .json({ message: "Product with similar data already exists" });
    }
    return res.status(201).json({
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendor profile" });
  }
};

/* 
Update Vendor Product
*/
export const updateVendorProduct = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const productId = req.params.productId;
    const productData = await updateProductValidator.parseAsync(req.body);
    const updatedProduct = await prisma.product.update({
      where: { vendorId: user.userId, id: productId },
      data: {
        ...productData,
      },
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      data: updatedProduct,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while updating product" });
  }
};

/* 
Get Particular Product
*/
export const getProduct = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const productId = req.params.productId;

    const product = await prisma.product.findUnique({
      where: { vendorId: user.userId, id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendor products" });
  }
};

/* 
Get Vendor Products Function
*/
export const getProducts = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;

    const products = await prisma.product.findMany({
      where: { vendorId: user.userId },
    });

    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendor products" });
  }
};

/* 
Delete Vendor Product Function
*/
export const deleteVProduct = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const productId = req.params.id as string;
    await prisma.product.delete({
      where: { id: productId, vendorId: user.userId },
    });

    return res.status(200).json({
      message: "Product Deleted",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error deleting vendor products" });
  }
};

/* 
Get All Vendors Function
(Admin Only)
*/
export const getAllVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await prisma.vendor.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        companyName: true,
        email: true,
        phone: true,
        avatar: true,
        status: true,
      },
    });
    if (!vendors) {
      return res.status(404).json({
        message: "Vendors not found",
        data: vendors,
      });
    }
    return res.status(200).json({
      message: "Vendors Found",
      data: vendors,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendors" });
  }
};

/* 
Get Vendor Function
(Admin Only)
*/
export const getVendor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        companyName: true,
        email: true,
        phone: true,
        avatar: true,
        status: true,
        contactEmail: true,
        products: true,
      },
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
        data: vendor,
      });
    }

    return res.status(200).json({
      message: "Vendor Found",
      data: vendor,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendor" });
  }
};

/* 
Block Vendor Function
(Admin Only)
*/
export const blockVendor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const blockVendor = await prisma.vendor.update({
      where: { id: id },
      data: {
        status: "block",
      },
    });

    if (!blockVendor) {
      return res.status(404).json({
        message: "Vendor not found",
        data: blockVendor,
      });
    }
    return res.status(200).json({
      message: "Vendor Blocked",
      data: blockVendor,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while blocking vendor" });
  }
};

/* 
Unblock Vendor Function
(Admin Only)
*/
export const unBlockVendor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const unBlockVendor = await prisma.vendor.update({
      where: { id: id },
      data: {
        status: "active",
      },
    });

    if (!unBlockVendor) {
      return res.status(404).json({
        message: "Vendor not found",
        data: unBlockVendor,
      });
    }
    return res.status(200).json({
      message: "Vendor Unblocked",
      data: unBlockVendor,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while unblocking vendor" });
  }
};

/* 
Delete Vendor Function
(Admin Only)
*/
export const deleteVendor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    await prisma.vendor.delete({
      where: { id: id },
    });

    return res.status(200).json({
      message: "Vendor Deleted",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while deleting vendor" });
  }
};
