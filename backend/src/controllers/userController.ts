import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validator/userValidator";
import { generateAccessToken } from "../utils/tokens/generateTokens";
const prisma = new PrismaClient();

const saltRound = 10;

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password } =
      await userRegisterValidator.parseAsync(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use | Login instead",
      });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: "user",
      },
    });
    return res.status(201).json({
      message: "User Registered",
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        isVerified: newUser.isVerified,
      },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error registering  user" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = await userLoginValidator.parseAsync(req.body);
    const checkUser = await prisma.user.findUnique({
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
      },
    });

    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatches = await bcrypt.compare(password, checkUser.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    const accessToken = await generateAccessToken({
      userId: checkUser.id,
      userEmail: checkUser.email,
      isVerified: checkUser.isVerified,
      role: checkUser.role,
      status: checkUser.status,
    });

    res.cookie("procommerceToken", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (milliseconds)
      httpOnly: true, // Prevents client-side JavaScript access (recommended for security)
      secure: true, // Only send over HTTPS connections (recommended for security)
    });

    const sanitizedUser = {
      id: checkUser.id,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      email: checkUser.email,
      phone: checkUser.phone,
      role: checkUser.role,
      isVerified: checkUser.isVerified,
      status: checkUser.status,
    };

    return res
      .status(200)
      .json({ message: "User logged in", user: sanitizedUser });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error logging user" });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const userProfile = await prisma.user.findUnique({
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

    if (!userProfile) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const sanitizedUser = {
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      role: userProfile.role,
      isVerified: userProfile.isVerified,
      status: userProfile.status,
    };

    return res
      .status(200)
      .json({ message: "User profile fetched", user: sanitizedUser });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting user profile" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        status: true,
        isVerified: true,
      },
    });

    if (!users) {
      return res.status(404).json({
        message: "Users Not Found",
        data: users,
      });
    }

    return res.status(200).json({
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting users" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        status: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        data: user,
      });
    }

    return res.status(200).json({
      message: "User Found",
      data: user,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error getting user" });
  }
};

export const blockUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const blockUser = await prisma.user.update({
      where: { id: id },
      data: {
        status: "block",
      },
    });

    if (!blockUser) {
      return res.status(404).json({
        message: "User not found",
        data: blockUser,
      });
    }

    return res.status(200).json({
      message: "User blocked",
      data: blockUser,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while blocking user" });
  }
};

export const unBlockUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    const unBlockUser = await prisma.user.update({
      where: { id: id },
      data: {
        status: "active",
      },
    });

    if (!unBlockUser) {
      return res.status(404).json({
        message: "User not found",
        data: unBlockUser,
      });
    }

    return res.status(200).json({
      message: "User Unblocked",
      data: unBlockUser,
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while unblocking user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      return res.status(400).json({
        message: "Missing required parameter: id",
      });
    }

    await prisma.user.delete({
      where: { id: id },
    });

    return res.status(200).json({
      message: "User Deleted",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error while deleting user" });
  }
};
