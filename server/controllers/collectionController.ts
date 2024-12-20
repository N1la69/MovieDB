import { Request, Response } from "express";
import User from "../models/User";
import Collection from "../models/Collection";

interface AuthenticatedRequest extends Request {
  user?: any;
}

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

    const newCollection = new Collection({
      name,
      userId,
      years: [],
    });

    await newCollection.save();

    user.collections.push(newCollection._id as any);

    await user.save();

    res.status(201).json({ collection: newCollection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserCollections = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }

  try {
    const user = await User.findById(userId).populate("collections");

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
