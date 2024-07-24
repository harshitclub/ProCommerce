import { Request, Response } from "express";

export const getId = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!id) {
    return res.status(400).json({
      message: "Missing required parameter: id",
    });
  }

  return id;
};
