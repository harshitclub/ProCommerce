import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addressValidator } from "../validator/addressValidator";
const prisma = new PrismaClient();

export const addingAddress = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const addressData = await addressValidator.parseAsync(req.body);
    const address = await prisma.address.create({
      data: {
        ...addressData,
        userId: user.userId,
      },
    });

    return res.status(201).json({
      message: "Address Added",
      data: {
        address,
      },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Adding Address" });
  }
};

export const getMyAddresses = async (req: Request, res: Response) => {
  try {
    const user = req.decodedToken;
    const addresses = await prisma.address.findMany({
      where: {
        userId: user.userId,
      },
    });

    return res.status(200).json({
      data: { addresses },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Finding Address" });
  }
};

export const setDefaultAddress = async (req: Request, res: Response) => {
  const user = req.decodedToken;
  const { id } = req.params;

  try {
    // Find the address to be set as default
    const addressToUpdate = await prisma.address.findUnique({
      where: {
        id: id,
        userId: user.userId,
      },
    });

    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found" });
    }
    // Set the default address and update other addresses to false
    const updatedAddress = await prisma.address.update({
      where: {
        id: id,
      },
      data: {
        isDefault: true,
      },
    });

    // Update other addresses belonging to the same user to false
    await prisma.address.updateMany({
      where: {
        userId: user.userId,
        id: { not: id },
      },
      data: {
        isDefault: false,
      },
    });
    return res
      .status(200)
      .json({ message: "Default address set successfully" });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Making Default Address" });
  }
};

export const deleteMyAddress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.address.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Address Deleted",
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Deleting Address" });
  }
};

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const addresses = await prisma.address.findMany({});
    return res.status(200).json({
      data: { addresses },
    });
  } catch (error) {
    // @ts-ignore
    console.error(error.message); // Log the error for debugging
    return res.status(500).json({ message: "Error Finding Address" });
  }
};

export const getUserAddresses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const addresses = await prisma.address.findMany({
      where: { userId: id },
    });

    return res.status(200).json({
      data: { addresses },
    });
  } catch (error) {}
};
