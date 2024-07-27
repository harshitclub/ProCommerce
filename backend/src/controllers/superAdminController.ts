import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import {
  sAdminLoginValidator,
  sAdminRegisterValidator,
} from "../validator/superAdminValidator";
import { generateAccessToken } from "../utils/tokens/generateTokens";
import validatePassword from "../utils/shorters/passwordChecker";
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
        status: true,
        isVerified: true,
        password: true,
      }, // Include password for verification
    });

    if (!existingSAdmin) {
      return res.status(404).json({ message: "Super Admin Not Found" });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      existingSAdmin.password
    );
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid Login Credentials" });
    }

    const accessToken = await generateAccessToken({
      userId: existingSAdmin.id,
      userEmail: existingSAdmin.email,
      isVerified: existingSAdmin.isVerified,
      role: existingSAdmin.role,
      status: existingSAdmin.status,
    });

    res.cookie("procommerceToken", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (milliseconds)
      httpOnly: true, // Prevents client-side JavaScript access (recommended for security)
      secure: true, // Only send over HTTPS connections (recommended for security)
    });

    const sanitizedUser = {
      id: existingSAdmin.id,
      firstName: existingSAdmin.firstName,
      lastName: existingSAdmin.lastName,
      email: existingSAdmin.email,
      phone: existingSAdmin.phone,
      role: existingSAdmin.role,
      isVerified: existingSAdmin.isVerified,
      status: existingSAdmin.status,
    };

    return res
      .status(200)
      .json({ message: "Super Admin Login Successful", user: sanitizedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Error logging super admin" });
  }
};

export const superAdminProfile = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;

    const adminProfile = await prisma.superAdmin.findUnique({
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
    if (!adminProfile) {
      return res.status(404).json({
        message: "Super Admin Not Found",
      });
    }

    const sanitizedUser = {
      id: adminProfile.id,
      firstName: adminProfile.firstName,
      lastName: adminProfile.lastName,
      email: adminProfile.email,
      phone: adminProfile.phone,
      role: adminProfile.role,
      isVerified: adminProfile.isVerified,
      status: adminProfile.status,
    };

    return res
      .status(200)
      .json({ message: "User Profile Fetched", user: sanitizedUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error getting super admin profile" });
  }
};

export const updateSuperAdmin = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const { firstName, lastName, phone } = req.body;

    const updateSuperAdmin = await prisma.superAdmin.update({
      where: { email: user.userEmail },
      data: {
        firstName,
        lastName,
        phone,
      },
    });

    if (!updateSuperAdmin) {
      return res.status(400).json({
        message: "Error While Updating Super Admin",
        data: updateSuperAdmin,
      });
    }

    return res.status(200).json({
      message: "Super Admin Updated",
      data: updateSuperAdmin,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error udpating super admin profile" });
  }
};

export const changeSAdminPassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400) // Bad Request
        .json({
          message: "Missing required fields: oldPassword and newPassword",
        });
    }

    const user = req.decodedToken;
    const superAdmin = await prisma.superAdmin.findUnique({
      where: { email: user.userEmail },
    });
    if (!superAdmin) {
      return res
        .status(401) // Unauthorized
        .json({ message: "Invalid credentials or unauthorized access" });
    }

    const passwordStrength = validatePassword(newPassword);
    if (!passwordStrength.isValid) {
      return res
        .status(400) // Bad Request
        .json({ message: passwordStrength.message });
    }

    const comparePassword = await bcrypt.compare(
      oldPassword,
      superAdmin.password
    );
    if (!comparePassword) {
      return res
        .status(401) // Unauthorized
        .json({ message: "Incorrect old password" });
    }

    const hashPassword = await bcrypt.hash(newPassword, saltRound);

    const updatedAdmin = await prisma.superAdmin.update({
      where: { email: superAdmin.email },
      data: { password: hashPassword },
    });
    return res
      .status(200) // OK
      .json({ message: "Super Admin password changed successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "Error changing super admin password" });
  }
};

// function validatePassword(password: string) {
//   // Implement password complexity checks (length, special characters, etc.)
//   // Consider using a password validation library
//   const isValid =
//     password.length >= 8 && // Minimum length
//     /[A-Z]/.test(password) && // Uppercase letter
//     /[a-z]/.test(password) && // Lowercase letter
//     /[0-9]/.test(password); // Digit

//   const message = `Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a digit.`;

//   return { isValid, message };
// }
