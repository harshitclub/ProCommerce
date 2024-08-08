import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* 
Get Products
*/
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        newPrice: true,
        slug: true,
        image: true,
      },
    });
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Fetching Products" });
  }
};

/* 
Get Product
(Admin Only)
*/
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ data: product });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Fetching Product" });
  }
};
