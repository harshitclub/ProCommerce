import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  addCatValidator,
  addSubCatValidator,
} from "../validator/categoryValidator";

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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }
    const { title, description, slug, metaDescription, keywords } = req.body;
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        title,
        description,
        slug,
        metaDescription,
        keywords,
      },
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category Updated",
      subCategory: updatedCategory,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        featured: true,
      },
    });

    if (!categories) {
      return res.status(404).json({
        message: "No Category Found",
      });
    }

    return res.status(200).json({
      message: "Categories Found",
      categories: categories,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    const category = await prisma.category.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        metaDescription: true,
        keywords: true,
        slug: true,
        status: true,
        featured: true,
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category Found",
      category: category,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const blockCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    await prisma.category.update({
      where: { id },
      data: { status: "block" },
    });

    return res.status(200).json({
      message: "Category Blocked",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error blocking category" });
  }
};

export const unBlockCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }
    await prisma.category.update({
      where: { id },
      data: { status: "active" },
    });

    return res.status(200).json({
      message: "Category Activated",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error unblocking category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    await prisma.category.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Category Removed",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while deleting category" });
  }
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const products = await prisma.category.findMany({
      where: { id: id },
      select: { products: true },
    });

    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting products" });
  }
};

export const getCategorySubCategories = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subCategories = await prisma.category.findMany({
      where: { id },
      select: { subCategories: true },
    });
    return res.status(200).json({
      data: subCategories,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting sub categories" });
  }
};

export const addSubCategory = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      slug,
      metaDescription,
      keywords,
      parentCategoryId,
    } = await addSubCatValidator.parseAsync(req.body);

    const addSubCategory = await prisma.subCategory.create({
      data: {
        title,
        description,
        slug,
        metaDescription,
        keywords,
        parentCategoryId,
      },
    });

    return res.status(201).json({
      message: "Sub Category Added",
      subCategory: addSubCategory,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }
    const { title, description, slug, metaDescription, keywords } = req.body;
    const updatedSubCategory = await prisma.subCategory.update({
      where: { id: id },
      data: {
        title,
        description,
        slug,
        metaDescription,
        keywords,
      },
    });

    if (!updatedSubCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    return res.status(200).json({
      message: "Sub Category Updated",
      subCategory: updatedSubCategory,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        metaDescription: true,
        keywords: true,
        slug: true,
        status: true,
        products: true,
        parentCategoryId: true,
      },
    });

    if (!subCategories) {
      return res.status(404).json({
        message: "No Sub Category Found",
        subCategories: subCategories,
      });
    }

    return res.status(200).json({
      message: "Sub Categories Found",
      subCategories: subCategories,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const getSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    const subCategory = await prisma.subCategory.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        metaDescription: true,
        keywords: true,
        slug: true,
        status: true,
        products: true,
        parentCategoryId: true,
      },
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    return res.status(200).json({
      message: "Sub Category Found",
      subCategory: subCategory,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering super admin" });
  }
};

export const blockSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }
    await prisma.subCategory.update({
      where: { id },
      data: { status: "block" },
    });

    return res.status(200).json({
      message: "Sub Category Blocked",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error blocking sub category" });
  }
};

export const unBlockSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }
    await prisma.subCategory.update({
      where: { id },
      data: { status: "active" },
    });

    return res.status(200).json({
      message: "Sub Category Activated",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error unblocking sub category" });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    await prisma.category.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Sub Category Removed",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error while deleting sub category" });
  }
};

export const getSubCategoryProducts = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Type cast for clarity (optional)
    if (!id) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: id" });
    }

    const products = await prisma.subCategory.findMany({
      where: { id },
      select: { products: true },
    });
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while fetching products" });
  }
};
