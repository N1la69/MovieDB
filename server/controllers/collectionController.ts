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

export const deleteCollection = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { collectionId } = req.params;
  const userId = req.body.userId;

  if (!collectionId || !userId) {
    res.status(400).json({ message: "Collection ID and User ID are required" });
    return;
  }

  try {
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    if (collection.userId.toString() !== userId) {
      res
        .status(403)
        .json({ message: "Unauthorized to delete this collection" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.collections = user.collections.filter(
      (col) => col.toString() !== collectionId
    );

    await user.save();

    await collection.deleteOne();

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editCollection = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { collectionId, newName, userId } = req.body;

  if (!collectionId || !newName || !userId) {
    res
      .status(400)
      .json({ message: "Collection ID, new name, and User ID are required" });
    return;
  }

  try {
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    if (collection.userId.toString() !== userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to edit this collection" });
      return;
    }

    collection.name = newName;

    await collection.save();

    res.status(200).json({ collection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
