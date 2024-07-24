import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  brandLoginValidator,
  brandRegisterValidator,
} from "../validator/brandValidator";
import { generateAccessToken } from "../utils/tokens/generateTokens";
const prisma = new PrismaClient();

const saltRound = 10;

export const brandRegister = async (req: Request, res: Response) => {
  try {
    const {
      brandName,
      email,
      password,
      phone,
      niche,
      slug,
      country,
      missionStatement,
      slogan,
      description,
      metaDescription,
      keywords,
    } = await brandRegisterValidator.parseAsync(req.body);

    const existingBrand = await prisma.brand.findUnique({
      where: { email },
    });

    if (existingBrand) {
      return res.status(400).json({
        message: "Brand already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    // creating a brand

    const newBrand = await prisma.brand.create({
      data: {
        brandName,
        email,
        password: hashedPassword,
        phone,
        niche,
        slug,
        country,
        missionStatement,
        slogan,
        description,
        metaDescription,
        keywords,
      },
    });

    return res.status(201).json({
      message: "Brand registered",
      user: {
        id: newBrand.id,
        email: newBrand.email,
        phone: newBrand.email,
        niche: newBrand.niche,
        slug: newBrand.slug,
        country: newBrand.country,
        missionStatement: newBrand.missionStatement,
        slogan: newBrand.slogan,
        description: newBrand.description,
        metaDescription: newBrand.description,
        keywords: newBrand.keywords,
      },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering brand" });
  }
};

export const brandLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = await brandLoginValidator.parseAsync(req.body);
    const checkBrand = await prisma.brand.findUnique({
      where: { email },
      select: {
        id: true,
        brandName: true,
        email: true,
        password: true,
        phone: true,
        niche: true,
        slug: true,
        country: true,
        missionStatement: true,
        slogan: true,
        description: true,
        metaDescription: true,
        keywords: true,
        isVerified: true,
        status: true,
        role: true,
      },
    });

    if (!checkBrand) {
      return res.status(404).json({ message: "Brand Not Found" });
    }

    const passwordMatches = await bcrypt.compare(password, checkBrand.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    const accessToken = await generateAccessToken({
      userId: checkBrand.id,
      userEmail: checkBrand.email,
      isVerified: checkBrand.isVerified,
      role: checkBrand.role,
      status: checkBrand.status,
    });

    res.cookie("procommerceToken", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (milliseconds)
      httpOnly: true, // Prevents client-side JavaScript access (recommended for security)
      secure: true, // Only send over HTTPS connections (recommended for security)
    });

    const sanitizedUser = {
      id: checkBrand.id,
      brandName: checkBrand.brandName,
      email: checkBrand.email,
      phone: checkBrand.phone,
      role: checkBrand.role,
      isVerified: checkBrand.isVerified,
      status: checkBrand.status,
      slug: checkBrand.slug,
      slogan: checkBrand.slogan,
      keywords: checkBrand.keywords,
      niche: checkBrand.niche,
      description: checkBrand.description,
      metaDescription: checkBrand.metaDescription,
      country: checkBrand.country,
    };

    return res
      .status(200)
      .json({ message: "Brand Login Successful", user: sanitizedUser });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error logging brand" });
  }
};

export const brandProfile = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;

    const brandProfile = await prisma.brand.findUnique({
      where: { email: user.userEmail },
      select: {
        id: true,
        brandName: true,
        email: true,
        password: true,
        phone: true,
        niche: true,
        slug: true,
        country: true,
        missionStatement: true,
        slogan: true,
        description: true,
        metaDescription: true,
        keywords: true,
        isVerified: true,
        status: true,
        role: true,
      },
    });

    if (!brandProfile) {
      return res.status(404).json({
        message: "Brand Not Found",
      });
    }

    return res.status(200).json({
      message: "Brand Profile Fetched",
      user: brandProfile,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting brand profile" });
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        brandName: true,
        email: true,
        phone: true,
        logo: true,
        niche: true,
        slug: true,
        status: true,
        isVerified: true,
      },
    });

    if (!brands) {
      return res.status(404).json({
        message: "Brands Not found",
        data: brands,
      });
    }

    return res.status(200).json({
      message: "Brands Found",
      data: brands,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting brands" });
  }
};

export const getBrand = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const brand = await prisma.brand.findUnique({
      where: { id: id },
      select: {
        id: true,
        brandName: true,
        email: true,
        phone: true,
        logo: true,
        niche: true,
        slug: true,
        status: true,
        isVerified: true,
        slogan: true,
        country: true,
        missionStatement: true,
        description: true,
      },
    });

    if (!brand) {
      return res.status(404).json("Brand Not Found");
    }
    return res.status(200).json({
      message: "Brand Found",
      data: brand,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting brand" });
  }
};

export const blockBrand = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const blockBrand = await prisma.brand.update({
      where: { id: id },
      data: {
        status: "block",
      },
    });

    if (!blockBrand) {
      return res.status(404).json({
        message: "Brand not found",
        data: blockBrand,
      });
    }

    return res.status(200).json({
      message: "Brand Blocked",
      data: blockBrand,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while blocking brand" });
  }
};

export const unBlockBrand = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const unBlockBrand = await prisma.brand.update({
      where: { id: id },
      data: {
        status: "active",
      },
    });

    if (!unBlockBrand) {
      return res.status(404).json({
        message: "Brand not found",
        data: unBlockBrand,
      });
    }

    return res.status(200).json({
      message: "Brand Unblocked",
      data: unBlockBrand,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while unblocking brand" });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    await prisma.brand.delete({
      where: { id: id },
    });

    return res.status(200).json({
      message: "Brand Deleted",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while deleting brand" });
  }
};
