import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  sAdminLoginValidator,
  sAdminRegisterValidator,
} from "../validator/superAdminValidator";
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
        isVerified: true,
        password: true,
      }, // Include password for verification
    });

    if (!existingSAdmin) {
      return res.status(400).json({ message: "Super Admin Not Found" });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      existingSAdmin.password
    );
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    const sanitizedUser = {
      id: existingSAdmin.id,
      firstName: existingSAdmin.firstName,
      lastName: existingSAdmin.lastName,
      email: existingSAdmin.email,
      phone: existingSAdmin.phone,
      role: existingSAdmin.role,
      isVerified: existingSAdmin.isVerified,
    };

    return res
      .status(200)
      .json({ message: "Super Admin Login Successful", user: sanitizedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Error logging super admin" });
  }
};

export const superAdminProfile = (req: Request, res: Response) => {
  return res.status(200).send({ message: "all ok" });
};
