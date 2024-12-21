import express from "express";
import { createYear, getCollectionYears } from "../controllers/yearController";

const router = express.Router();

router.get("/:collectionId", getCollectionYears);
router.post("/addYear", createYear);

export default router;
