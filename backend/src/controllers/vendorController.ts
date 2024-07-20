import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  vLoginValidator,
  vRegisterValidator,
} from "../validator/vendorValidator";
import { generateAccessToken } from "../utils/tokens/generateTokens";
const prisma = new PrismaClient();

const saltRound = 10;

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
