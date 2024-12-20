import { Request, Response } from "express";
import User from "../models/User";

export const createCollection = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, userId } = req.body;

  if (!name || !userId) {
    res.status(400).json({ message: "Name and User ID are required" });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Add the new collection to the user's collections
    const newCollection = { name, years: [] };
    user.collections.push(newCollection);

    await user.save();

    res.status(201).json({ collections: newCollection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserCollections = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ collections: user.collections || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
