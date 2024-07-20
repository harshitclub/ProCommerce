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
