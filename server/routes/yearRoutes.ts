import express from "express";
import {
  createYear,
  deleteYear,
  editYear,
  getCollectionYears,
} from "../controllers/yearController";

const router = express.Router();

router.get("/:collectionId", getCollectionYears);
router.post("/addYear", createYear);
router.put("/:yearId", editYear);
router.delete("/:yearId", deleteYear);

export default router;
