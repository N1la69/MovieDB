import express from "express";
import {
  createYear,
  deleteYear,
  editYear,
  getCollectionYears,
  getYearById,
} from "../controllers/yearController";

const router = express.Router();

router.get("/:collectionId", getCollectionYears);
router.get("/year/:yearId", getYearById);
router.post("/addYear", createYear);
router.put("/:yearId", editYear);
router.delete("/:yearId", deleteYear);

export default router;
