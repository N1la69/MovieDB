import { Request, Response } from "express";
import axios from "axios";
import Movie, { IMovie } from "../models/Movie";

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_API_URL = "http://www.omdbapi.com/";

export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.find();

    if (!movies) {
      res.status(404).json({ error: "No movies found." });
      return;
    }

    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Server error. Could not fetch movies." });
  }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      genres,
      description,
      cast,
      duration,
      releaseDate,
      language,
      posterUrl,
      rating,
    } = req.body;

    if (!title || !genres || !Array.isArray(genres) || genres.length === 0) {
      res
        .status(400)
        .json({ error: "Title and at least one genre are required." });
      return;
    }

    if (rating !== undefined && (rating < 0 || rating > 10 || isNaN(rating))) {
      res
        .status(400)
        .json({ error: "Rating must be a number between 0 and 10." });
      return;
    }

    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      res
        .status(400)
        .json({ error: `Movie with title "${title}" already exists.` });
      return;
    }

    let movieData: Partial<IMovie> = {};
    let apiError = false;

    try {
      const apiResponse = await axios.get(OMDB_API_URL, {
        params: {
          t: title,
          apiKey: OMDB_API_KEY,
        },
      });

      const apiData = apiResponse.data;

      if (apiData.Response === "True") {
        movieData = {
          title: apiData.Title || title,
          description:
            apiData.Plot || description || "No description available.",
          cast: apiData.Actors ? apiData.Actors.split(", ") : cast || [],
          duration: parseInt(apiData.Runtime) || duration || 0,
          releaseDate: new Date(apiData.Released) || releaseDate || new Date(),
          genre: genres,
          language: apiData.Language || language || "Unknown",
          posterUrl: apiData.Poster || posterUrl || "",
          rating: rating !== undefined ? parseFloat(rating.toString()) : 0.0,
        };
      } else {
        apiError = true;
      }
    } catch (error: any) {
      console.warn("Error fetching movie details from API:", error.message);
      apiError = true;
    }

    if (apiError) {
      movieData = {
        title,
        description: description || "No description provided.",
        cast: cast || [],
        duration: duration || 0,
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        genre: genres,
        language: language || "Unknown",
        posterUrl: posterUrl || "",
        rating: rating !== undefined ? parseFloat(rating.toString()) : 0.0,
      };
    }

    const newMovie = await Movie.create(movieData);
    res
      .status(201)
      .json({ message: "Movie added successfully!", movie: newMovie });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
};

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, cast, rating } = req.body;
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found." });
      return;
    }

    if (rating !== undefined && (rating < 0 || rating > 10 || isNaN(rating))) {
      res
        .status(400)
        .json({ error: "Rating must be a number between 0 and 10." });
      return;
    }

    if (title) movie.title = title;
    if (cast) movie.cast = cast;
    if (rating !== undefined) movie.rating = parseFloat(rating.toString());

    await movie.save();

    res.status(200).json({ message: "Movie updated successfully!", movie });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found." });
      return;
    }

    await Movie.findByIdAndDelete(id);

    res.status(200).json({ message: "Movie deleted successfully." });
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." });
  }
};
