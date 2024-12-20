import express from "express";

import {
  createCollection,
  deleteCollection,
  editCollection,
  getUserCollections,
} from "../controllers/collectionController";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:userId", protectRoute, getUserCollections);
router.post("/addCollection", createCollection);
router.delete("/:collectionId", deleteCollection);
router.put("/:collectionId", editCollection);

export default router;
