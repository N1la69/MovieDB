import { Request, Response } from "express";
import Collection from "../models/Collection";
import Year from "../models/Year";

export const createYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { collectionId, year } = req.body;

  if (!collectionId || !year) {
    res.status(400).json({ message: "Collection ID and Year are required" });
    return;
  }

  try {
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    const existingYear = await Year.findOne({ collectionId, year });
    if (existingYear) {
      res
        .status(400)
        .json({ message: "Year already exists in the collection" });
      return;
    }

    const newYear = new Year({
      collectionId,
      year,
      movies: [],
    });

    await newYear.save();

    collection.years.push(newYear._id as any);
    await collection.save();

    res.status(201).json({ year: newYear });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCollectionYears = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { collectionId } = req.params;

  if (!collectionId) {
    res.status(400).json({ message: "Collection ID is required" });
    return;
  }

  try {
    const collection = await Collection.findById(collectionId).populate(
      "years"
    );

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    res.status(200).json({ years: collection.years });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
