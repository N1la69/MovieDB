import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  updateMovie,
} from "../controllers/movieController";

const router = express.Router();

router.get("/", getAllMovies);
router.post("/add", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
