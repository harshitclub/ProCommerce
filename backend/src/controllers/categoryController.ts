import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addCatValidator } from "../validator/categoryValidator";

const prisma = new PrismaClient();

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { title, description, slug, metaDescription, keywords } =
      await addCatValidator.parseAsync(req.body);

    const addCategory = await prisma.category.create({
      data: {
        title,
        description,
        slug,
        metaDescription,
        keywords,
      },
    });

    return res.status(201).json({
      message: "Category Created",
      category: addCategory,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const addSubCategory = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};
