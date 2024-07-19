import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const brandRegister = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering brand" });
  }
};

export const brandLogin = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error logging brand" });
  }
};

export const brandProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting brand profile" });
  }
};
