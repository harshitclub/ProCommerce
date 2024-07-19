import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const saltRound = 10;

export const vendorRegister = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering vendor" });
  }
};

export const vendorLogin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error logging vendor" });
  }
};

export const vendorProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting vendor profile" });
  }
};
