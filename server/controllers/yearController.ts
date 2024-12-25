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

export const getYearById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { yearId: id } = req.params;
    const year = await Year.findById(id);
    if (!year) {
      res.status(404).json({ message: "Year not found" });
      return;
    }
    res.status(200).json({ year: year.year });
  } catch (error) {
    console.error("Error fetching year by ID:", error);
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

export const editYear = async (req: Request, res: Response): Promise<void> => {
  const { yearId, newYear } = req.body;

  if (!yearId) {
    res.status(400).json({ message: "Year ID are required" });
    return;
  } else if (!newYear) {
    res.status(400).json({ message: "New year is required" });
  }

  try {
    const year = await Year.findById(yearId);

    if (!year) {
      res.status(404).json({ message: "Year not found" });
      return;
    }

    year.year = newYear;

    await year.save();

    res.status(200).json({ message: "Year updated successfully", year });
  } catch (error) {
    console.error("Error updating year:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteYear = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { yearId, collectionId } = req.body;

  if (!yearId || !collectionId) {
    res.status(400).json({ message: "Year ID and Collection ID are required" });
    return;
  }

  try {
    const year = await Year.findById(yearId);

    if (!year) {
      res.status(404).json({ message: "Year not found" });
      return;
    }

    const collection = await Collection.findById(collectionId);

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    collection.years = collection.years.filter(
      (yearId: any) => yearId.toString() !== yearId
    );

    await collection.save();

    await Year.findByIdAndDelete(yearId);

    res.status(200).json({ message: "Year deleted successfully" });
  } catch (error) {
    console.error("Error deleting year:", error);
    res.status(500).json({ message: "Server error" });
  }
};
