import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  sAdminLoginValidator,
  sAdminRegisterValidator,
} from "../validator/superAdminValidator";
import { generateAccessToken } from "../utils/tokens/generateTokens";
const prisma = new PrismaClient();

const saltRound = 10;

export const superAdminRegister = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password } =
      await sAdminRegisterValidator.parseAsync(req.body);

    const existingSAdmin = await prisma.superAdmin.findUnique({
      where: {
        email: email,
      },
    });
    if (existingSAdmin) {
      return res.status(400).json({
        message: "Super Admin already registered with this email address",
      });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);
    // Create a new user
    const newAdmin = await prisma.superAdmin.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: "superAdmin",
      },
    });
    return res.status(201).json({
      message: "Super admin successfully registered.",
      user: {
        id: newAdmin.id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        phone: newAdmin.phone,
        role: newAdmin.role,
        isVerified: newAdmin.isVerified,
      },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};
export const superAdminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = await sAdminLoginValidator.parseAsync(req.body);

    const existingSAdmin = await prisma.superAdmin.findUnique({
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
      }, // Include password for verification
    });

    if (!existingSAdmin) {
      return res.status(404).json({ message: "Super Admin Not Found" });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      existingSAdmin.password
    );
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    const accessToken = await generateAccessToken({
      userId: existingSAdmin.id,
      userEmail: existingSAdmin.email,
      isVerified: existingSAdmin.isVerified,
      role: existingSAdmin.role,
      status: existingSAdmin.status,
    });

    res.cookie("procommerceToken", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (milliseconds)
      httpOnly: true, // Prevents client-side JavaScript access (recommended for security)
      secure: true, // Only send over HTTPS connections (recommended for security)
    });

    const sanitizedUser = {
      id: existingSAdmin.id,
      firstName: existingSAdmin.firstName,
      lastName: existingSAdmin.lastName,
      email: existingSAdmin.email,
      phone: existingSAdmin.phone,
      role: existingSAdmin.role,
      isVerified: existingSAdmin.isVerified,
      status: existingSAdmin.status,
    };

    return res
      .status(200)
      .json({ message: "Super Admin Login Successful", user: sanitizedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Error logging super admin" });
  }
};

export const superAdminProfile = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;

    const adminProfile = await prisma.superAdmin.findUnique({
      where: { email: user.userEmail },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        isVerified: true,
        avatar: true,
      },
    });
    if (!adminProfile) {
      return res.status(404).json({
        message: "Super Admin Not Found",
      });
    }

    const sanitizedUser = {
      id: adminProfile.id,
      firstName: adminProfile.firstName,
      lastName: adminProfile.lastName,
      email: adminProfile.email,
      phone: adminProfile.phone,
      role: adminProfile.role,
      isVerified: adminProfile.isVerified,
      status: adminProfile.status,
    };

    return res
      .status(200)
      .json({ message: "User Profile Fetched", user: sanitizedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error getting super admin profile" });
  }
};
