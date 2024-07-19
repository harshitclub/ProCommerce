import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const userRegister = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering  user" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error logging user" });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting user profile" });
  }
};
