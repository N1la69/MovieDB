import express from "express";

import {
  createCollection,
  getUserCollections,
} from "../controllers/collectionController";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/addCollection", protectRoute, createCollection);
router.get("/:userId", protectRoute, getUserCollections);

export default router;
